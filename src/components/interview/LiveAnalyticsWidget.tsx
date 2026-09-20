/**
 * DARPANPREP LIVE ANALYTICS WIDGET
 * Real-time telemetry displaying confidence, pacing, fillers, and practice signals.
 */

import React from 'react';
import { Activity, Gauge, MessageCircle, Eye, Volume2 } from 'lucide-react';
import { useBodyLanguage } from '../../providers/BodyLanguageProvider';

interface LiveAnalyticsProps {
  confidenceScore: number;
  speechPaceWPM: number;
  fillerWordsCount: number;
  voiceClarityScore: number;
}

export const LiveAnalyticsWidget: React.FC<LiveAnalyticsProps> = ({
  confidenceScore,
  speechPaceWPM,
  fillerWordsCount,
  voiceClarityScore
}) => {
  const { signals } = useBodyLanguage();

  return (
    <div className="bg-[#111726]/90 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xl text-white flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
            Live Telemetry
          </span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          AI Practice Signals
        </span>
      </div>

      {/* Metrics List */}
      <div className="space-y-3.5 my-3">
        {/* Metric 1: Confidence */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              Confidence Level
            </span>
            <span className="font-bold text-amber-400">{confidenceScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Speech Pace */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Speaking Pace
            </span>
            <span className="font-bold text-emerald-400">
              {speechPaceWPM} WPM <span className="text-[10px] text-slate-400 font-normal">(Optimal)</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((speechPaceWPM / 180) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Filler Words */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-rose-400" />
              Filler Words ("um / like")
            </span>
            <span className={`font-bold ${fillerWordsCount > 3 ? 'text-rose-400' : 'text-blue-400'}`}>
              {fillerWordsCount} detected
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(fillerWordsCount * 20, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Eye Contact */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              Eye Contact Stability
            </span>
            <span className="font-bold text-indigo-400">{signals.eyeContact}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${signals.eyeContact}%` }}
            />
          </div>
        </div>

        {/* Metric 5: Voice Clarity */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              Voice Clarity &amp; Tone
            </span>
            <span className="font-bold text-cyan-400">{voiceClarityScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${voiceClarityScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-white/5">
        Biometric practice telemetry computed continuously
      </div>
    </div>
  );
};
