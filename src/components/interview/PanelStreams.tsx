/**
 * DARPANPREP AI PANEL STREAMS
 * Renders the 3 AI board panelists with active speaker halo, audio waveforms,
 * lip/breathing animations, and live question subtitles.
 */

import React from 'react';
import { Volume2 } from 'lucide-react';
import { InterviewerId, InterviewQuestion } from '../../engine/interviewTypes';
import { PANEL_PERSONAS } from '../../data/exams';

interface PanelStreamsProps {
  currentQuestion: InterviewQuestion;
  activeSpeakerId: InterviewerId;
  isSpeaking: boolean;
  onReplayAudio: () => void;
}

export const PanelStreams: React.FC<PanelStreamsProps> = ({
  currentQuestion,
  activeSpeakerId,
  isSpeaking,
  onReplayAudio
}) => {
  const panelOrder: InterviewerId[] = ['dr_mehta', 'ms_ananya', 'prof_rao'];

  return (
    <div className="flex flex-col gap-4">
      {/* 3 Panelists Video Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {panelOrder.map((id) => {
          const interviewer = PANEL_PERSONAS[id];
          const isCurrentSpeaker = activeSpeakerId === id;

          return (
            <div
              key={id}
              className={`relative rounded-2xl overflow-hidden bg-slate-900 border transition-all duration-300 aspect-[4/3] sm:aspect-video ${
                isCurrentSpeaker
                  ? 'ring-2 sm:ring-4 ring-amber-400 border-amber-400 shadow-xl shadow-amber-500/20'
                  : 'border-white/10 opacity-80'
              }`}
            >
              {/* Media feed simulation */}
              <img
                src={interviewer.avatarUrl}
                alt={interviewer.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isCurrentSpeaker && isSpeaking ? 'scale-105 contrast-105' : 'scale-100'
                }`}
              />

              {/* Active Speaker Ring / Audio Wave */}
              {isCurrentSpeaker && isSpeaking && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-full border border-amber-400">
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-amber-400 rounded-full animate-[soundBar_0.8s_ease-in-out_infinite]" />
                    <span className="w-1 bg-amber-400 rounded-full animate-[soundBar_1.1s_ease-in-out_infinite_0.2s]" />
                    <span className="w-1 bg-amber-400 rounded-full animate-[soundBar_0.9s_ease-in-out_infinite_0.4s]" />
                  </div>
                  <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider ml-1">
                    Speaking
                  </span>
                </div>
              )}

              {/* Speaker Name Tag */}
              <div className="absolute bottom-0 inset-x-0 p-2 sm:p-2.5 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <div className="text-xs sm:text-sm font-bold text-white truncate">
                      {interviewer.name}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-amber-300/90 truncate">
                      {interviewer.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Question Card / Subtitles */}
      <div className="relative rounded-2xl bg-[#111726]/90 backdrop-blur-md border border-white/15 p-4 sm:p-5 shadow-xl text-white">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {PANEL_PERSONAS[activeSpeakerId]?.name || 'Board Member'} asking:
            </span>
            {currentQuestion.isFollowUp && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30">
                Follow-up Challenge
              </span>
            )}
          </div>

          <button
            onClick={onReplayAudio}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-colors cursor-pointer"
            title="Listen to question again"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Replay Voice</span>
          </button>
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed font-sans">
          "{currentQuestion.text}"
        </p>
      </div>
    </div>
  );
};
