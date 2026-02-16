import asyncio
from google import genai
from services.agent_service import AgentProfile
from services.prompts.system_prompts import DEFAULT_SYSTEM_PROMPT, LLM_AGENT_PROMPT_TEMPLATE
from config.settings import settings

class LLMService:
    def __init__(self):
        if not settings.GOOGLE_API_KEY:
            print("Warning: GOOGLE_API_KEY not found in environment variables.")
            self.client = None
        else:
            self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)
        self.model = settings.BRAIN_MODEL

    async def process(self, text: str, agent: AgentProfile = None) -> str:
        if not self.client:
            return "Error: API Key not configured."

        system_instruction = DEFAULT_SYSTEM_PROMPT
        if agent and agent.system_prompt:
            system_instruction = LLM_AGENT_PROMPT_TEMPLATE.format(
                name=agent.name, 
                system_prompt=agent.system_prompt
            )

        try:
            full_prompt = f"{system_instruction}\n\nUser: {text}"
            loop = asyncio.get_running_loop()
            response = await loop.run_in_executor(
                None,
                lambda: self.client.models.generate_content(
                    model=self.model,
                    contents=full_prompt
                )
            )
            return response.text
        except Exception as e:
            print(f"Gemini Error: {e}")
            return "Sorry, I'm having connection issues."

llm_service = LLMService()
