/**
 * DARPANPREP SPEECH ACTION DOCK
 * Bottom action bar with voice speech-to-text input, keyboard fallback toggle,
 * processing state transitions, and answer submission.
 */

import React, { useState } from 'react';
import { Mic, MicOff, Keyboard, Send, Loader2 } from 'lucide-react';
import { VoiceState } from '../../engine/VoiceEngine';

interface SpeechActionDockProps {
  voiceState: VoiceState;
  transcript: string;
  onStartListening: () => void;
  onStopListening: () => void;
  onSubmitAnswer: (text: string) => void;
  onFinishEarly: () => void;
  isProcessing: boolean;
}

export const SpeechActionDock: React.FC<SpeechActionDockProps> = ({
  voiceState,
  transcript,
  onStartListening,
  onStopListening,
  onSubmitAnswer,
  onFinishEarly,
  isProcessing
}) => {
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');

  const handleManualSubmit = () => {
    const finalAnswer = isKeyboardMode ? typedAnswer : transcript;
    if (!finalAnswer.trim()) {
      alert('Please speak or type your response before submitting.');
      return;
    }
    onSubmitAnswer(finalAnswer);
    setTypedAnswer('');
  };

  return (
    <div className="bg-[#111726]/95 backdrop-blur-xl border-t border-white/15 p-3 sm:p-4 text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        
        {/* Processing State Banner */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Analyzing your response... Evaluating Relevance &bull; Structure &bull; Clarity</span>
          </div>
        )}

        {/* Input Area */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Mode Switcher */}
          <button
            onClick={() => setIsKeyboardMode(!isKeyboardMode)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            title={isKeyboardMode ? 'Switch to Voice Input' : 'Switch to Keyboard Input'}
          >
            {isKeyboardMode ? <Mic className="w-4 h-4 text-amber-400" /> : <Keyboard className="w-4 h-4" />}
          </button>

          {/* Transcript / Input Box */}
          <div className="flex-grow w-full relative">
            {isKeyboardMode ? (
              <textarea
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="Type your structured answer here (e.g. In my view, I would prioritize three key interventions...)"
                rows={2}
                className="w-full bg-slate-900/90 border border-white/20 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            ) : (
              <div className="w-full min-h-[52px] bg-slate-900/90 border border-white/20 rounded-xl p-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2 overflow-hidden">
                  {voiceState === 'listening' ? (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping flex-shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  )}
                  <span className="truncate italic">
                    {transcript || (voiceState === 'listening' ? 'Listening to you... Speak clearly' : 'Click "Start Speaking" or toggle keyboard')}
                  </span>
                </div>

                {voiceState === 'listening' ? (
                  <button
                    onClick={onStopListening}
                    className="flex-shrink-0 px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <MicOff className="w-3 h-3" />
                    <span>Done Speaking</span>
                  </button>
                ) : (
                  <button
                    onClick={onStartListening}
                    className="flex-shrink-0 px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Mic className="w-3 h-3" />
                    <span>Start Speaking</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handleManualSubmit}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Answer</span>
            </button>

            <button
              onClick={onFinishEarly}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Finish &amp; Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
