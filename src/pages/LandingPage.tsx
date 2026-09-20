/**
 * DARPANPREP LANDING PAGE
 * High-conversion homepage integrating Hero, 3D Laptop, Trust Strip, Exam Grid,
 * Feature Split, How It Works, and Pricing.
 */

import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustStrip } from '../components/landing/TrustStrip';
import { ExamGrid } from '../components/landing/ExamGrid';
import { FeatureSplit } from '../components/landing/FeatureSplit';
import { HowItWorks } from '../components/landing/HowItWorks';
import { PricingSection } from '../components/landing/PricingSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <HeroSection />
      <div className="bg-[#F9FAF7] text-slate-900 pt-4 pb-12">
        <TrustStrip />
        <ExamGrid />
        <FeatureSplit />
        <HowItWorks />
        <PricingSection />
      </div>
    </div>
  );
};
