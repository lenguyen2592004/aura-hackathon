"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Video, 
  Info, 
  ArrowLeft, 
  MoreVertical,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { agentApi } from "@/lib/api";
import { AgentProfile } from "@/types/agent";
import ChatInterface from "@/components/ChatInterface";
import ChatSidebar from "@/components/ChatSidebar";
import VoiceCall from "@/components/VoiceCall";
import { useTranslation, Language } from "@/lib/i18n";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function ChatPageContent({ language }: { language: Language }) {
  const t = useTranslation(language);
  const [messages, setMessages] = useState<Message[]>([]);
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [allAgents, setAllAgents] = useState<AgentProfile[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isCalling, setIsCalling] = useState(false);

  const searchParams = useSearchParams();
  const agentId = searchParams.get("agentId");

  // Fetch all agents
  useEffect(() => {
    agentApi.listAgents().then(setAllAgents).catch(console.error);
  }, []);

  // Sync current agent and history
  useEffect(() => {
    if (agentId) {
      setMessages([]); // Clear current messages first
      agentApi.getAgent(agentId).then(setAgent).catch(console.error);
      
      // Load History
      agentApi.getChatHistory(agentId).then(history => {
        if (history && history.length > 0) {
          setMessages(history.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          })));
        }
      }).catch(err => {
        console.error("Failed to load history", err);
      });
    }
  }, [agentId]);

  // Connect to WebSocket
  useEffect(() => {
    if (!agentId) return;
    
    const wsUrl = `ws://localhost:8089/api/v1/ws?agent_id=${agentId}`;
    const socket = new WebSocket(wsUrl);
    socket.binaryType = "blob";

    socket.onopen = () => console.log("Connected to WebSocket");

    socket.onmessage = async (event) => {
      if (typeof event.data === "string") {
        const data = JSON.parse(event.data);
        if (data.type === "llm_response") {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev, 
            { 
              id: Math.random().toString(36), 
              role: "assistant", 
              content: data.content,
              timestamp: new Date()
            }
          ]);
        } else if (data.type === "transcript") {
          setMessages((prev) => [
            ...prev, 
            { 
              id: Math.random().toString(36), 
              role: "user", 
              content: data.content,
              timestamp: new Date()
            }
          ]);
          setIsTyping(true);
        }
      }
    };

    setWs(socket);
    return () => socket.close();
  }, [agentId]);

  const handleSendMessage = (text: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      setMessages((prev) => [
        ...prev, 
        { 
          id: Math.random().toString(36), 
          role: "user", 
          content: text,
          timestamp: new Date()
        }
      ]);
      ws.send(JSON.stringify({ type: "text_message", content: text }));
      setIsTyping(true);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 1. Left Sidebar (Navigation/Mini) */}
      <div className="w-16 md:w-20 border-r border-warmGray-100 flex flex-col items-center py-6 bg-white shrink-0">
        <Link href="/agents" className="p-3 text-navy-600 hover:bg-warmGray-50 rounded-2xl transition-colors mb-8">
          <ChevronLeft className="w-8 h-8" />
        </Link>
        
        {/* Agent List for Switching */}
        <div className="flex flex-col gap-4 overflow-y-auto w-full items-center px-2 py-2">
          {allAgents.map((a) => (
            <Link 
              key={a.id}
              href={`/chat?agentId=${a.id}`}
              className={`
                relative w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white transition-all shrink-0
                ${a.id === agentId ? "scale-110 shadow-lg ring-2 ring-aura-accent ring-offset-2" : "opacity-60 hover:opacity-100 hover:scale-105"}
                bg-gradient-to-br from-sage-400 to-sage-600
              `}
              title={a.name}
            >
              {a.name.charAt(0)}
              {a.id === agentId && (
                <div className="absolute -right-1 -top-1 w-3.5 h-3.5 bg-sage-500 border-2 border-white rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Chat Header */}
        <header className="h-20 border-b border-warmGray-100 px-6 flex items-center justify-between bg-white shrink-0 z-10">
          <div className="flex items-center gap-4">
             <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {agent?.name.charAt(0) || "A"}
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-sage-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-elderly-xl font-bold text-navy-900 leading-tight">
                {agent?.name || "Loading..."}
              </h1>
              <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest">Active Now</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsCalling(true)}
              disabled={!agent}
              className={`p-2.5 rounded-full transition-colors ${!agent ? "opacity-50 cursor-not-allowed text-gray-400" : "text-aura-accent hover:bg-aura-accent/10"}`}
            >
              <Phone className="w-7 h-7" />
            </button>
            <button className="p-2.5 text-aura-accent hover:bg-aura-accent/10 rounded-full transition-colors">
              <Video className="w-7 h-7" />
            </button>
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-2.5 rounded-full transition-colors ${showSidebar ? "bg-aura-accent text-white" : "text-aura-accent hover:bg-aura-accent/10"}`}
            >
              <Info className="w-7 h-7" />
            </button>
          </div>
        </header>

        {/* Chat Interface Container */}
        <div className="flex-1 min-h-0 bg-white">
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            agentName={agent?.name}
          />
        </div>

        {/* Voice Call Overlay */}
        <AnimatePresence>
          {isCalling && agent && (
            <VoiceCall 
              agentName={agent.name} 
              agentId={agent.id}
              onClose={() => setIsCalling(false)} 
            />
          )}
        </AnimatePresence>
      </div>

      {/* 3. Right Sidebar (Chat Info) */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden lg:block h-full shrink-0"
          >
            <ChatSidebar agent={agent} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChatPage() {
  const language: Language = "en";
  const t = useTranslation(language);

  return (
    <Suspense
      fallback={
        <div className="p-4" role="status" aria-live="polite">
          <p>{t.loadingChat}</p>
        </div>
      }
    >
      <ChatPageContent language={language} />
    </Suspense>
  );
}
