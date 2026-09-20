/**
 * DARPANPREP 404 NOT FOUND PAGE
 * Clean error page with navigation back to safety.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md bg-[#111726] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-extrabold font-sans mb-2">404</h1>
        <h2 className="text-lg font-bold mb-2">Page Not Found</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The interview room or resource you're seeking doesn't exist or has moved.
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to DarpanPrep</span>
        </button>
      </div>
    </div>
  );
};
