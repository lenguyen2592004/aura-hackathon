from groq import Groq
import os
import tempfile
from config.settings import settings

class STTService:
    def __init__(self):
        if not settings.GROQ_API_KEY:
            print("WARNING: GROQ_API_KEY is not set. STT will fail.")
            self.client = None
        else:
            self.client = Groq(api_key=settings.GROQ_API_KEY)
        
        self.model = "whisper-large-v3"

    async def transcribe(self, audio_data: bytes) -> str:
        if not self.client:
            print("STT Service Error: No Groq API Key provided.")
            return "Lỗi cấu hình STT"

        print(f"STT Service (Groq) received {len(audio_data)} bytes of audio")
        
        # Groq API requires a file-like object with a name, or a path
        # We will write to a temp file to be safe and simple
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
            tmp_file.write(audio_data)
            tmp_path = tmp_file.name
            
        try:
            with open(tmp_path, "rb") as file_obj:
                transcription = self.client.audio.transcriptions.create(
                    file=(tmp_path, file_obj.read()),
                    model=self.model,
                    # Optional: prompt="Context about elderly care", language="vi"
                    response_format="json",
                    temperature=0.0
                )
                
            text = transcription.text
            print(f"Transcript: {text}")
            return text
            
        except Exception as e:
            print(f"STT Error (Groq): {e}")
            return "Xin chào (lỗi API)"
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

stt_service = STTService()
