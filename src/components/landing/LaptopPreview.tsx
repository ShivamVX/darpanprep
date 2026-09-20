/**
 * DARPANPREP 3D FLOATING LAPTOP PREVIEW
 * Displays floating laptop above study desk with interactive AI interview panel, live subtitles,
 * speaking indicator, and warm study environment details.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Video, PhoneOff, Volume2, Sparkles } from 'lucide-react';

export const LaptopPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-xl mx-auto">
      
      {/* Wall Post-it Notes */}
      <div className="absolute -top-6 right-6 z-20 bg-[#FFFBEB] text-[#78350F] border border-[#FDE68A] rounded shadow-md px-2.5 py-1.5 text-center transform rotate-3 select-none pointer-events-none">
        <div className="text-[9px] tracking-wider uppercase">Discipline</div>
        <div className="text-[8px] text-[#92400E]">Builds</div>
        <div className="text-[11px] font-extrabold text-[#78350F] tracking-wide">FREEDOM</div>
      </div>

      <div className="absolute top-1/3 -right-6 z-20 hidden sm:flex flex-col items-center font-script text-white text-lg rotate-6 select-none pointer-events-none">
        <span>Practice</span>
        <span>Improve</span>
        <span className="text-amber-400 font-bold">Succeed</span>
        <svg className="w-8 h-5 mt-0.5 text-amber-400" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 25 Q 30 20 45 5"/>
          <polyline points="38 4 46 4 44 12"/>
        </svg>
      </div>

      {/* Floating Laptop Chassis */}
      <div
        onClick={() => navigate('/interview/setup')}
        className="group relative bg-[#181E2C] border border-[#2B354D] rounded-t-2xl p-2.5 sm:p-3 pb-0 shadow-2xl shadow-black/80 hover:shadow-amber-500/10 cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
        title="Click to launch AI Mock Interview"
      >
        {/* Laptop Screen Bezel */}
        <div className="relative bg-black rounded-t-xl overflow-hidden aspect-[16/10] border-2 border-[#111726]">
          
          {/* Webcam dot */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#22c55e] z-30" />

          {/* Panel Display Media */}
          <img
            src="/assets/images/panel-interview.jpg"
            alt="AI Interview Board (Dr. Mehta, Ms. Ananya, Prof. Rao)"
            className="w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-500"
          />

          {/* Live Subtitle / Question Speech Bubble */}
          <div className="absolute top-3 left-6 right-6 sm:left-12 sm:right-12 bg-white/95 backdrop-blur-md text-slate-900 rounded-xl p-2.5 sm:p-3 shadow-xl text-xs z-20 border border-white/40">
            <div className="flex items-center gap-1.5 text-[10px] text-amber-800 font-bold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>Dr. R. Mehta speaking:</span>
            </div>
            <p className="font-semibold text-slate-800 leading-snug">
              "You mentioned rural development in your answer. How would you implement this at the ground level?"
            </p>
          </div>

          {/* Panel Member Tags */}
          <div className="absolute bottom-11 inset-x-2.5 grid grid-cols-3 gap-1.5 z-20 text-center">
            <div className="bg-[#0A0E17]/85 backdrop-blur-sm border border-amber-400/80 rounded px-1 py-0.5 shadow-sm">
              <div className="text-[10px] font-bold text-white truncate">Dr. R. Mehta</div>
              <div className="text-[8px] text-amber-300 truncate">Chairperson</div>
            </div>
            <div className="bg-[#0A0E17]/85 backdrop-blur-sm border border-white/10 rounded px-1 py-0.5 shadow-sm">
              <div className="text-[10px] font-bold text-white truncate">Ms. Ananya Sharma</div>
              <div className="text-[8px] text-slate-400 truncate">Ex-IFS Panel</div>
            </div>
            <div className="bg-[#0A0E17]/85 backdrop-blur-sm border border-white/10 rounded px-1 py-0.5 shadow-sm">
              <div className="text-[10px] font-bold text-white truncate">Prof. S. Rao</div>
              <div className="text-[8px] text-slate-400 truncate">Policy Expert</div>
            </div>
          </div>

          {/* Video Call Controls Overlay */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/15 rounded-full px-3 py-1 z-20">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Mic className="w-3 h-3" />
            </div>
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Video className="w-3 h-3" />
            </div>
            <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white">
              <PhoneOff className="w-3 h-3" />
            </div>
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Volume2 className="w-3 h-3" />
            </div>
          </div>

          {/* Click to practice hint badge */}
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-400 text-amber-200 text-[10px] font-bold flex items-center gap-1.5 z-20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <Sparkles className="w-3 h-3" />
            <span>Click to Practice Live</span>
          </div>
        </div>

        {/* Laptop Hinge & Hardware Base */}
        <div className="h-1.5 bg-[#0F1420] w-[85%] mx-auto" />
        <div className="h-3.5 bg-[#252D3F] rounded-b-xl border-t border-slate-700 shadow-xl flex items-center justify-center">
          <div className="w-16 h-1 bg-[#111827] rounded-b" />
        </div>
      </div>

      {/* Desk Inscription */}
      <div className="mt-3 text-center font-script text-slate-400 text-lg sm:text-xl flex items-center justify-center gap-2">
        <span>Same You</span>
        <span className="text-amber-400 font-bold">Stronger Tomorrow</span>
      </div>
    </div>
  );
};
