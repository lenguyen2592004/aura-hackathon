from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
import base64
from services.agent_service import agent_service
from services.rag_service import rag_service
from services.stt_service import stt_service
from services.tts_service import tts_service
from services.history_service import history_service

router = APIRouter()

@router.post("/chat", response_model=dict)
async def chat_text(payload: dict):

    user_text = payload.get("text", "")
    agent_id = payload.get("agent_id")
    
    if not user_text:
        return {"response": "No text provided"}
    
    agent = agent_service.get_agent(agent_id) if agent_id else None
    
    response_text = await rag_service.chat(user_text, agent=agent)
    
    # Save to history
    if agent_id:
        history_service.save_message(agent_id, "user", user_text)
        history_service.save_message(agent_id, "assistant", response_text)
    
    return {"response": response_text}

@router.get("/history/{agent_id}")
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
    
    return {
        "user_text": transcript,
        "ai_response": response_text,
        "audio_base64": base64.b64encode(audio_output).decode('utf-8')
    }
