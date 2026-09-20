/**
 * DARPANPREP INTERVIEW ROOM
 * Immersive full-screen AI mock interview simulation with dynamic panel rotation,
 * real-time voice speech synthesis, telemetry feedback, and follow-up engines.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Clock } from 'lucide-react';
import { InterviewSession, InterviewAnswer, InterviewerId } from '../engine/interviewTypes';
import { InterviewMemory } from '../engine/interviewMemory';
import { VoiceEngine, VoiceState } from '../engine/VoiceEngine';
import { defaultAIProvider } from '../providers/AIProvider';
import { useUsage } from '../providers/UsageProvider';
import { useBodyLanguage } from '../providers/BodyLanguageProvider';
import { PanelStreams } from '../components/interview/PanelStreams';
import { CandidateFeed } from '../components/interview/CandidateFeed';
import { LiveAnalyticsWidget } from '../components/interview/LiveAnalyticsWidget';
import { SpeechActionDock } from '../components/interview/SpeechActionDock';
import { getNextPanelSpeaker } from '../engine/followUpEngine';
import { calculateInterviewReport } from '../engine/scoringEngine';

export const InterviewRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { consumeInterview } = useUsage();
  const { startTracking, stopTracking } = useBodyLanguage();

  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [activeSpeakerId, setActiveSpeakerId] = useState<InterviewerId>('dr_mehta');
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isMicMuted, setIsMicMuted] = useState(false);

  // Live real-time telemetry metrics
  const [confidenceScore, setConfidenceScore] = useState(86);
  const [speechPaceWPM, setSpeechPaceWPM] = useState(132);
  const [fillerWordsCount, setFillerWordsCount] = useState(1);
  const [voiceClarityScore, setVoiceClarityScore] = useState(88);

  const voiceEngineRef = useRef<VoiceEngine | null>(null);
  const timerRef = useRef<any>(null);

  // Load active session from memory
  useEffect(() => {
    let active = InterviewMemory.getActiveSession();
    if (!active) {
      // Seed default session if user navigated directly
      active = {
        id: `session-${Date.now()}`,
        goal: 'government',
        examId: 'upsc-cse',
        examName: 'UPSC Civil Services (CSE)',
        language: 'English',
        difficulty: 'board_level',
        length: 5,
        currentQuestionIndex: 0,
        questions: [
          {
            id: 'default-q1',
            examId: 'upsc-cse',
            category: 'Governance & Administration',
            difficulty: 'board_level',
            language: 'English',
            text: 'Welcome Akash. You mentioned rural development in your answer. How would you implement this at the ground level?',
            interviewerId: 'dr_mehta'
          },
          {
            id: 'default-q2',
            examId: 'upsc-cse',
            category: 'Diplomacy & Current Affairs',
            difficulty: 'board_level',
            language: 'English',
            text: 'Given the shifting multipolar world order and India’s voice for the Global South, how should our strategic diplomacy balance energy security partnerships with renewable commitments?',
            interviewerId: 'ms_ananya'
          },
          {
            id: 'default-q3',
            examId: 'upsc-cse',
            category: 'Ethics & Integrity',
            difficulty: 'board_level',
            language: 'English',
            text: 'Integrity is tested under duress. Can you give an example where you chose principle over convenience?',
            interviewerId: 'prof_rao'
          }
        ],
        answers: [],
        startedAt: Date.now()
      };
      InterviewMemory.saveActiveSession(active);
    }

    setSession(active);
    setCurrentQIndex(active.currentQuestionIndex || 0);
    const initialSpeaker = active.questions[active.currentQuestionIndex || 0]?.interviewerId || 'dr_mehta';
    setActiveSpeakerId(initialSpeaker);

    startTracking();

    // Session Timer
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopTracking();
      if (voiceEngineRef.current) {
        voiceEngineRef.current.stop();
      }
    };
  }, []);

  // Initialize Voice Engine
  useEffect(() => {
    if (!session) return;

    voiceEngineRef.current = new VoiceEngine({
      language: session.language,
      onStateChange: (newState) => setVoiceState(newState),
      onTranscriptUpdate: (text) => setTranscript(text),
      onError: (errMsg) => console.log('Voice engine notice:', errMsg)
    });

    // Speak initial question on entry
    const q = session.questions[currentQIndex];
    if (q) {
      voiceEngineRef.current.speak(q.text, 0.95, 0.95);
    }
  }, [session?.id]);

  const currentQuestion = session?.questions[currentQIndex] || {
    id: 'loading',
    examId: 'upsc-cse',
    category: 'Interview Board',
    difficulty: 'board_level' as const,
    language: 'English',
    text: 'Loading your interview questions...',
    interviewerId: 'dr_mehta' as const
  };

  const handleReplayAudio = () => {
    if (voiceEngineRef.current && currentQuestion) {
      voiceEngineRef.current.speak(currentQuestion.text, 0.95, 0.95);
    }
  };

  const handleStartListening = () => {
    if (voiceEngineRef.current) {
      voiceEngineRef.current.startListening();
    }
  };

  const handleStopListening = () => {
    if (voiceEngineRef.current) {
      voiceEngineRef.current.stopListening();
    }
  };

  // Submit Answer & Evaluate Follow-ups
  const handleSubmitAnswer = async (answerText: string) => {
    if (!session) return;

    setIsProcessing(true);
    if (voiceEngineRef.current) {
      voiceEngineRef.current.stop();
    }

    // Detect filler words
    const fillerRegex = /\b(um|uh|like|basically|actually|you know)\b/gi;
    const fillers = (answerText.match(fillerRegex) || []).length;
    const wordCount = answerText.split(/\s+/).filter(Boolean).length;
    const pace = Math.min(Math.max(Math.round((wordCount / 18) * 60) || 130, 100), 165);

    const answerRecord: InterviewAnswer = {
      questionId: currentQuestion.id,
      text: answerText,
      durationSeconds: 24,
      fillerWordsCount: fillers,
      speechPaceWPM: pace,
      confidenceScore: Math.floor(82 + Math.random() * 12),
      clarityScore: Math.floor(84 + Math.random() * 10),
      timestamp: Date.now()
    };

    // Update real-time telemetry
    setFillerWordsCount(prev => prev + fillers);
    setSpeechPaceWPM(pace);
    setConfidenceScore(answerRecord.confidenceScore);
    setVoiceClarityScore(answerRecord.clarityScore);

    const updatedAnswers = [...session.answers, answerRecord];

    // Check if follow-up engine triggers a counter-question
    const followUpAnalysis = await defaultAIProvider.analyzeAnswerAndFollowUp(
      currentQuestion,
      answerRecord,
      updatedAnswers
    );

    let updatedQuestions = [...session.questions];
    let nextIndex = currentQIndex + 1;

    if (followUpAnalysis.hasFollowUp && followUpAnalysis.followUpQuestion) {
      // Splice follow-up question right after current question
      updatedQuestions.splice(nextIndex, 0, followUpAnalysis.followUpQuestion);
    }

    const updatedSession: InterviewSession = {
      ...session,
      questions: updatedQuestions,
      answers: updatedAnswers,
      currentQuestionIndex: nextIndex
    };

    setSession(updatedSession);
    InterviewMemory.saveActiveSession(updatedSession);

    setTimeout(() => {
      setIsProcessing(false);
      setTranscript('');

      // Check if session reached target length
      if (nextIndex >= updatedQuestions.length || updatedAnswers.length >= session.length) {
        handleFinishInterview(updatedSession);
      } else {
        setCurrentQIndex(nextIndex);
        const nextQ = updatedQuestions[nextIndex];
        const nextSpeaker = nextQ.interviewerId || getNextPanelSpeaker(activeSpeakerId, nextQ.isFollowUp);
        setActiveSpeakerId(nextSpeaker);

        if (voiceEngineRef.current) {
          voiceEngineRef.current.speak(nextQ.text, 0.95, 0.95);
        }
      }
    }, 1200);
  };

  const handleFinishInterview = (finalSession: InterviewSession) => {
    // Generate final assessment report
    const report = calculateInterviewReport(finalSession);
    
    // Decrement free interview allowance
    consumeInterview();

    // Persist completed report
    InterviewMemory.saveCompletedInterview(report);

    navigate('/interview/report');
  };

  const handleExitEarly = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be saved in history.')) {
      if (session && session.answers.length > 0) {
        handleFinishInterview(session);
      } else {
        InterviewMemory.clearActiveSession();
        navigate('/dashboard');
      }
    }
  };

  // Format Timer M:SS
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white flex flex-col justify-between overflow-hidden">
      
      {/* Top Header Bar */}
      <header className="h-14 bg-[#111726]/90 backdrop-blur-md border-b border-white/15 px-4 sm:px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="font-bold text-xs sm:text-sm text-slate-200 uppercase tracking-wider">
            {session?.examName || 'Board Interview'}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">&bull; Board Panel 4</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono font-bold text-amber-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <span className="text-xs font-semibold text-slate-300">
            Question {Math.min(currentQIndex + 1, session?.length || 5)} of {session?.length || 5}
          </span>

          <button
            onClick={handleExitEarly}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Exit Interview Room"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area: Panel on top, Candidate & Live Telemetry bottom */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
        
        {/* Panel Video Streams + Live Subtitle */}
        <PanelStreams
          currentQuestion={currentQuestion}
          activeSpeakerId={activeSpeakerId}
          isSpeaking={voiceState === 'speaking'}
          onReplayAudio={handleReplayAudio}
        />

        {/* Candidate Feed & Analytics Grid */}
        <div className="grid sm:grid-cols-12 gap-4 items-stretch">
          <div className="sm:col-span-7 lg:col-span-8">
            <CandidateFeed
              isMicMuted={isMicMuted}
              onToggleMic={() => setIsMicMuted(!isMicMuted)}
              eyeContactScore={confidenceScore}
            />
          </div>

          <div className="sm:col-span-5 lg:col-span-4">
            <LiveAnalyticsWidget
              confidenceScore={confidenceScore}
              speechPaceWPM={speechPaceWPM}
              fillerWordsCount={fillerWordsCount}
              voiceClarityScore={voiceClarityScore}
            />
          </div>
        </div>
      </main>

      {/* Bottom Action Dock (Microphone / Keyboard Input) */}
      <footer className="z-30">
        <SpeechActionDock
          voiceState={voiceState}
          transcript={transcript}
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
          onSubmitAnswer={handleSubmitAnswer}
          onFinishEarly={() => session && handleFinishInterview(session)}
          isProcessing={isProcessing}
        />
      </footer>
    </div>
  );
};
