from fastapi import APIRouter, UploadFile, File, Response
from typing import Optional
import base64
from services.agent_service import agent_service
from services.rag_service import rag_service
from services.stt_service import stt_service
from services.tts_service import tts_service
from services.history_service import history_service

router = APIRouter()

from pydantic import BaseModel

class ChatRequest(BaseModel):
    text: str
    agent_id: Optional[str] = None

@router.post("/chat", response_model=dict)
async def chat_text(request: ChatRequest):

    user_text = request.text
    agent_id = request.agent_id
    
    if not user_text:
        return {"response": "No text provided"}
    
    agent = agent_service.get_agent(agent_id) if agent_id else None
    
    response_text = await rag_service.chat(user_text, agent=agent)
    
    # Save to history
    if agent_id:
        history_service.save_message(agent_id, "user", user_text)
        history_service.save_message(agent_id, "assistant", response_text)
    
    return {"response": response_text}

@router.get("/chat/history/{agent_id}")
async def get_chat_history(agent_id: str):

    return history_service.get_history(agent_id)

@router.post("/talk")
async def talk_to_aura(file: UploadFile = File(...)):

    # 1. Read Audio
    audio_bytes = await file.read()
    
    # 2. STT
    transcript = await stt_service.transcribe(audio_bytes)
    if not transcript:
        return {"error": "Could not understand audio"}
    
    # 3. RAG Loop (Use default agent or parameterize if needed)

    response_text = await rag_service.chat(transcript, agent=None)
    
    # 4. TTS
    audio_output = await tts_service.speak(response_text)
    
    import urllib.parse
    headers = {
        "X-User-Transcript": urllib.parse.quote(transcript),
        "X-AI-Response": urllib.parse.quote(response_text),
        "Content-Disposition": "attachment; filename=response.wav"
    }
    
    return Response(content=audio_output, media_type="audio/wav", headers=headers)
