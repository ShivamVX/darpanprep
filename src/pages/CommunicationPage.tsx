/**
 * DARPANPREP COMMUNICATION LAB
 * Dedicated modules for everyday speaking, Group Discussion (GD), personal intro,
 * extempore impromptu speech, and speech fluency growth.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Sparkles, Clock, Mic, ArrowRight } from 'lucide-react';

export const CommunicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [extemporeTimer, setExtemporeTimer] = useState<60 | 120 | 180>(120);

  const modules = [
    {
      id: 'comm-everyday',
      title: 'Everyday Conversation Practice',
      desc: 'Low-stakes natural dialogue with an AI peer. Build conversational reflexes and eliminate speech hesitation.',
      icon: MessageSquare,
      badge: 'Fluency & Poise',
      duration: '5–10 Mins'
    },
    {
      id: 'comm-gd',
      title: 'Group Discussion (GD) Simulator',
      desc: 'Multi-speaker room simulation where AI candidates present contrasting views. Practice making timely entries and moderating politely.',
      icon: Users,
      badge: 'Interpersonal',
      duration: '15 Mins'
    },
    {
      id: 'comm-intro',
      title: 'Personal Introduction Mastery',
      desc: 'Perfect your answer to "Tell me about yourself" using our high-impact 90-second storytelling framework.',
      icon: Sparkles,
      badge: 'First Impression',
      duration: '3–5 Mins'
    },
    {
      id: 'comm-fluency',
      title: 'Accent & Fluency Diagnostics',
      desc: 'Real-time telemetry tracking awkward pauses, filler words ("um/like"), speaking rate (WPM), and sentence completeness.',
      icon: Mic,
      badge: 'Voice Analytics',
      duration: 'Continuous'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>DARPANPREP COMMUNICATION LAB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight">
            Not Just Interviews,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Build Lifelong Articulation
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Confidence is a trained muscle. Practice extempore public speaking, group discussions, and eliminate filler words with your 24/7 AI vocal coach.
          </p>
        </div>

        {/* Extempore Featured Challenge Card */}
        <div className="bg-gradient-to-r from-[#1E293B] via-[#141B34] to-[#1E293B] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
              Signature Challenge
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-white mb-2">
              Timed Extempore (Impromptu Speaking)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              The AI gives you an unseen topic (e.g. &ldquo;Discipline vs Freedom&rdquo;, &ldquo;Future of Work&rdquo;) and 30 seconds thinking time. Speak for the full duration without awkward pauses.
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Select Duration:</span>
              {[60, 120, 180].map(s => (
                <button
                  key={s}
                  onClick={() => setExtemporeTimer(s as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    extemporeTimer === s
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-white/10 text-slate-300 hover:bg-white/15'
                  }`}
                >
                  {s}s ({s / 60}m)
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/interview/setup')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
          >
            <Clock className="w-4 h-4" />
            <span>Launch Extempore Mode</span>
          </button>
        </div>

        {/* 4 Practice Modules Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="bg-[#111726] border border-white/10 hover:border-amber-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg font-sans text-white mb-2">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-body">
                    {m.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-500 font-medium">Session: {m.duration}</span>
                  <button
                    onClick={() => navigate('/interview/setup')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>Start Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
