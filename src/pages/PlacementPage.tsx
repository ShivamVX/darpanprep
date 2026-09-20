/**
 * DARPANPREP PLACEMENT PAGE
 * Specialized interview tracks for campus hires, technical viva, consulting, and HR behavioral rounds.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Code, Compass, Wrench, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PlacementPage: React.FC = () => {
  const navigate = useNavigate();

  const tracks = [
    {
      id: 'hr',
      title: 'Behavioral & Culture HR Round',
      desc: 'Master behavioral questions using the STAR (Situation, Task, Action, Result) methodology. Conquer "Tell me about yourself", weaknesses, and long-term career vision.',
      icon: Users,
      skills: ['STAR Structure', 'Conflict Resolution', 'Salary & Role Negotiation']
    },
    {
      id: 'software',
      title: 'Software Engineering (SDE) Viva',
      desc: 'Rigorous conceptual questioning on Data Structures, Algorithms, Distributed Systems, Web Architecture, and Code Refactoring scenarios.',
      icon: Code,
      skills: ['Algorithmic Logic', 'System Architecture', 'Clean Code Practices']
    },
    {
      id: 'consulting',
      title: 'Management Consulting & Strategy',
      desc: 'Market-sizing guesstimates, profitability breakdown cases, and hypothesis-driven business problem solving tailored for MBB & Big 4.',
      icon: Compass,
      skills: ['Case Structuring', 'Guesstimates', 'Executive Presence']
    },
    {
      id: 'core',
      title: 'Core Engineering (Mech / Civil / Electrical)',
      desc: 'In-depth viva assessing foundational technical concepts, industrial plant operations, equipment diagnostics, and CAD/safety compliance.',
      icon: Wrench,
      skills: ['Core Fundamentals', 'Project Defense', 'Industrial Safety Standards']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-400 text-xs font-bold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAMPUS &amp; LATERAL RECRUITMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight">
            Corporate &amp; Tech Placements
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            From Day-1 campus drives to Tier-1 product tech companies &mdash; practice with specialized corporate interview panels.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {tracks.map(t => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                className="bg-[#111726] border border-white/10 hover:border-amber-500/40 rounded-3xl p-7 flex flex-col justify-between shadow-xl transition-all duration-200"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-white mb-2">{t.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-body">
                    {t.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {t.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/interview/setup')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  <span>Practice This Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
