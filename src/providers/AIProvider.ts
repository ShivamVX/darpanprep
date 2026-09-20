/**
 * DARPANPREP AI PROVIDER ABSTRACTION
 * Interface allowing Mock AI, OpenAI, Gemini, or custom LLM backends to be plugged in seamlessly.
 */

import { InterviewQuestion, InterviewAnswer, InterviewReport, InterviewSession, DifficultyLevel } from '../engine/interviewTypes';
import { generateQuestionsForSession } from '../engine/questionGenerator';
import { analyzeAnswerAndGenerateFollowUp, FollowUpAnalysisResult } from '../engine/followUpEngine';
import { calculateInterviewReport } from '../engine/scoringEngine';

export interface AIProvider {
  generateQuestions(examId: string, language: string, difficulty: DifficultyLevel, count: number): Promise<InterviewQuestion[]>;
  analyzeAnswerAndFollowUp(parentQuestion: InterviewQuestion, answer: InterviewAnswer, history: InterviewAnswer[]): Promise<FollowUpAnalysisResult>;
  generateReport(session: InterviewSession): Promise<InterviewReport>;
}

export class MockAIProvider implements AIProvider {
  async generateQuestions(
    examId: string,
    language: string,
    difficulty: DifficultyLevel,
    count: number
  ): Promise<InterviewQuestion[]> {
    return generateQuestionsForSession(examId, language, difficulty, count);
  }

  async analyzeAnswerAndFollowUp(
    parentQuestion: InterviewQuestion,
    answer: InterviewAnswer,
    history: InterviewAnswer[]
  ): Promise<FollowUpAnalysisResult> {
    return analyzeAnswerAndGenerateFollowUp(parentQuestion, answer, history);
  }

  async generateReport(session: InterviewSession): Promise<InterviewReport> {
    return calculateInterviewReport(session);
  }
}

// Export default singleton instance
export const defaultAIProvider: AIProvider = new MockAIProvider();
