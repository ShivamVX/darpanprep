/**
 * DARPANPREP STUDENT DASHBOARD
 * Welcome banner, 7-day practice streak, metrics, score progression, and interview history.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Award, Clock, ArrowRight, History, TrendingUp } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { InterviewMemory } from '../engine/interviewMemory';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stats = InterviewMemory.getStats();
  const history = InterviewMemory.getInterviewHistory();

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome & Streak Banner */}
        <div className="bg-gradient-to-r from-[#141B34] via-[#161F33] to-[#111726] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">👋</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-sans">
                Good evening, {user?.name || 'Aspirant'}
              </h1>
            </div>
            <p className="text-sm text-slate-300 max-w-lg">
              You are currently performing in the top 15% of Civil Services aspirants. Keep momentum steady before your real interview board.
            </p>
          </div>

          {/* Gamified 7-Day Practice Streak Card */}
          <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 sm:px-6 flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Flame className="w-7 h-7 fill-slate-950" />
            </div>
            <div>
              <div className="text-xl font-black font-sans text-amber-400">
                {stats.streakDays} Day Streak!
              </div>
              <div className="text-xs text-slate-300">
                Consistent practice builds natural poise
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#111726] border border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center mb-3">
              <History className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-sans">{stats.totalInterviews}</div>
            <div className="text-xs text-slate-400 mt-0.5">Interviews Completed</div>
          </div>

          <div className="bg-[#111726] border border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-sans">{stats.avgScore} / 100</div>
            <div className="text-xs text-slate-400 mt-0.5">Average Darpan Score</div>
          </div>

          <div className="bg-[#111726] border border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-sans">{stats.bestScore} / 100</div>
            <div className="text-xs text-slate-400 mt-0.5">Best Board Score</div>
          </div>

          <div className="bg-[#111726] border border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-sans">{stats.totalHours} hrs</div>
            <div className="text-xs text-slate-400 mt-0.5">Active Speech Practice</div>
          </div>
        </div>

        {/* Diagnosis & Recommended Next Practice Row */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Weak Areas & Diagnosis */}
          <div className="lg:col-span-6 bg-[#111726] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold font-sans tracking-tight mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Performance Diagnosis &amp; Growth Edge</span>
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Based on your past 5 AI board sessions, here is your primary growth lever:
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Communication &amp; Articulation</span>
                    <span className="text-emerald-400">86% (Strong)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[86%] h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Content &amp; Policy Knowledge</span>
                    <span className="text-amber-400">76% (Growth Opportunity)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[76%] h-full bg-amber-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Composure Under Cross-Questioning</span>
                    <span className="text-blue-400">82% (Consistent)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[82%] h-full bg-blue-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200">
              💡 <strong>AI Mentor Tip:</strong> Your Content Knowledge is consistently below Communication. Incorporate specific committee names (e.g. Gadgil, Kasturirangan, NITI Aayog) to give weight to policy arguments.
            </div>
          </div>

          {/* Quick Launch Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#161F33] to-[#111726] border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Tailored Recommendation
              </span>
              <h3 className="text-xl font-bold font-sans text-white mb-2">
                UPSC Situation Reaction &amp; Ethics Board
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                A 10-question high-intensity panel specifically addressing discretionary executive powers, conflict of interest, and anti-corruption dilemmas.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs mb-6">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">Lead Panelist</div>
                  <div className="font-bold text-white mt-0.5">Dr. R. Mehta</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">Expected Duration</div>
                  <div className="font-bold text-white mt-0.5">~20 Minutes</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/interview/setup')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <span>Launch Recommended Mock Interview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Past Interview History */}
        <div className="bg-[#111726] border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-sans flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              <span>Your Interview History</span>
            </h2>
            <span className="text-xs text-slate-400">
              {history.length} sessions logged
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {history.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors"
              >
                <div>
                  <h3 className="font-bold text-sm text-white">{item.examName}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>{new Date(item.completedAt).toLocaleDateString()}</span>
                    <span>&bull;</span>
                    <span>{item.totalQuestions} Questions</span>
                    <span>&bull;</span>
                    <span>{Math.round(item.durationSeconds / 60)} Mins</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-lg font-bold text-amber-400">
                      {item.scores.overall} / 100
                    </span>
                    <span className="block text-[10px] text-emerald-400 font-semibold uppercase">
                      {item.verdict}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate('/interview/report')}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
