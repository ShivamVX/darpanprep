/**
 * DARPANPREP PRICING SECTION
 * Free, Pro (highlighted with Most Popular tag), and Yearly pricing plans.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, User, Crown, Diamond } from 'lucide-react';
import { useUsage } from '../../providers/UsageProvider';

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const { openUpgradeModal } = useUsage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-900 tracking-tight">
          Simple &amp; Affordable Plans
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Start free. Upgrade when you're ready.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* 1. Free Plan */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <User className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Free Plan</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold font-sans text-slate-900">₹0</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>5 mock interviews for every user</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Access to all exam categories</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Basic feedback &amp; scoring</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/interview/setup')}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Get Started Free
          </button>
        </div>

        {/* 2. Pro Plan (Most Popular Highlight) */}
        <div className="relative bg-[#FFFDF9] border-2 border-amber-500 rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-amber-500/10">
          <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md">
            Most Popular
          </div>

          <div>
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Crown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Pro Plan</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold font-sans text-slate-900">₹299</span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8 font-medium">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>Unlimited</strong> mock interviews</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Detailed AI feedback &amp; analytics</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Camera &amp; body language analysis</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Access to all exams &amp; languages</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={openUpgradeModal}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02]"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* 3. Yearly Plan */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Diamond className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Yearly Plan</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold font-sans text-slate-900">₹2,499</span>
              <span className="text-xs text-slate-500 font-medium">/ year</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Save 30%
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Everything in Pro Plan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span><strong>Save 30%</strong> (Best Value)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Early access to new features</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Dedicated doubt support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={openUpgradeModal}
            className="w-full py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Go Yearly
          </button>
        </div>
      </div>
    </section>
  );
};
