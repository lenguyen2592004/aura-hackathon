import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AURA Hackathon Backend"
    API_V1_STR: str = "/api/v1"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    ENV: str = os.getenv("ENV", "dev")
    
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    BRAIN_MODEL: str = os.getenv("BRAIN_MODEL", "gemini-2.0-flash")
    VOICE_MODEL: str = os.getenv("VOICE_MODEL", "gemini-2.5-flash-preview-tts")
    DEFAULT_VOICE: str = os.getenv("DEFAULT_VOICE", "Kore")
    
settings = Settings()
