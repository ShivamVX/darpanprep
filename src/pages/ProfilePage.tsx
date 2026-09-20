/**
 * DARPANPREP PROFILE PAGE
 * User preferences, exam tracking, language settings, and account management.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, Save, Check } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { useUsage } from '../providers/UsageProvider';
import { INDIAN_LANGUAGES } from '../data/exams';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { remainingInterviews, totalAllowed, openUpgradeModal, resetUsageForDemo } = useUsage();

  const [name, setName] = useState(user?.name || 'Aspirant');
  const [goal, setGoal] = useState(user?.preferredGoal || 'government');
  const [lang, setLang] = useState(user?.preferredLanguage || 'Hinglish');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      preferredGoal: goal,
      preferredLanguage: lang
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-sans">Aspirant Profile</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage your personal preferences, interview medium, and subscription
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-600/20 hover:text-rose-400 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Free Usage Quota Card */}
        <div className="bg-[#111726] border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Free Mock Interviews: <span className="text-amber-400">{remainingInterviews} / {totalAllowed} Remaining</span>
              </div>
              <div className="text-xs text-slate-400">
                Quota decrements only after full interview assessment
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetUsageForDemo}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Reset to 5 (Test)
            </button>
            <button
              onClick={openUpgradeModal}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <div className="bg-[#111726] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email</label>
              <input
                type="email"
                disabled
                value={user?.email || 'aspirant@example.com'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-white/10 text-xs sm:text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Preparation Focus</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="government">Government &amp; Civil Services</option>
                  <option value="placement">Campus Placement</option>
                  <option value="job">Corporate Job Interview</option>
                  <option value="communication">Communication Practice</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Interview Language</label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {INDIAN_LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {isSaved ? (
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <Check className="w-4 h-4" /> Preferences Saved
                </span>
              ) : <div />}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
