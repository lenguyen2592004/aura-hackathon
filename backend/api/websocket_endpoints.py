import json
import base64
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from services.agent_service import agent_service
from services.conversation_orchestrator import conversation_orchestrator

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, agent_id: str = Query(None)):
    await websocket.accept()
    
    current_agent = None
    if agent_id:
        current_agent = agent_service.get_agent(agent_id)
        print(f"WS Connected. Agent: {current_agent.name if current_agent else 'Default'} ({agent_id})")
    else:
        print("WS Connected. No agent specified.")

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if "audio_data" in message:
                audio_bytes = base64.b64decode(message["audio_data"])
                async for response in conversation_orchestrator.process_gemini_audio_flow(audio_bytes, current_agent):
                    await websocket.send_json(response)
            
            elif message.get("type") == "text_message" or "text" in message:
                text_content = message.get("content") or message.get("text")
                if text_content:
                    async for response in conversation_orchestrator.process_text_flow(text_content, current_agent):
                        await websocket.send_json(response)

    except WebSocketDisconnect:
        print("WS Disconnected")
    except Exception as e:
        print(f"WS Error: {e}")
        try:
            await websocket.send_json({"status": "error", "msg": str(e)})
        except:
            pass

