/**
 * DARPANPREP HERO SECTION
 * Full-width cinematic hero with warm ambient lighting, animated feature pills,
 * high-conversion CTAs, and the 3D floating laptop interview simulation.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquare, BarChart2, Rocket, PlayCircle } from 'lucide-react';
import { LaptopPreview } from './LaptopPreview';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#0A0E17] text-white pt-10 pb-20 overflow-hidden">
      
      {/* Warm Ambient Glow Effects */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 flex flex-col text-center lg:text-left">
            
            {/* Superbadge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold w-fit mx-auto lg:mx-0 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>India's Most Realistic AI Mock Interview Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans tracking-tight leading-[1.1] mb-6">
              Face the Interview<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Before the Real One
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-body">
              AI-powered mock interviews for Government Exams, Placements, and Communication Skills &mdash; with realistic 3D interviewers, live feedback, and detailed performance analysis.
            </p>

            {/* Three Animated Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span>Realistic AI<br />Interviewers</span>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <span>Personalized<br />Feedback</span>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <span>Improve<br />Communication</span>
              </div>
            </div>

            {/* CTA Buttons & Handwritten Note */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
              <button
                onClick={() => navigate('/interview/setup')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Start Free Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/communication')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-amber-400" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Micro guarantee & handwritten annotation */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span>Get <strong>5 FREE</strong> mock interviews. No credit card required.</span>
              <div className="hidden sm:block font-script text-amber-400 text-lg rotate-[-3deg]">
                &ldquo;Better Conversations, A Brighter You!&rdquo;
              </div>
            </div>
          </div>

          {/* Right Column: 3D Laptop Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <LaptopPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
