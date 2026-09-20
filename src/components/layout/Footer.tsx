/**
 * DARPANPREP APPLICATION FOOTER
 * Trust banner, navigation links, and bottom copyright.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0A0E17] text-white border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bottom CTA & Trust Strip */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-10 border-b border-white/10">
          
          {/* Footer Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B1020] border border-amber-500/30 flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                <rect width="32" height="32" rx="8" fill="#0B0F19"/>
                <path d="M10 8H16C20.4 8 24 11.6 24 16C24 20.4 20.4 24 16 24H10V8Z" stroke="#F59E0B" strokeWidth="2.5"/>
                <path d="M13 13H16C17.65 13 19 14.35 19 16C19 17.65 17.65 19 16 19H13V13Z" fill="#F59E0B"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base text-white">DarpanPrep</span>
              <span className="text-[10px] text-slate-400">Practice Today &bull; Reflect Tomorrow</span>
            </div>
          </div>

          {/* Banner message & CTA button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="text-sm font-semibold text-slate-200">
              A Better You is Just a Conversation Away
            </span>
            <button
              onClick={() => navigate('/interview/setup')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 hover:scale-105 cursor-pointer"
            >
              <span>Start Free Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Reliable</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Made for Indian Aspirants</span>
            </div>
          </div>
        </div>

        {/* Secondary Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 DarpanPrep Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/exams" className="hover:text-slate-300 transition-colors">Exams Catalog</Link>
            <Link to="/placement" className="hover:text-slate-300 transition-colors">Placement Preparation</Link>
            <Link to="/communication" className="hover:text-slate-300 transition-colors">Communication Lab</Link>
            <Link to="/pricing" className="hover:text-slate-300 transition-colors">Pricing Plans</Link>
            <Link to="/resources" className="hover:text-slate-300 transition-colors">Preparation Guides</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
