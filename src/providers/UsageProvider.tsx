/**
 * DARPANPREP FREE PLAN USAGE ENGINE
 * Manages free interview allowances (starts at 5), guarantees safe consumption on completion only,
 * and triggers upgrade modals when exhausted.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const USAGE_KEY = 'darpanprep_free_usage';
const MAX_FREE_INTERVIEWS = 5;

interface UsageContextType {
  remainingInterviews: number;
  totalAllowed: number;
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  canStartInterview: () => boolean;
  consumeInterview: () => boolean; // Only called upon successful completion
  resetUsageForDemo: () => void;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export const UsageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [remaining, setRemaining] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(USAGE_KEY);
      if (stored !== null) {
        return parseInt(stored, 10);
      }
      localStorage.setItem(USAGE_KEY, MAX_FREE_INTERVIEWS.toString());
      return MAX_FREE_INTERVIEWS;
    } catch {
      return MAX_FREE_INTERVIEWS;
    }
  });

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(USAGE_KEY, remaining.toString());
    } catch (e) {}
  }, [remaining]);

  const canStartInterview = (): boolean => {
    if (remaining > 0) {
      return true;
    }
    setIsUpgradeModalOpen(true);
    return false;
  };

  const consumeInterview = (): boolean => {
    if (remaining > 0) {
      setRemaining(prev => Math.max(prev - 1, 0));
      return true;
    }
    setIsUpgradeModalOpen(true);
    return false;
  };

  const resetUsageForDemo = () => {
    setRemaining(MAX_FREE_INTERVIEWS);
  };

  return (
    <UsageContext.Provider
      value={{
        remainingInterviews: remaining,
        totalAllowed: MAX_FREE_INTERVIEWS,
        isUpgradeModalOpen,
        openUpgradeModal: () => setIsUpgradeModalOpen(true),
        closeUpgradeModal: () => setIsUpgradeModalOpen(false),
        canStartInterview,
        consumeInterview,
        resetUsageForDemo
      }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) throw new Error('useUsage must be used within a UsageProvider');
  return context;
};
