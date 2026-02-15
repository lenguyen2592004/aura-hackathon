import asyncio
from google import genai
from google.genai import types
from config.settings import settings

class STTService:
    def __init__(self):
        if not settings.GOOGLE_API_KEY:
            print("WARNING: GOOGLE_API_KEY is not set. STT will fail.")
            self.client = None
        else:
            self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)
        self.model = settings.BRAIN_MODEL

    async def transcribe(self, audio_data: bytes) -> str:
        if not self.client:
            print("STT Service Error: No GOOGLE_API_KEY provided.")
            return "STT configuration error"

        print(f"STT Service (Gemini) received {len(audio_data)} bytes of audio")
        
        try:
            prompt = "Listen to this audio and transcribe it accurately. Only return the text, nothing else."
            
            loop = asyncio.get_running_loop()
            response = await loop.run_in_executor(
                None,
                lambda: self.client.models.generate_content(
                    model=self.model,
                    contents=[
                        types.Content(
                            role="user",
                            parts=[
                                types.Part.from_bytes(data=audio_data, mime_type="audio/webm"),
                                types.Part.from_text(text=prompt)
                            ]
                        )
                    ]
                )
            )
            
            text = response.text
            print(f"Transcript: {text}")
            return text
            
        except Exception as e:
            print(f"STT Error (Gemini): {e}")
            return ""

stt_service = STTService()
