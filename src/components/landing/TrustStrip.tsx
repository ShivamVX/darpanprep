/**
 * DARPANPREP FLOATING TRUST STRIP
 * Glassmorphic stat bar overlapping the hero and main sections.
 */

import React from 'react';
import { Award, BookOpen, Cpu, Users } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-8 z-30 mb-16">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        
        {/* Stat 1 */}
        <div className="flex items-center gap-3.5 px-2">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold font-sans text-slate-900 leading-none">50+</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Government Exams</div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-3.5 px-2 border-l-0 sm:border-l border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold font-sans text-slate-900 leading-none">10,000+</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Practice Questions</div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3.5 px-2 border-l-0 lg:border-l border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold font-sans text-slate-900 leading-none">AI-Powered</div>
            <div className="text-xs font-medium text-slate-500 mt-1">3D Interview Simulation</div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="flex items-center gap-3.5 px-2 border-l-0 sm:border-l border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold font-sans text-slate-900 leading-none">Trusted by</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Students Across India</div>
          </div>
        </div>
      </div>
    </div>
  );
};
