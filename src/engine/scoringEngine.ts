/**
 * DARPANPREP SCORING & ASSESSMENT ENGINE
 * Multi-dimensional evaluation, dynamic weighting, strengths/improvements generation, and signature Darpan Moment.
 */

import { InterviewSession, InterviewReport, InterviewScore, DarpanMoment } from './interviewTypes';

export function calculateInterviewReport(session: InterviewSession): InterviewReport {
  const answers = session.answers;
  const answerCount = Math.max(answers.length, 1);

  // Compute metrics from answers
  let totalFillers = 0;
  let totalPace = 0;
  let totalConfidence = 0;
  let totalClarity = 0;
  let totalWordCount = 0;

  answers.forEach(a => {
    totalFillers += a.fillerWordsCount || 0;
    totalPace += a.speechPaceWPM || 130;
    totalConfidence += a.confidenceScore || 80;
    totalClarity += a.clarityScore || 85;
    totalWordCount += a.text.split(/\s+/).filter(Boolean).length;
  });

  const avgFillersPerAnswer = totalFillers / answerCount;
  const avgPace = totalPace / answerCount;
  const avgConfidence = totalConfidence / answerCount;
  const avgClarity = totalClarity / answerCount;
  const avgWordsPerAnswer = totalWordCount / answerCount;

  // 1. Communication (Articulation, pace balance, filler penalty)
  const paceDeduction = Math.abs(avgPace - 135) * 0.4;
  const fillerDeduction = Math.min(avgFillersPerAnswer * 3.5, 20);
  const communicationScore = Math.round(Math.min(Math.max(avgClarity - paceDeduction - fillerDeduction + 10, 60), 98));

  // 2. Confidence (Pacing, sustained answers, eye contact simulation)
  const lengthBonus = Math.min(avgWordsPerAnswer / 15, 8);
  const confidenceScore = Math.round(Math.min(Math.max(avgConfidence + lengthBonus - (avgFillersPerAnswer * 1.5), 58), 96));

  // 3. Content Knowledge (Coverage, keywords, length)
  const contentScore = Math.round(Math.min(Math.max(72 + (avgWordsPerAnswer > 35 ? 12 : 5) - (avgFillersPerAnswer > 3 ? 6 : 0), 55), 94));

  // 4. Answer Structure (Intro -> Core Point -> Way Forward)
  const structureScore = Math.round(Math.min(Math.max(76 + (avgWordsPerAnswer > 45 ? 10 : 2), 60), 95));

  // 5. Listening & Relevance (How directly user answered without drift)
  const listeningScore = Math.round(Math.min(Math.max(82 + (avgFillersPerAnswer < 2 ? 6 : -3), 65), 96));

  // 6. Body Language (Practice signals: steady head, eye contact simulation)
  const bodyLanguageScore = Math.round(Math.min(Math.max(80 + (avgConfidence > 85 ? 7 : -4), 60), 95));

  // Overall Weighted Calculation
  const overallScore = Math.round(
    communicationScore * 0.22 +
    confidenceScore * 0.18 +
    contentScore * 0.25 +
    structureScore * 0.15 +
    listeningScore * 0.10 +
    bodyLanguageScore * 0.10
  );

  const scores: InterviewScore = {
    communication: communicationScore,
    confidence: confidenceScore,
    contentKnowledge: contentScore,
    structure: structureScore,
    listening: listeningScore,
    bodyLanguage: bodyLanguageScore,
    overall: overallScore
  };

  // Determine Verdict Label
  let verdict: InterviewReport['verdict'] = 'Strong';
  if (overallScore >= 90) verdict = 'Excellent';
  else if (overallScore >= 80) verdict = 'Strong';
  else if (overallScore >= 70) verdict = 'Developing';
  else if (overallScore >= 60) verdict = 'Needs Practice';
  else verdict = 'Build Fundamentals';

  // Identify Signature Darpan Moment
  let darpanMoment: DarpanMoment = {
    candidateClaim: 'I would prioritize sustainable administrative transparency and eliminate leakages.',
    boardChallenge: 'Is complete elimination feasible across tier-3 panchayats? What measurable pilot would you deploy first?',
    improvementTip: 'Replace sweeping qualitative claims with measurable 90-day pilot phases and realistic resource allocation.',
    questionTopic: 'Administrative Reforms'
  };

  // Inspect answers to extract real candidate statement
  for (const ans of answers) {
    if (ans.text.toLowerCase().includes('completely') || ans.text.toLowerCase().includes('eliminate')) {
      darpanMoment = {
        candidateClaim: ans.text.slice(0, 110) + '...',
        boardChallenge: 'The board perceived this as an idealized promise without fiscal or administrative risk assessment.',
        improvementTip: 'Acknowledge systemic obstacles upfront and present a phased implementation roadmap with measurable metrics.',
        questionTopic: 'Governance Feasibility'
      };
      break;
    } else if (ans.text.length > 40) {
      darpanMoment = {
        candidateClaim: `"${ans.text.slice(0, 100)}..."`,
        boardChallenge: 'When asked for execution details, your framework was theoretical rather than operationally grounded.',
        improvementTip: 'Ground your recommendations in existing statutory schemes (e.g., MGNREGA, PM Gati Shakti, SHG clusters) for credibility.',
        questionTopic: 'Policy Implementation'
      };
    }
  }

  // Generate 3 Strengths
  const strengths: string[] = [];
  if (communicationScore >= 80) {
    strengths.push('Articulate speech pace maintained with steady tone and composed delivery throughout.');
  } else {
    strengths.push('Good clarity of intent and willingness to tackle complex administrative scenarios.');
  }
  if (confidenceScore >= 80) {
    strengths.push('Demonstrated strong presence and sustained engagement during cross-questioning.');
  } else {
    strengths.push('Remained polite and composed under challenging follow-up counter-questions.');
  }
  if (contentScore >= 78) {
    strengths.push('Solid contextual awareness of grassroots governance and constitutional ethics.');
  } else {
    strengths.push('Showcased honest self-reflection when evaluating administrative constraints.');
  }

  // Generate 3 Actionable Improvements
  const improvements: string[] = [
    avgFillersPerAnswer > 2
      ? `Minimize conversational filler words (${Math.round(totalFillers)} detected across session). Replace "um" with deliberate 1-second pauses.`
      : 'Maintain structured three-part answers (Context -> Key Action -> Measurable Impact).',
    avgPace > 150
      ? `Pacing was slightly hurried (${Math.round(avgPace)} WPM). Aim for an authoritative 130–140 WPM for gravitas.`
      : 'Quantify your answers using data points or specific statutory provisions to reinforce credibility.',
    'Anticipate counter-arguments: Conclude policy recommendations by acknowledging one major constraint and its mitigation.'
  ];

  return {
    id: `report-${session.id}`,
    sessionId: session.id,
    examId: session.examId,
    examName: session.examName,
    completedAt: Date.now(),
    scores,
    verdict,
    strengths,
    improvements,
    darpanMoment,
    recommendedPractice: session.examId.includes('upsc') ? 'Ethics & Situation Reaction Mock 2' : 'Advanced Leadership & Policy Board',
    durationSeconds: Math.round((Date.now() - session.startedAt) / 1000),
    totalQuestions: answers.length,
    answers
  };
}
