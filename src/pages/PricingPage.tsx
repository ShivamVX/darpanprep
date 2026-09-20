/**
 * DARPANPREP PRICING PAGE
 * Detailed pricing plan matrix, feature comparison, and FAQ section.
 */

import React from 'react';
import { PricingSection } from '../components/landing/PricingSection';
import { HelpCircle, Sparkles } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does the 5 free interviews policy work?',
      a: 'Every new student account immediately receives 5 full mock interview sessions across any supported exam. Your quota only decrements when an interview is completely finished and evaluated.'
    },
    {
      q: 'Can I practice in regional Indian languages?',
      a: 'Yes! Pro and Free plans support 11 regional languages plus English and conversational Hinglish. The AI panel responds naturally in your selected medium.'
    },
    {
      q: 'Do I need special hardware or external webcams?',
      a: 'No, any standard laptop or smartphone camera and microphone works seamlessly. If camera permission is not granted, you can practice via audio or keyboard mode.'
    },
    {
      q: 'Can I cancel my Pro subscription at any time?',
      a: 'Yes, subscriptions can be managed or paused at any point with 1-click inside your profile settings.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>TRANSPARENT PRICING FOR ASPIRANTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight">
            Invest in Your Confidence
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Start completely free. Upgrade when you need unlimited boards and comprehensive body-language analytics.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="bg-[#111726]/40 border border-white/10 rounded-3xl p-6 sm:p-8">
          <PricingSection />
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-sans text-center mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#111726] border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-sm text-white mb-2">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
