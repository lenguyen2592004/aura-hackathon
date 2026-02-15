import json
import os
from pydantic import BaseModel
from typing import List, Optional, Dict
import uuid
from constants.voices import get_random_voice_by_gender

GENDER_OPTIONS = ["male", "female", "neutral"]

class AgentProfile(BaseModel):
    id: str
    name: str
    description: str
    system_prompt: str
    gender: Optional[str] = None
    voice_id: Optional[str] = None
    avatar_url: Optional[str] = None

class CreateAgentRequest(BaseModel):
    name: str
    description: str
    system_prompt: str
    gender: Optional[str] = None
    voice_id: Optional[str] = None
    avatar_url: Optional[str] = None

class UpdateAgentRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    gender: Optional[str] = None
    voice_id: Optional[str] = None
    avatar_url: Optional[str] = None

class AgentService:
    def __init__(self):
        self.agents: Dict[str, AgentProfile] = {}
        self._load_mock_agents()

    def _load_mock_agents(self):
        mock_file = os.path.join(os.path.dirname(__file__), "../data/mock_agents.json")
        if os.path.exists(mock_file):
            try:
                with open(mock_file, 'r', encoding='utf-8') as f:
                    mock_data = json.load(f)
                    for agent_data in mock_data:
                        agent = AgentProfile(**agent_data)
                        self.agents[agent.id] = agent
                print(f"Loaded {len(mock_data)} mock agents")
            except Exception as e:
                print(f"Error loading mock agents: {e}")

    def create_agent(self, request: CreateAgentRequest) -> AgentProfile:
        agent_id = str(uuid.uuid4())
        
        voice_id = request.voice_id
        if not voice_id and request.gender:
            voice_id = get_random_voice_by_gender(request.gender)
        
        agent = AgentProfile(
            id=agent_id,
            name=request.name,
            description=request.description,
            system_prompt=request.system_prompt,
            voice_id=voice_id,
            gender=request.gender
        )
        self.agents[agent_id] = agent
        print(f"Created agent '{agent.name}' with voice_id: {voice_id}")
        return agent

    def get_agent(self, agent_id: str) -> Optional[AgentProfile]:
        return self.agents.get(agent_id)

    def update_agent(self, agent_id: str, request: UpdateAgentRequest) -> Optional[AgentProfile]:
        if agent_id not in self.agents:
            return None
        
        agent = self.agents[agent_id]
        if request.name is not None:
            agent.name = request.name
        if request.description is not None:
            agent.description = request.description
        if request.system_prompt is not None:
            agent.system_prompt = request.system_prompt
        if request.voice_id is not None:
            agent.voice_id = request.voice_id
        if request.avatar_url is not None:
            agent.avatar_url = request.avatar_url
            
        self.agents[agent_id] = agent
        return agent

    def delete_agent(self, agent_id: str) -> bool:
        if agent_id in self.agents:
            del self.agents[agent_id]
            return True
        return False

    def list_agents(self) -> List[AgentProfile]:
        return list(self.agents.values())

agent_service = AgentService()
