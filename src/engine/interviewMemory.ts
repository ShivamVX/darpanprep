/**
 * DARPANPREP INTERVIEW MEMORY
 * Local storage abstraction for active interview sessions, historical reports, and student stats.
 */

import { InterviewSession, InterviewReport } from './interviewTypes';

const ACTIVE_SESSION_KEY = 'darpanprep_active_session';
const HISTORY_KEY = 'darpanprep_interview_history';

export const InterviewMemory = {
  saveActiveSession(session: InterviewSession) {
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Unable to persist active interview session', e);
    }
  },

  getActiveSession(): InterviewSession | null {
    try {
      const data = localStorage.getItem(ACTIVE_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  clearActiveSession() {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (e) {}
  },

  saveCompletedInterview(report: InterviewReport) {
    try {
      const history = this.getInterviewHistory();
      // Prepend the new report
      const updated = [report, ...history.filter(h => h.id !== report.id)];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      this.clearActiveSession();
    } catch (e) {
      console.warn('Unable to save interview history', e);
    }
  },

  getInterviewHistory(): InterviewReport[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      if (!data) {
        // Return realistic default seed history for demonstration
        return [
          {
            id: 'report-seed-1',
            sessionId: 'session-seed-1',
            examId: 'upsc-cse',
            examName: 'UPSC Civil Services (CSE)',
            completedAt: Date.now() - 86400000 * 2, // 2 days ago
            scores: {
              communication: 86,
              confidence: 82,
              contentKnowledge: 78,
              structure: 84,
              listening: 89,
              bodyLanguage: 80,
              overall: 83
            },
            verdict: 'Strong',
            strengths: [
              'Clear articulation and controlled pace under probing questions.',
              'Grounded understanding of Panchayati Raj statutory framework.',
              'Strong moral posture when evaluated on public interest dilemmas.'
            ],
            improvements: [
              'Cut down conversational filler words ("basically", "you know").',
              'Formulate policy answers in concrete, phased timelines.',
              'Acknowledge resource constraints before proposing major welfare interventions.'
            ],
            darpanMoment: {
              candidateClaim: 'I will eliminate corrupt middle-men in public distribution completely.',
              boardChallenge: 'Complete elimination is an unrealistic claim. What digital audit steps would you deploy?',
              improvementTip: 'Highlight biometric Aadhaar-enabled authentication and real-time grain tracking.',
              questionTopic: 'Administrative Reforms'
            },
            recommendedPractice: 'UPSC Situation Reaction & Ethics Board',
            durationSeconds: 420,
            totalQuestions: 5,
            answers: []
          },
          {
            id: 'report-seed-2',
            sessionId: 'session-seed-2',
            examId: 'bpsc',
            examName: 'BPSC (Bihar Public Service)',
            completedAt: Date.now() - 86400000 * 4, // 4 days ago
            scores: {
              communication: 79,
              confidence: 76,
              contentKnowledge: 82,
              structure: 78,
              listening: 80,
              bodyLanguage: 75,
              overall: 78
            },
            verdict: 'Developing',
            strengths: [
              'Thorough command over Bihar regional economy and agricultural clusters.',
              'Courteous addressing of board members.'
            ],
            improvements: [
              'Maintain steady eye-contact with entire panel, not just the speaker.',
              'Avoid overly technical jargon when answering general administrative questions.'
            ],
            darpanMoment: {
              candidateClaim: 'Flood mitigation can be solved within two fiscal years.',
              boardChallenge: 'Inter-state river treaty constraints make this impractical in two years.',
              improvementTip: 'Propose pre-monsoon embankment reinforcement rather than total river diversion.',
              questionTopic: 'Disaster Management'
            },
            recommendedPractice: 'Regional Governance Viva Mock',
            durationSeconds: 360,
            totalQuestions: 4,
            answers: []
          }
        ];
      }
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  getStats() {
    const history = this.getInterviewHistory();
    const count = history.length;
    const avgScore = count > 0 ? Math.round(history.reduce((acc, h) => acc + h.scores.overall, 0) / count) : 0;
    const bestScore = count > 0 ? Math.max(...history.map(h => h.scores.overall)) : 0;
    const totalMinutes = Math.round(history.reduce((acc, h) => acc + (h.durationSeconds || 300), 0) / 60);

    return {
      totalInterviews: count,
      avgScore,
      bestScore,
      totalHours: (totalMinutes / 60).toFixed(1),
      streakDays: 7
    };
  }
};
