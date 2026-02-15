from services.llm_service import llm_service
from services.agent_service import AgentProfile

class RAGService:
    def __init__(self):
        self.conversation_history = {}
    
    def _get_history(self, agent_id: str):
        if agent_id not in self.conversation_history:
            self.conversation_history[agent_id] = []
        return self.conversation_history[agent_id]
    
    async def chat(self, text: str, agent: AgentProfile) -> str:
        agent_id = agent.id if agent else "default"
        history = self._get_history(agent_id)
        
        context = ""
        if len(history) > 0:
            recent_messages = history[-6:]
            context = "\n".join([f"{msg['role']}: {msg['content']}" for msg in recent_messages])
            text_with_context = f"Previous conversation:\n{context}\n\nCurrent message: {text}"
        else:
            text_with_context = text
        
        response = await llm_service.process(text_with_context, agent)
        
        history.append({"role": "user", "content": text})
        history.append({"role": "assistant", "content": response})
        
        return response

rag_service = RAGService()
