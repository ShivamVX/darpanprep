/**
 * DARPANPREP ASSESSMENT REPORT PAGE
 * Full appraisal report with DARPAN SCORE (e.g. 83/100), 6-dimension breakdown,
 * signature Darpan Moment, strengths, actionable improvements, and PDF export.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Printer, RotateCcw, LayoutDashboard, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { InterviewReport } from '../engine/interviewTypes';
import { InterviewMemory } from '../engine/interviewMemory';

export const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<InterviewReport | null>(null);

  useEffect(() => {
    const history = InterviewMemory.getInterviewHistory();
    if (history.length > 0) {
      setReport(history[0]);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-[#0A0E17] text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-400 mb-4">No recent interview report found.</p>
          <button
            onClick={() => navigate('/interview/setup')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
          >
            Start a Mock Interview
          </button>
        </div>
      </div>
    );
  }

  const { scores, darpanMoment, strengths, improvements } = report;

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Action Header (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {report.examName} Assessment Complete
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Report (PDF)</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate('/interview/setup')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Again</span>
            </button>
          </div>
        </div>

        {/* PRINTABLE ASSESSMENT REPORT CARD */}
        <div className="bg-[#111726] print:bg-white print:text-black border border-white/10 print:border-slate-300 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10 print:border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 print:text-amber-800 text-xs font-bold mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL PERFORMANCE APPRAISAL</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight">
                DARPAN SCORE REPORT
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 print:text-slate-600 mt-1">
                Candidate Evaluation &bull; Board Panel 4 &bull; {new Date(report.completedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Overall Score Circle */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex flex-col items-center justify-center p-3 shadow-xl shadow-amber-500/20 flex-shrink-0">
                <span className="text-3xl sm:text-4xl font-black font-sans leading-none">
                  {scores.overall}
                </span>
                <span className="text-xs font-bold text-slate-900 mt-0.5">/ 100</span>
                <span className="text-[10px] font-extrabold tracking-wider uppercase mt-1 px-2 py-0.5 rounded bg-slate-950 text-amber-300">
                  {report.verdict}
                </span>
              </div>
            </div>
          </div>

          {/* 6 Dimension Breakdown */}
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-amber-400 print:text-amber-800 mb-4">
              Performance Dimension Breakdown
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Communication & Delivery', val: scores.communication, desc: 'Pacing, vocal clarity, and articulation under pressure.' },
                { label: 'Confidence & Composure', val: scores.confidence, desc: 'Steady demeanour, tone conviction, and emotional balance.' },
                { label: 'Content & Policy Knowledge', val: scores.contentKnowledge, desc: 'Factual accuracy, legal/statutory awareness, and depth.' },
                { label: 'Answer Structure & Synthesis', val: scores.structure, desc: 'Clear premise, contextual argument, and forward-looking solution.' },
                { label: 'Listening & Responsiveness', val: scores.listening, desc: 'Addressing specific sub-questions without conversational drift.' },
                { label: 'Body Language Signals', val: scores.bodyLanguage, desc: 'Sustained eye-contact, stable posture, and head composure.' }
              ].map(item => (
                <div key={item.label} className="bg-slate-900/80 print:bg-slate-50 border border-white/5 print:border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1">
                    <span>{item.label}</span>
                    <span className="text-amber-400 print:text-amber-800 font-bold">{item.val} / 100</span>
                  </div>
                  <p className="text-[11px] text-slate-400 print:text-slate-600 mb-2">{item.desc}</p>
                  <div className="w-full h-2 bg-slate-800 print:bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Feature: DARPAN MOMENT */}
          <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/40 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h3 className="font-sans font-extrabold text-lg text-amber-400 print:text-amber-800 uppercase tracking-wide">
                Signature Feature &mdash; DARPAN MOMENT
              </h3>
            </div>

            <p className="text-xs text-slate-400 print:text-slate-600 mb-4">
              Our analysis flagged this high-stakes exchange as your most crucial learning opportunity:
            </p>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/90 print:bg-slate-100 border border-white/10 print:border-slate-300">
                <div className="text-[11px] font-bold text-slate-400 print:text-slate-700 uppercase tracking-wider mb-1">
                  Your Statement During Interview:
                </div>
                <blockquote className="text-sm italic font-medium text-slate-200 print:text-slate-900">
                  "{darpanMoment.candidateClaim}"
                </blockquote>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/15 print:bg-amber-50 border border-amber-500/30">
                <div className="text-[11px] font-bold text-amber-300 print:text-amber-900 uppercase tracking-wider mb-1">
                  How a Real UPSC / Corporate Board Challenges This:
                </div>
                <p className="text-xs sm:text-sm font-semibold text-amber-100 print:text-amber-950">
                  "{darpanMoment.boardChallenge}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 print:bg-emerald-50 border border-emerald-500/25">
                <div className="text-[11px] font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider mb-1">
                  Recommended Practical Improvement:
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 print:text-emerald-950">
                  {darpanMoment.improvementTip}
                </p>
              </div>
            </div>
          </div>

          {/* Strengths & Improvements Columns */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-slate-900/60 print:bg-slate-50 border border-white/10 print:border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-sm text-emerald-400 print:text-emerald-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>What You Did Well (Strengths)</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300 print:text-slate-700">
                {strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="bg-slate-900/60 print:bg-slate-50 border border-white/10 print:border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-sm text-amber-400 print:text-amber-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Areas to Improve (Action Plan)</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300 print:text-slate-700">
                {improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">&bull;</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next Recommended Practice */}
          <div className="p-5 rounded-2xl bg-[#161F33] print:bg-slate-100 border border-white/10 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Recommended Next Step
              </span>
              <h4 className="font-bold text-sm text-white print:text-slate-900">
                {report.recommendedPractice}
              </h4>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
                Targeting your weakest scoring dimension to increase overall readiness above 88.
              </p>
            </div>

            <button
              onClick={() => navigate('/interview/setup')}
              className="print:hidden px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Practice Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
