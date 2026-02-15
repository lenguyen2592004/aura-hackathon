import asyncio
from google import genai
from google.genai import types
from config.settings import settings
from constants.voices import get_gemini_voice
import io
import wave

class TTSService:
    def __init__(self):
        if not settings.GOOGLE_API_KEY:
            print("WARNING: GOOGLE_API_KEY is not set. TTS will fail.")
            self.client = None
        else:
            self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)
        self.model = settings.VOICE_MODEL
        self.default_voice = settings.DEFAULT_VOICE

    def _pcm_to_wav(self, pcm_data: bytes, sample_rate: int = 24000) -> bytes:
        wav_io = io.BytesIO()
        with wave.open(wav_io, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(sample_rate)
            wf.writeframes(pcm_data)
        return wav_io.getvalue()

    async def speak(self, text: str, voice_id: str = None) -> bytes:
        if not self.client:
            return b""
        
        voice_name = get_gemini_voice(voice_id, self.default_voice) if voice_id else self.default_voice
        print(f"TTS Service (Gemini) speaking: {text} [Voice: {voice_name}]")
        try:
            prompt = f"""You are an AI assistant specialized in generating natural and emotionally expressive speech from text.
            Based on the following content, generate an audio output with a tone that appropriately reflects the emotion:
            Text to speak: \"{text}\""""
            
            loop = asyncio.get_running_loop()
            response = await loop.run_in_executor(
                None,
                lambda: self.client.models.generate_content(
                    model=self.model,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_modalities=["AUDIO"],
                        speech_config=types.SpeechConfig(
                            voice_config=types.VoiceConfig(
                                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                    voice_name=voice_name,
                                )
                            )
                        )
                    )
                )
            )
            
            if response.candidates and response.candidates[0].content.parts:
                part = response.candidates[0].content.parts[0]
                if part.inline_data:
                    return self._pcm_to_wav(part.inline_data.data)
            return b""
        except Exception as e:
            print(f"TTS Error (Gemini): {e}")
            return b""

tts_service = TTSService()
