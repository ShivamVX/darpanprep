/**
 * DARPANPREP EXAMS DIRECTORY PAGE
 * Searchable catalog of 50+ supported government, state PSC, and banking exams.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { EXAMS_DATABASE } from '../data/exams';

export const ExamsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'government' | 'placement'>('all');

  const filtered = EXAMS_DATABASE.filter(e => {
    const matchesCategory = activeCategory === 'all' || e.category === activeCategory;
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight">
            50+ Supported Examinations
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Specialized mock interview boards fine-tuned on actual commission patterns, past interview transcripts, and DAF guidelines.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exam (UPSC, BPSC, SBI PO...)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111726] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Exams' },
              { id: 'government', label: 'Government & Civil Services' },
              { id: 'placement', label: 'Campus & Corporate Placements' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(exam => (
            <div
              key={exam.id}
              className="bg-[#111726] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {exam.category.toUpperCase()}
                  </span>
                  {exam.popular && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      High Aspirant Demand
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold font-sans text-white mb-2">{exam.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {exam.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-300 pt-3 border-t border-white/5 mb-6">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-200">Medium:</span>{' '}
                    <span>{exam.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-200">Board Format:</span>{' '}
                    <span>{exam.interviewTypes.join(' &bull; ')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/interview/setup')}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Start Mock Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
