import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Aura Hackathon Backend"
    API_V1_STR: str = "/api/v1"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    ENV: str = os.getenv("ENV", "dev")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")

settings = Settings()
