/**
 * DARPANPREP CORE INTERVIEW TYPES
 * Strongly typed domain models for sessions, questions, feedback and assessment.
 */

export type InterviewGoal = 'government' | 'placement' | 'job' | 'communication';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'board_level';

export type InterviewLength = 5 | 10 | 15;

export type InterviewerId = 'dr_mehta' | 'ms_ananya' | 'prof_rao';

export interface Interviewer {
  id: InterviewerId;
  name: string;
  role: string;
  persona: string;
  gender: 'male' | 'female';
  style: 'governance' | 'diplomatic' | 'economic';
  voicePitch: number;
  voiceRate: number;
  avatarUrl: string;
}

export interface InterviewQuestion {
  id: string;
  examId: string;
  category: string;
  difficulty: DifficultyLevel;
  language: string;
  text: string;
  interviewerId: InterviewerId;
  followUpTopics?: string[];
  keywords?: string[];
  expectedSkills?: string[];
  isFollowUp?: boolean;
  parentQuestionId?: string;
}

export interface InterviewAnswer {
  questionId: string;
  text: string;
  durationSeconds: number;
  fillerWordsCount: number;
  speechPaceWPM: number;
  confidenceScore: number;
  clarityScore: number;
  timestamp: number;
}

export interface InterviewScore {
  communication: number;
  confidence: number;
  contentKnowledge: number;
  structure: number;
  listening: number;
  bodyLanguage: number;
  overall: number;
}

export interface DarpanMoment {
  candidateClaim: string;
  boardChallenge: string;
  improvementTip: string;
  questionTopic: string;
}

export interface InterviewReport {
  id: string;
  sessionId: string;
  examId: string;
  examName: string;
  completedAt: number;
  scores: InterviewScore;
  verdict: 'Excellent' | 'Strong' | 'Developing' | 'Needs Practice' | 'Build Fundamentals';
  strengths: string[];
  improvements: string[];
  darpanMoment: DarpanMoment;
  recommendedPractice: string;
  durationSeconds: number;
  totalQuestions: number;
  answers: InterviewAnswer[];
}

export interface InterviewSession {
  id: string;
  goal: InterviewGoal;
  examId: string;
  examName: string;
  language: string;
  difficulty: DifficultyLevel;
  length: InterviewLength;
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  startedAt: number;
  completedAt?: number;
  report?: InterviewReport;
}

export interface ExamConfig {
  id: string;
  name: string;
  category: 'government' | 'placement' | 'communication';
  description: string;
  languages: string[];
  interviewTypes: string[];
  questionCategories: string[];
  difficultyLevels: DifficultyLevel[];
  popular?: boolean;
  state?: string;
}

export interface PracticeSignals {
  eyeContact: number; // 0 - 100%
  postureStability: number; // 0 - 100%
  headMovement: 'Steady' | 'Moderate' | 'Fidgety';
  cameraEngagement: number; // 0 - 100%
  confidence: number; // 0 - 100%
}
