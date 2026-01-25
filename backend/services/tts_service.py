import edge_tts
import asyncio
import tempfile
import os
import uuid

class TTSService:
    def __init__(self):
        # Voice options: en-US-AriaNeural, en-US-GuyNeural, vi-VN-HoaiMyNeural, vi-VN-NamMinhNeural
        self.voice = "vi-VN-HoaiMyNeural" 
        self.rate = "+0%"
        self.volume = "+0%"

    async def speak(self, text: str) -> bytes:
        print(f"TTS Service speaking: {text}")
        
        # Create a temporary file path
        # Using manual path generation to avoid Windows file locking issues with NamedTemporaryFile
        filename = f"tts_{uuid.uuid4()}.mp3"
        tmp_path = os.path.join(tempfile.gettempdir(), filename)

        try:
            communicate = edge_tts.Communicate(text, self.voice, rate=self.rate, volume=self.volume)
            await communicate.save(tmp_path)
            
            # Check file size
            if os.path.exists(tmp_path):
                file_size = os.path.getsize(tmp_path)
                print(f"Generated TTS file at {tmp_path}, size: {file_size} bytes")
            else:
                print(f"Error: TTS file not found at {tmp_path}")
                return b""

            with open(tmp_path, "rb") as f:
                audio_data = f.read()
                
            return audio_data
        except Exception as e:
            print(f"Error in TTS generation: {e}")
            return b""
        finally:
            if os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except Exception as cleanup_error:
                    print(f"Warning: Could not remove temp file {tmp_path}: {cleanup_error}")

tts_service = TTSService()
