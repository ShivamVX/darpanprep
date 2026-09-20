/**
 * DARPANPREP UPGRADE MODAL
 * Displayed when user free interviews are exhausted or when user clicks plan upgrade.
 */

import React from 'react';
import { X, Crown, Sparkles, Check, Diamond } from 'lucide-react';
import { useUsage } from '../../providers/UsageProvider';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, closeUpgradeModal, remainingInterviews, resetUsageForDemo } = useUsage();

  if (!isUpgradeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#111726] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeUpgradeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-bold text-amber-400 mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>DARPANPREP PRO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
            {remainingInterviews === 0
              ? "You've Completed Your 5 Free Interviews!"
              : 'Upgrade to Unlimited Interviews'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Accelerate your readiness with unlimited 3D AI mock panels, full body-language video feedback, and in-depth DAF analysis.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          
          {/* Pro Monthly */}
          <div className="relative bg-[#161F33] border-2 border-amber-500 rounded-xl p-5 flex flex-col justify-between shadow-xl shadow-amber-500/10">
            <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wide uppercase">
              Most Popular
            </span>
            <div>
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <Crown className="w-4 h-4" />
                <span className="font-bold text-sm">Pro Plan</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold font-sans">₹299</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> AI Mock Interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Real-time Camera &amp; Eye-contact Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>All 50+ Govt &amp; Placement Tracks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>11 Regional Languages + Hinglish</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Payment gateway integration: Click "Continue to Payment" will connect to Razorpay/Stripe in production.')}
              className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              Continue to Payment (₹299)
            </button>
          </div>

          {/* Yearly Best Value */}
          <div className="bg-[#141B34] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-400">
                <Diamond className="w-4 h-4" />
                <span className="font-bold text-sm">Yearly Plan</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold font-sans">₹2,499</span>
                <span className="text-xs text-slate-400">/ year</span>
                <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Save 30%
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Everything in Pro Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Dedicated Doubt Clearance with Mentors</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Full Year 365 Days Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Early Access to SSB &amp; GD Rooms</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Payment gateway integration: Click "Continue to Payment" will connect to Razorpay/Stripe in production.')}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Continue to Payment (₹2,499)
            </button>
          </div>
        </div>

        {/* Demo convenience action */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Testing in Prototype mode?</span>
          <button
            onClick={() => {
              resetUsageForDemo();
              closeUpgradeModal();
            }}
            className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
          >
            <Sparkles className="w-3 h-3" />
            <span>Reset to 5 Free Interviews</span>
          </button>
        </div>
      </div>
    </div>
  );
};
