/**
 * DARPANPREP VOICE ENGINE
 * State machine managing SpeechSynthesis and SpeechRecognition with Indian multilingual support.
 */

export type VoiceState = 'idle' | 'thinking' | 'speaking' | 'listening' | 'processing' | 'error';

export interface VoiceEngineConfig {
  language: string;
  onStateChange: (state: VoiceState) => void;
  onTranscriptUpdate: (transcript: string, isFinal: boolean) => void;
  onError: (errorMsg: string) => void;
}

export class VoiceEngine {
  private state: VoiceState = 'idle';
  private config: VoiceEngineConfig;
  private recognition: any = null;
  private isRecognitionSupported = false;
  private isSynthesisSupported = false;

  constructor(config: VoiceEngineConfig) {
    this.config = config;
    this.initSpeechSynthesis();
    this.initSpeechRecognition();
  }

  private setState(newState: VoiceState) {
    this.state = newState;
    this.config.onStateChange(newState);
  }

  public getState(): VoiceState {
    return this.state;
  }

  private initSpeechSynthesis() {
    this.isSynthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  private initSpeechRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.isRecognitionSupported = true;
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.mapLanguageToLocale(this.config.language);

        this.recognition.onstart = () => {
          this.setState('listening');
        };

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          const activeText = finalTranscript || interimTranscript;
          if (activeText) {
            this.config.onTranscriptUpdate(activeText, Boolean(finalTranscript));
          }
        };

        this.recognition.onerror = (event: any) => {
          if (event.error !== 'no-speech') {
            this.config.onError(`Microphone notice: ${event.error}`);
          }
        };

        this.recognition.onend = () => {
          if (this.state === 'listening') {
            this.setState('idle');
          }
        };
      } catch (err) {
        this.isRecognitionSupported = false;
      }
    } else {
      this.isRecognitionSupported = false;
    }
  }

  public mapLanguageToLocale(language: string): string {
    switch (language.toLowerCase()) {
      case 'hindi':
        return 'hi-IN';
      case 'bengali':
        return 'bn-IN';
      case 'tamil':
        return 'ta-IN';
      case 'telugu':
        return 'te-IN';
      case 'marathi':
        return 'mr-IN';
      case 'gujarati':
        return 'gu-IN';
      case 'kannada':
        return 'kn-IN';
      case 'malayalam':
        return 'ml-IN';
      case 'punjabi':
        return 'pa-IN';
      case 'hinglish':
      case 'english':
      default:
        return 'en-IN';
    }
  }

  public speak(
    text: string,
    pitch: number = 1.0,
    rate: number = 1.0,
    onFinish?: () => void
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isSynthesisSupported) {
        resolve();
        if (onFinish) onFinish();
        return;
      }

      this.stop();
      this.setState('speaking');

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.lang = this.mapLanguageToLocale(this.config.language);

      // Attempt to find Indian English or regional voice
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(
        v => v.lang === utterance.lang || v.lang.startsWith(utterance.lang.slice(0, 2))
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        this.setState('idle');
        resolve();
        if (onFinish) onFinish();
      };

      utterance.onerror = () => {
        this.setState('idle');
        resolve();
        if (onFinish) onFinish();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  public startListening(): boolean {
    if (!this.isRecognitionSupported || !this.recognition) {
      this.config.onError('Voice recognition is not available in this browser. You can type your answer below.');
      return false;
    }

    try {
      this.stopSpeaking();
      this.recognition.start();
      this.setState('listening');
      return true;
    } catch (err) {
      return false;
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {}
    }
    if (this.state === 'listening') {
      this.setState('idle');
    }
  }

  public stopSpeaking() {
    if (this.isSynthesisSupported) {
      window.speechSynthesis.cancel();
    }
    if (this.state === 'speaking') {
      this.setState('idle');
    }
  }

  public stop() {
    this.stopSpeaking();
    this.stopListening();
  }

  public getIsRecognitionSupported(): boolean {
    return this.isRecognitionSupported;
  }
}
