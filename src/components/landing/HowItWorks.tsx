/**
 * DARPANPREP HOW IT WORKS SECTION
 * 4-step progressive timeline with connecting indicators and handwritten callout.
 */

import React from 'react';
import { UserPlus, BookOpen, Video, FileCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '1. Sign Up',
      desc: 'Create your free account in seconds',
      icon: UserPlus,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      step: '2. Choose Your Exam',
      desc: 'Select from 50+ interview categories',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      step: '3. Start Practicing',
      desc: 'Interact with realistic 3D AI interviewers',
      icon: Video,
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      step: '4. Get Detailed Feedback',
      desc: 'Know your strengths, weaknesses and expected score',
      icon: FileCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-900 tracking-tight">
            How DarpanPrep Works?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Start your journey in 4 simple steps
          </p>
        </div>

        <div className="font-script text-blue-600 text-2xl rotate-[-3deg] select-none">
          <span>Small Steps,</span>{' '}
          <span className="font-bold underline decoration-wavy decoration-amber-400">Big Results</span>
        </div>
      </div>

      {/* Steps Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="relative flex-1">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  {item.step}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
