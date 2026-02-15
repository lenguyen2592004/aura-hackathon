"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, Send, Loader2 } from "lucide-react"; 
import { motion } from "framer-motion";

interface VoiceCallProps {
  onClose: () => void;
  agentName: string;
  agentId: string;
}

export default function VoiceCall({ onClose, agentName, agentId }: VoiceCallProps) {
  const [status, setStatus] = useState<"connecting" | "idle" | "listening" | "processing" | "speaking" | "ended">("connecting");
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [volumeLevel, setVolumeLevel] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const cleanUp = useCallback(() => {
     if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
     }
     if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
     }
     if (sourceRef.current) {
         sourceRef.current.stop();
         sourceRef.current = null;
     }
     if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
     }
     if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
     }
  }, []);

  const toggleRecording = () => {
      if (!mediaRecorderRef.current) return;

      if (status === "idle" || status === "speaking") {
          // Interrupt AI if speaking
          if (sourceRef.current) {
              try {
                  sourceRef.current.stop();
              } catch (e) {}
              sourceRef.current = null;
          }
          
          // Start Recording
          audioChunksRef.current = [];
          mediaRecorderRef.current.start();
          setStatus("listening");
      } else if (status === "listening") {
          // Stop Recording
          mediaRecorderRef.current.stop();
          setStatus("processing");
      }
  };

  const sendAudio = async (blob: Blob) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64 = (reader.result as string).split(',')[1];
              wsRef.current?.send(JSON.stringify({
                  audio_data: base64
              }));
              console.log("Sent audio data:", blob.size, "bytes");
          };
          reader.readAsDataURL(blob);
      }
  };

  const playAudio = async (base64String: string) => {
      if (!audioContextRef.current) return;
      
      try {
        const binaryString = window.atob(base64String);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const audioBuffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
        
        // Stop previous if any
        if (sourceRef.current) {
             try {
                 sourceRef.current.stop();
             } catch (e) {}
        }
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        sourceRef.current = source;
        source.start(0);
        
        return new Promise<void>((resolve) => {
            source.onended = () => {
                sourceRef.current = null;
                resolve();
            };
        });

      } catch (err) {
          console.error("Error playing audio", err);
      }
  };

  useEffect(() => {
    startCall();
    return () => cleanUp();
  }, [agentId, cleanUp]);

  const startCall = async () => {
    try {
      const wsUrl = `ws://${window.location.hostname}:8089/api/v1/ws?agent_id=${agentId}`; 
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        console.log("WS Connected for Voice Call");
        setStatus("idle");
        await setupAudioCapture();
      };

      ws.onmessage = async (event) => {
        try {
            const data = JSON.parse(event.data);
            
            if (data.status === "processing") {
                console.log(data.msg);
                if (data.step === 1) {
                    setStatus("processing");
                }
            } else if (data.type === "transcript") {
                setTranscript(data.content);
            } else if (data.status === "complete" && data.audio) {
                if (data.text) {
                    setTranscript(data.text);
                }
                if (!isSpeakerOff) {
                    setStatus("speaking");
                    await playAudio(data.audio);
                    setStatus("idle");
                } else {
                    setStatus("idle");
                }
            } else if (data.status === "error") {
                console.error("Error from server:", data.msg);
                setStatus("idle");
            }
        } catch (e) {
            console.error("Error parsing WS message", e);
        }
      };

      ws.onclose = () => {
          console.log("WS Closed");
          setStatus("ended");
      };
      
      ws.onerror = (err) => console.error("WS Error", err);

    } catch (err) {
      console.error("Failed to start call", err);
      setStatus("ended");
    }
  };

  const setupAudioCapture = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        // MediaRecorder setup
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' }); 
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            if (audioChunksRef.current.length > 0) {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                sendAudio(audioBlob);
                audioChunksRef.current = [];
            }
        };

        // Visualizer Loop
        const checkAudioLevel = () => {
            if (status === "listening") {
                analyser.getByteTimeDomainData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const x = (dataArray[i] - 128) / 128.0;
                    sum += x * x;
                }
                const rms = Math.sqrt(sum / dataArray.length);
                setVolumeLevel(rms);
            } else {
                setVolumeLevel(0);
            }
            animationFrameRef.current = requestAnimationFrame(checkAudioLevel);
        };
        checkAudioLevel();

    } catch (err) {
        console.error("Microphone access denied", err);
        setStatus("ended");
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/90 backdrop-blur-md p-6"
    >
      <div className="w-full max-w-md bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col items-center p-8 text-center relative">
        
        <div className="absolute top-6 right-6">
            <div className={`w-3 h-3 rounded-full ${status === "listening" || status === "speaking" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
        </div>

        {/* Profile Pic */}
        <div className="relative mb-8 mt-4">
          <motion.div 
            animate={{ 
                scale: status === "speaking" ? [1, 1.1, 1] : 1,
                boxShadow: status === "speaking" ? "0px 0px 30px rgba(16, 185, 129, 0.4)" : "none"
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center text-white text-5xl font-bold shadow-xl transition-all"
          >
            {agentName.charAt(0)}
          </motion.div>
          
          {/* Wave Visualizer */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 h-8">
             {status === "listening" && (
                 <>
                    {[1, 2, 3, 4, 5].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ height: Math.max(4, volumeLevel * 100 * (Math.random() + 0.5)) }}
                            className="w-1 bg-aura-accent rounded-full"
                        />
                    ))}
                 </>
             )}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-navy-900 mb-2">{agentName}</h2>
        <p className="text-sage-600 font-medium mb-8 min-h-[1.5em]">
          {status === "connecting" && "Establishing connection..."}
          {status === "idle" && "Tap the microphone to speak"}
          {status === "listening" && "Listening... Tap to send"}
          {status === "processing" && "Thinking..."}
          {status === "speaking" && "Speaking..."}
          {status === "ended" && "Call Ended"}
        </p>

        {/* Live Transcript */}
        <div className="w-full h-32 mb-8 bg-warmGray-50 rounded-2xl p-4 text-left overflow-y-auto">
          <p className="text-navy-700 italic text-lg leading-relaxed">
             {transcript || <span className="text-gray-400">Conversation started...</span>}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-6 items-center justify-center w-full">
           
          {/* Main Action Button */}
          <button 
            onClick={toggleRecording}
            disabled={status === "processing" || status === "connecting" || status === "ended"}
            className={`
                w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95
                ${status === "listening" 
                    ? "bg-red-500 text-white animate-pulse" 
                    : status === "processing" 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-aura-accent text-white hover:bg-aura-accent/90"
                }
            `}
          >
            {status === "listening" ? <Send size={32} /> : status === "processing" ? <Loader2 className="animate-spin" size={32} /> : <Mic size={32} />}
          </button>

          <button 
            onClick={() => {
                cleanUp();
                onClose();
            }}
            className="w-14 h-14 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center shadow-sm transition-transform active:scale-95"
          >
            <PhoneOff size={24} />
          </button>

          <button 
             onClick={() => setIsSpeakerOff(!isSpeakerOff)}
             className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-sm ${isSpeakerOff ? "bg-gray-200 text-gray-500" : "bg-warmGray-100 text-navy-700 hover:bg-warmGray-200"}`}
          >
            {isSpeakerOff ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
