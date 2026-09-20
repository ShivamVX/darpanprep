/**
 * DARPANPREP SPLIT FEATURE SECTION
 * Highlights mobile mock interviews & dedicated communication practice modules.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, Zap, Globe, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';

export const FeatureSplit: React.FC = () => {
  const navigate = useNavigate();

  const commModules = [
    'Everyday Conversation',
    'Group Discussion',
    'Personal Introduction',
    'Extempore Practice',
    'Accent & Fluency Improvement'
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Card 1: Practice Anywhere Anytime (Mobile) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#B45309] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-xl shadow-orange-950/20">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-sans leading-tight tracking-tight mb-3">
              Practice <br />Anywhere <br />
              <span className="text-amber-300">Anytime</span>
            </h3>
            <p className="text-sm text-amber-100 max-w-sm mb-6 leading-relaxed">
              Take realistic mock interviews on your phone &mdash; just like the real thing.
            </p>

            {/* App Store Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/15 cursor-pointer hover:bg-slate-950 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M3.6 1.8c-.3.3-.6.8-.6 1.4v17.6c0 .6.3 1.1.6 1.4l.1.1 9.9-9.9v-.2L3.7 1.7l-.1.1zM17.4 8.2l-3.3 3.3 3.3 3.3 3.8-2.2c1.1-.6 1.1-1.6 0-2.2l-3.8-2.2zM14.1 12.5L4.2 22.4c.4.1.9.1 1.4-.2l11.5-6.5-3-3.2zm0-1L17.1 8.3 5.6 1.8c-.5-.3-1-.3-1.4-.2l9.9 9.9z"/>
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">GET IT ON</span>
                  <span className="text-xs font-bold text-white">Google Play</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/15 cursor-pointer hover:bg-slate-950 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.5-1.4.1-1.9-.8-3.5-.8-1.6 0-2.1.8-3.4.8-1.3-.1-2.2-1.2-3.1-2.4-1.7-2.5-3-7-1.3-10 0.9-1.5 2.4-2.4 4-2.4 1.3 0 2.5.9 3.3.9.8 0 2.3-1.1 3.8-.9 1.4.1 2.5.6 3.3 1.8-3 1.8-2.5 5.7.5 7-0.7 1.8-1.7 3.6-2.6 4.7zM15.4 6.7c.6-.8 1.1-1.9 1-3-.9.1-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.7-1.3z"/>
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Coming soon on</span>
                  <span className="text-xs font-bold text-white">App Store</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Display Wrapper & Floating Badges */}
          <div className="relative flex justify-center items-center mt-4">
            <div className="relative w-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900">
              <img
                src="/assets/images/mobile-interview.jpg"
                alt="Candidate on phone mock interview"
                className="w-full h-auto block"
              />
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-3 right-0 sm:-right-4 bg-slate-950/85 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2 shadow-lg animate-bounce duration-1000">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <div className="text-[10px] leading-tight">
                <span className="font-bold text-white block">Camera Analysis</span>
                <span className="text-slate-400 text-[8px]">(Body Language)</span>
              </div>
            </div>

            <div className="absolute top-1/4 -left-2 sm:-left-6 bg-slate-950/85 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-bold text-white">AI Voice Interaction</span>
            </div>

            <div className="absolute bottom-1/3 -right-2 sm:-right-4 bg-slate-950/85 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-bold text-white">Real-time Feedback</span>
            </div>

            <div className="absolute bottom-6 -left-2 sm:-left-4 bg-slate-950/85 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-bold text-white">Multi-language Support</span>
            </div>

            {/* Handwritten Script */}
            <div className="absolute -bottom-2 right-4 font-script text-amber-200 text-xl rotate-[-4deg]">
              &ldquo;Your Growth, Our Reflection!&rdquo;
            </div>
          </div>
        </div>

        {/* Card 2: Build Your Communication (3D Coach) */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-slate-900/5">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900 leading-tight tracking-tight mb-3">
              Not Just Interviews,<br />
              <span className="text-amber-600">Build Your Communication</span>
            </h3>
            <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed font-body">
              Dedicated practice modules to improve speaking skills, confidence, vocabulary and real-world conversation.
            </p>

            <button
              onClick={() => navigate('/communication')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:translate-x-1 mb-8"
            >
              <span>Explore Communication</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-12 gap-6 items-center">
            {/* Checklist */}
            <div className="sm:col-span-7 space-y-3">
              {commModules.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* 3D Coach Avatar */}
            <div className="sm:col-span-5 flex flex-col items-center relative">
              <div className="absolute -top-4 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-md flex items-center gap-1.5 text-[10px] font-bold text-slate-900 whitespace-nowrap z-20">
                <MessageSquare className="w-3 h-3 text-purple-600" />
                <span>Let's talk and grow together!</span>
              </div>
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="/assets/images/comm-coach.jpg"
                  alt="3D Female Communication Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
