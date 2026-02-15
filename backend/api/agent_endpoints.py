from fastapi import APIRouter, HTTPException
from services.agent_service import agent_service, CreateAgentRequest, UpdateAgentRequest, AgentProfile
from constants.voices import VOICE_LIST, AVAILABLE_GEMINI_VOICES, MALE_VOICES, FEMALE_VOICES
from typing import List

router = APIRouter()

@router.post("/", response_model=AgentProfile)
async def create_agent(request: CreateAgentRequest):
    return agent_service.create_agent(request)

@router.get("/", response_model=List[AgentProfile])
async def list_agents():
    return agent_service.list_agents()

@router.get("/{agent_id}", response_model=AgentProfile)
async def get_agent(agent_id: str):
    agent = agent_service.get_agent(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@router.put("/{agent_id}", response_model=AgentProfile)
async def update_agent(agent_id: str, request: UpdateAgentRequest):
    agent = agent_service.update_agent(agent_id, request)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@router.delete("/{agent_id}")
async def delete_agent(agent_id: str):
    success = agent_service.delete_agent(agent_id)
    if not success:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"message": "Agent deleted successfully"}

@router.get("/voices/list")
async def list_voices():
    return {
        "voices": VOICE_LIST,
        "gemini_voices": AVAILABLE_GEMINI_VOICES,
        "male_voices": MALE_VOICES,
        "female_voices": FEMALE_VOICES
    }
