/**
 * Text-to-Speech utilities using Web Speech API
 */

export class TextToSpeech {
  private synthesis: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.synthesis = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synthesis) return;

    const setVoice = () => {
      const voices = this.synthesis!.getVoices();

      // Tìm giọng tiếng Việt
      let vietnameseVoice = voices.find((v) => v.lang.includes("vi-VN"));

      // Fallback sang các giọng nữ mượt mà nếu không có tiếng Việt
      if (!vietnameseVoice) {
        vietnameseVoice =
          voices.find(
            (v) => v.name.includes("Google") && v.name.includes("Female"),
          ) || voices.find((v) => v.name.includes("Female"));
      }

      this.voice = vietnameseVoice || voices[0];
      console.log("[TTS] Selected voice:", this.voice?.name);
    };

    // Load voices
    if (this.synthesis.getVoices().length > 0) {
      setVoice();
    } else {
      this.synthesis.addEventListener("voiceschanged", setVoice);
    }
  }

  /**
   * Speak text with customizable options
   */
  speak(
    text: string,
    options: {
      rate?: number; // 0.5 - 2.0
      pitch?: number; // 0 - 2
      volume?: number; // 0 - 1
      onStart?: () => void;
      onEnd?: () => void;
      onBoundary?: (event: SpeechSynthesisEvent) => void;
    } = {},
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error("Speech synthesis not supported"));
        return;
      }

      // Stop any ongoing speech
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice
      if (this.voice) {
        utterance.voice = this.voice;
      }

      // Set parameters
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;
      utterance.lang = "vi-VN";

      // Event handlers
      utterance.onstart = () => {
        console.log("[TTS] Started speaking");
        options.onStart?.();
      };

      utterance.onend = () => {
        console.log("[TTS] Finished speaking");
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        console.error("[TTS] Error:", event.error);
        reject(event);
      };

      utterance.onboundary = (event) => {
        // Called for each word boundary - useful for lip sync
        options.onBoundary?.(event);
      };

      this.currentUtterance = utterance;
      this.synthesis.speak(utterance);
    });
  }

  /**
   * Stop current speech
   */
  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Pause current speech
   */
  pause() {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }

  /**
   * Get speech rate based on user settings
   */
  static getRateFromSetting(speed: "slow" | "normal" | "fast"): number {
    switch (speed) {
      case "slow":
        return 0.75;
      case "fast":
        return 1.3;
      default:
        return 1.0;
    }
  }
}

// Singleton instance
let ttsInstance: TextToSpeech | null = null;

export function getTTS(): TextToSpeech {
  if (!ttsInstance) {
    ttsInstance = new TextToSpeech();
  }
  return ttsInstance;
}
