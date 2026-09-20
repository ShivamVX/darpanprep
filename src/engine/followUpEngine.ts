/**
 * DARPANPREP FOLLOW-UP ENGINE
 * Dynamic answer analysis, claim challenging, exaggeration detection, and conversational counter-questions.
 */

import { InterviewQuestion, InterviewAnswer, InterviewerId } from './interviewTypes';

export interface FollowUpAnalysisResult {
  hasFollowUp: boolean;
  followUpQuestion?: InterviewQuestion;
  detectedClaim?: string;
  detectedTopic?: string;
  isExaggerated?: boolean;
  reason?: string;
}

const EXAGGERATION_PATTERNS = [
  /\bcompletely eliminate\b/i,
  /\b100%\b/i,
  /\bzero tolerance without exception\b/i,
  /\bguarantee success\b/i,
  /\bevery single person\b/i,
  /\bno possibility of failure\b/i,
  /\balways\b/i,
  /\bnever fail\b/i
];

const TOPIC_FOLLOW_UPS: Record<string, { prompt: string; interviewer: InterviewerId }> = {
  'rural development': {
    prompt: 'You emphasized rural development. What specific intervention would you prioritize in the first 90 days, and how would you measure whether it genuinely moved the needle for marginal farmers?',
    interviewer: 'prof_rao'
  },
  'corruption': {
    prompt: 'Eliminating institutional leakage is easier said than done. When discretionary power is entrenched, what concrete digital or structural transparency mechanisms will you deploy without paralyzing quick decision-making?',
    interviewer: 'dr_mehta'
  },
  'education': {
    prompt: 'Improving gross enrollment is only half the battle; foundational learning outcomes remain a challenge. How would you incentivize teachers and tackle absenteeism at the block level?',
    interviewer: 'ms_ananya'
  },
  'technology': {
    prompt: 'Technology often encounters a digital divide in remote areas. What is your contingency plan when cloud platforms fail or local citizens lack smartphone connectivity?',
    interviewer: 'prof_rao'
  },
  'women empowerment': {
    prompt: 'Beyond credit subsidies for Self Help Groups, what structural legal and market linkage support will you create to ensure women-led enterprises become financially self-sustaining?',
    interviewer: 'ms_ananya'
  },
  'climate': {
    prompt: 'Local economic livelihoods frequently clash with environmental conservation mandates. How do you resolve this tradeoff when local communities resist regulatory restrictions?',
    interviewer: 'prof_rao'
  }
};

export function analyzeAnswerAndGenerateFollowUp(
  parentQuestion: InterviewQuestion,
  answer: InterviewAnswer,
  history: InterviewAnswer[] = []
): FollowUpAnalysisResult {
  const answerLower = answer.text.toLowerCase();
  const wordCount = answer.text.trim().split(/\s+/).filter(Boolean).length;

  // 1. Check for Exaggerated Absolute Claims (Signature Darpan Moment candidate)
  for (const pattern of EXAGGERATION_PATTERNS) {
    const match = answer.text.match(pattern);
    if (match) {
      const claim = match[0];
      const nextInterviewer: InterviewerId = parentQuestion.interviewerId === 'dr_mehta' ? 'prof_rao' : 'dr_mehta';
      
      return {
        hasFollowUp: true,
        detectedClaim: claim,
        isExaggerated: true,
        reason: 'Absolute claim detected — reality check required.',
        followUpQuestion: {
          id: `followup-exaggeration-${Date.now()}`,
          examId: parentQuestion.examId,
          category: 'Reality Check & Feasibility',
          difficulty: 'board_level',
          language: parentQuestion.language,
          text: `You stated that you would "${claim}". In public administration, absolute promises often collide with fiscal constraints, judicial scrutiny, and local realities. What realistic, measurable milestone would you actually hold yourself accountable to in year one?`,
          interviewerId: nextInterviewer,
          isFollowUp: true,
          parentQuestionId: parentQuestion.id
        }
      };
    }
  }

  // 2. Check for Specific High-Value Topics mentioned in answer
  for (const [topicKey, topicConfig] of Object.entries(TOPIC_FOLLOW_UPS)) {
    if (answerLower.includes(topicKey) || (parentQuestion.followUpTopics && parentQuestion.followUpTopics.includes(topicKey))) {
      // Don't repeat if already probed on this topic
      const alreadyProbed = history.some(h => h.text.toLowerCase().includes(topicKey));
      if (!alreadyProbed) {
        // Rotate speaker to give panel dynamics
        let nextInterviewer = topicConfig.interviewer;
        if (nextInterviewer === parentQuestion.interviewerId) {
          nextInterviewer = 'ms_ananya';
        }

        return {
          hasFollowUp: true,
          detectedTopic: topicKey,
          reason: `Candidate specifically introduced ${topicKey} — deep dive required.`,
          followUpQuestion: {
            id: `followup-topic-${Date.now()}`,
            examId: parentQuestion.examId,
            category: 'Deep Dive Probing',
            difficulty: 'advanced',
            language: parentQuestion.language,
            text: topicConfig.prompt,
            interviewerId: nextInterviewer,
            isFollowUp: true,
            parentQuestionId: parentQuestion.id
          }
        };
      }
    }
  }

  // 3. Check for Brief / Evasive Answer
  if (wordCount < 15 && wordCount > 0) {
    return {
      hasFollowUp: true,
      reason: 'Answer is too brief for an interview board evaluation.',
      followUpQuestion: {
        id: `followup-brief-${Date.now()}`,
        examId: parentQuestion.examId,
        category: 'Elaboration & Depth',
        difficulty: 'intermediate',
        language: parentQuestion.language,
        text: 'Could you elaborate on the underlying mechanism behind your thought process? Give us one concrete instance to substantiate your view.',
        interviewerId: parentQuestion.interviewerId === 'dr_mehta' ? 'ms_ananya' : 'dr_mehta',
        isFollowUp: true,
        parentQuestionId: parentQuestion.id
      }
    };
  }

  return {
    hasFollowUp: false,
    reason: 'Answer sufficiently addressed the prompt without overstepping bounds.'
  };
}

export function getNextPanelSpeaker(
  currentSpeakerId: InterviewerId,
  isFollowUp: boolean = false
): InterviewerId {
  if (isFollowUp) {
    // Cross-questioning rotation
    if (currentSpeakerId === 'dr_mehta') return 'prof_rao';
    if (currentSpeakerId === 'prof_rao') return 'ms_ananya';
    return 'dr_mehta';
  }

  // Regular rotation: Dr. Mehta -> Ms. Ananya -> Prof. Rao -> Ms. Ananya -> Dr. Mehta
  switch (currentSpeakerId) {
    case 'dr_mehta':
      return 'ms_ananya';
    case 'ms_ananya':
      return 'prof_rao';
    case 'prof_rao':
      return 'ms_ananya';
    default:
      return 'dr_mehta';
  }
}
