export interface Message {
  id: string;
  text: string;
  sender: "user" | "aura" | "system";
  timestamp: Date;
}

export type AuraState = "idle" | "listening" | "thinking" | "speaking";

export type Language = "en" | "vi";

export interface Settings {
  userName: string;
  fontSize: "normal" | "large" | "extra-large";
  voiceSpeed: "slow" | "normal" | "fast";
  theme: "light" | "dark";
  language: Language;
}

export interface AvatarProps {
  state: AuraState;
  isSpeaking: boolean;
  isListening: boolean;
}

export interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
  userName: string;
  language: Language;
}

export interface SOSButtonProps {
  onClick: () => void;
  language: Language;
}

export interface VoiceButtonProps {
  onVoiceStart: () => void;
  onVoiceEnd: (audio: Blob) => void;
  onTranscript: (transcript: string) => void;
  isListening: boolean;
  disabled?: boolean;
  language: Language;
}

export interface StatusBarProps {
  isConnected: boolean;
  onSettingsClick: () => void;
  language: Language;
}

export interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onClose: () => void;
  language: Language;
}

export interface WelcomeModalProps {
  onClose: (name: string) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}
