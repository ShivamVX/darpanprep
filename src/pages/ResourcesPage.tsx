/**
 * DARPANPREP PREPARATION RESOURCES
 * High-value guides covering DAF analysis, UPSC tips, STAR HR frameworks, and common board traps.
 */

import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();

  const guides = [
    {
      title: 'DAF (Detailed Application Form) Mastery',
      category: 'Civil Services & State PSC',
      desc: 'How the interview board deconstructs your hobbies, home district, graduation background, and service preferences to craft 70% of questions.',
      readTime: '8 Mins Read'
    },
    {
      title: 'The STAR Framework for Corporate HR Interviews',
      category: 'Placement & Campus',
      desc: 'How to structure Situation, Task, Action, and Result into concise 90-second behavioral answers without rambling.',
      readTime: '6 Mins Read'
    },
    {
      title: 'Handling Pressure & Cross-Questioning Under Duress',
      category: 'All Boards',
      desc: 'Tactics for staying calm when a board member politely rejects your answer or aggressively tests your conviction on controversial policy topics.',
      readTime: '10 Mins Read'
    },
    {
      title: 'Top 7 Mistakes That Cost Marks in Personality Tests',
      category: 'Strategy & Poise',
      desc: 'From over-promising ("eliminating corruption completely") to eye-contact drift: common candidate blunders flagged by former board chairpersons.',
      readTime: '7 Mins Read'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KNOWLEDGE REPOSITORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight">
            Aspirant Preparation Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Frameworks and tactical insights gathered from former commission board members, diplomats, and corporate HR leaders.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {guides.map((g, idx) => (
            <div
              key={idx}
              className="bg-[#111726] border border-white/10 hover:border-amber-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-3">
                  <span>{g.category}</span>
                  <span className="text-slate-400">{g.readTime}</span>
                </div>
                <h3 className="text-lg font-bold font-sans text-white mb-2">{g.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {g.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  onClick={() => navigate('/interview/setup')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Practice This Strategy in AI Board</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
