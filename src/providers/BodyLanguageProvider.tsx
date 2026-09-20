/**
 * DARPANPREP BODY LANGUAGE & PRACTICE SIGNALS PROVIDER
 * Supplies simulated AI Practice Signals with clean architecture ready for real MediaPipe computer vision.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PracticeSignals } from '../engine/interviewTypes';

interface BodyLanguageContextType {
  signals: PracticeSignals;
  isTrackingActive: boolean;
  startTracking: () => void;
  stopTracking: () => void;
}

const BodyLanguageContext = createContext<BodyLanguageContextType | undefined>(undefined);

export const BodyLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTrackingActive, setIsTrackingActive] = useState(false);
  const [signals, setSignals] = useState<PracticeSignals>({
    eyeContact: 92,
    postureStability: 88,
    headMovement: 'Steady',
    cameraEngagement: 94,
    confidence: 86
  });

  useEffect(() => {
    if (!isTrackingActive) return;

    // Simulate subtle natural biometric fluctuations
    const interval = setInterval(() => {
      setSignals(prev => ({
        eyeContact: Math.min(Math.max(prev.eyeContact + (Math.floor(Math.random() * 5) - 2), 85), 98),
        postureStability: Math.min(Math.max(prev.postureStability + (Math.floor(Math.random() * 5) - 2), 80), 96),
        headMovement: Math.random() > 0.85 ? 'Moderate' : 'Steady',
        cameraEngagement: Math.min(Math.max(prev.cameraEngagement + (Math.floor(Math.random() * 3) - 1), 88), 99),
        confidence: Math.min(Math.max(prev.confidence + (Math.floor(Math.random() * 5) - 2), 78), 94)
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, [isTrackingActive]);

  return (
    <BodyLanguageContext.Provider
      value={{
        signals,
        isTrackingActive,
        startTracking: () => setIsTrackingActive(true),
        stopTracking: () => setIsTrackingActive(false)
      }}
    >
      {children}
    </BodyLanguageContext.Provider>
  );
};

export const useBodyLanguage = () => {
  const context = useContext(BodyLanguageContext);
  if (!context) throw new Error('useBodyLanguage must be used within a BodyLanguageProvider');
  return context;
};
