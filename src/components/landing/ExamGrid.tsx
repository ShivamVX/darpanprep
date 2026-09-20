/**
 * DARPANPREP EXAM GRID & DETAIL MODAL
 * 3x3 responsive grid with hover glow, ripple click, and detailed board preview modal.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X, Shield, Landmark, BookMarked, Train, Cog, Briefcase, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { EXAMS_DATABASE } from '../../data/exams';
import { ExamConfig } from '../../engine/interviewTypes';

export const ExamGrid: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<ExamConfig | null>(null);

  const featuredExams = [
    { id: 'upsc-cse', name: 'UPSC', tag: 'CSE', icon: Shield, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'bpsc', name: 'State PSC', tag: '(BPSC, RPSC...)', icon: Landmark, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { id: 'banking-po', name: 'Banking', tag: '(IBPS, SBI, RBI)', icon: Landmark, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'defence-ssb', name: 'Defence', tag: '(NDA, CDS, AFCAT)', icon: Shield, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { id: 'teaching', name: 'Teaching', tag: '(CTET, UGC, KVS)', icon: BookMarked, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { id: 'railways-rrb', name: 'Railways', tag: '(RRB)', icon: Train, color: 'text-red-700 bg-red-50 border-red-200' },
    { id: 'psu-engineering', name: 'Public Sector', tag: '(IES, ISRO, DRDO...)', icon: Cog, color: 'text-orange-700 bg-orange-50 border-orange-200' },
    { id: 'placement-hr', name: 'Placements', tag: 'Campus & Off-Campus', icon: Briefcase, color: 'text-pink-700 bg-pink-50 border-pink-200' },
    { id: 'all-more', name: '+ More', tag: 'All Govt. Exams', icon: MoreHorizontal, color: 'text-slate-700 bg-slate-50 border-slate-200' }
  ];

  const handleCardClick = (examId: string) => {
    if (examId === 'all-more') {
      navigate('/exams');
      return;
    }
    const found = EXAMS_DATABASE.find(e => e.id === examId) || EXAMS_DATABASE[0];
    setSelectedExam(found);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-900 tracking-tight">
            Prepare for Every Dream
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            From Civil Services to Campus Placements &mdash; We've Got You Covered
          </p>
        </div>

        <button
          onClick={() => navigate('/exams')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white text-xs font-bold text-slate-700 hover:text-slate-900 transition-all hover:translate-x-1 cursor-pointer w-fit"
        >
          <span>View All Exams</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        {featuredExams.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="group bg-[#FBF9F5] hover:bg-white border border-[#EFEAE1] hover:border-amber-500 rounded-xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-full">
                {item.tag}
              </p>
            </div>
          );
        })}
      </div>

      {/* Exam Details Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-900 border border-slate-200">
            
            <button
              onClick={() => setSelectedExam(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2">
              {selectedExam.category.toUpperCase()} INTERVIEW
            </div>

            <h3 className="text-xl font-bold font-sans tracking-tight mb-2">
              {selectedExam.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              {selectedExam.description}
            </p>

            <div className="space-y-2.5 bg-slate-50 rounded-xl p-4 text-xs mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Interview Format:</strong>{' '}
                  <span className="text-slate-600">{selectedExam.interviewTypes.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Supported Languages:</strong>{' '}
                  <span className="text-slate-600">{selectedExam.languages.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Key Evaluation Pillars:</strong>{' '}
                  <span className="text-slate-600">{selectedExam.questionCategories.join(' &bull; ')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedExam(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedExam(null);
                  navigate('/interview/setup');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                Start Mock Interview &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
