import asyncio
import base64
from typing import Optional, AsyncGenerator, Dict, Any
from google import genai
from google.genai import types
from services.stt_service import stt_service
from services.tts_service import tts_service
from services.rag_service import rag_service
from services.agent_service import AgentProfile
from services.history_service import history_service
from config.settings import settings
from constants.voices import get_gemini_voice

if not settings.GOOGLE_API_KEY:
    raise ValueError("❌ GOOGLE_API_KEY not found in environment")

gemini_client = genai.Client(api_key=settings.GOOGLE_API_KEY)

class ConversationOrchestrator:

    def get_voice_for_agent(self, agent: Optional[AgentProfile]) -> str:
        if agent and agent.voice_id:
            return get_gemini_voice(agent.voice_id, settings.DEFAULT_VOICE)
        return settings.DEFAULT_VOICE

    def build_system_instruction(self, agent: Optional[AgentProfile]) -> str:
        if agent and agent.system_prompt:
            return f"You are {agent.name}. {agent.system_prompt}"
        return "You are an intelligent assistant. Listen and respond naturally."

    async def process_audio_to_text(self, audio_bytes: bytes, system_instruction: str) -> str:
        prompt = f"{system_instruction}\n\nListen to the audio and provide a written response. Format: Just the response text directly."
        
        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(
            None, 
            lambda: gemini_client.models.generate_content(
                model=settings.BRAIN_MODEL,
                contents=[
                    types.Content(
                        role="user",
                        parts=[
                            types.Part.from_bytes(data=audio_bytes, mime_type="audio/webm"),
                            types.Part.from_text(text=prompt)
                        ]
                    )
                ]
            )
        )
        
        return response.text

    async def generate_audio_response(self, text: str, voice_name: str) -> Optional[str]:
        prompt = f"Say this text with a natural, emotional tone matching the context: \"{text}\""
        
        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(
            None,
            lambda: gemini_client.models.generate_content(
                model=settings.VOICE_MODEL,
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
                audio_data = part.inline_data.data
                print(f"Generated audio data length: {len(audio_data)} bytes")
                if len(audio_data) > 0:
                    try:
                        with open("output.mp3", "wb") as f:
                            f.write(audio_data)
                        print("Saved audio to output.mp3")
                    except Exception as e:
                        print(f"Failed to save output.mp3: {e}")
                    
                    sample = audio_data[:10]
                    print(f"Audio sample (first 10 bytes): {sample.hex()}")
                return base64.b64encode(audio_data).decode('utf-8')
        
        print("Model did not return audio inline_data")
        return None

    async def process_gemini_audio_flow(
        self, 
        audio_bytes: bytes, 
        agent: Optional[AgentProfile]
    ) -> AsyncGenerator[Dict[str, Any], None]:
        yield {"status": "processing", "step": 1, "msg": "🧠 Brain: Thinking..."}
        
        # 1. STT
        transcript = await stt_service.transcribe(audio_bytes)
        if not transcript:
            yield {"status": "error", "msg": "Could not understand audio"}
            return

        yield {
            "type": "transcript",
            "content": transcript
        }
        
        # 2. RAG
        response_text = await rag_service.chat(transcript, agent=agent)
        
        print(f"Brain Output: {response_text}")
        
        yield {"status": "processing", "step": 2, "msg": "🗣️ Voice: Generating audio..."}
        
        # 3. TTS
        voice_id = agent.voice_id if agent else None
        audio_output = await tts_service.speak(response_text, voice_id)
        
        if audio_output:
            audio_b64 = base64.b64encode(audio_output).decode('utf-8')
            yield {
                "status": "complete",
                "type": "audio",
                "text": response_text,
                "audio": audio_b64
            }
        else:
            yield {"status": "error", "msg": "Model did not return audio."}

    async def process_text_flow(self, text: str, agent: Optional[AgentProfile]) -> AsyncGenerator[Dict[str, Any], None]:
        response_text = await rag_service.chat(text, agent=agent)
        
        agent_id = agent.id if agent else "default"
        history_service.save_message(agent_id, "user", text)
        history_service.save_message(agent_id, "assistant", response_text)
        
        yield {
            "type": "llm_response",
            "content": response_text
        }

    async def process_audio_flow(self, audio_data: bytes, agent: Optional[AgentProfile]) -> AsyncGenerator[Dict[str, Any], None]:
        transcript = await stt_service.transcribe(audio_data)
        yield {
            "type": "transcript",
            "content": transcript # Return transcript to user immediately
        }

        if not transcript or transcript.startswith("Error"):
            return

        response_text = await rag_service.chat(transcript, agent=agent)
        
        agent_id = agent.id if agent else "default"
        history_service.save_message(agent_id, "user", transcript)
        history_service.save_message(agent_id, "assistant", response_text)
        
        yield {
            "type": "llm_response",
            "content": response_text
        }

        voice_id = agent.voice_id if agent and agent.voice_id else None
        if voice_id:
            audio_response = await tts_service.speak(response_text, voice_id)
            if audio_response:
                yield {
                    "type": "audio",
                    "content": audio_response
                }

conversation_orchestrator = ConversationOrchestrator()
