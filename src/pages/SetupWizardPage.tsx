/**
 * DARPANPREP INTERVIEW SETUP WIZARD
 * 6-step guided wizard: Goal -> Exam -> Language -> Difficulty -> Length -> Camera/Mic Check.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Briefcase,
  MessageSquare,
  Search,
  CheckCircle2,
  Mic,
  Camera,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award
} from 'lucide-react';
import { EXAMS_DATABASE, INDIAN_LANGUAGES } from '../data/exams';
import { InterviewGoal, DifficultyLevel, InterviewLength, InterviewSession } from '../engine/interviewTypes';
import { defaultAIProvider } from '../providers/AIProvider';
import { InterviewMemory } from '../engine/interviewMemory';
import { useUsage } from '../providers/UsageProvider';

export const SetupWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const { canStartInterview } = useUsage();

  const [currentStep, setCurrentStep] = useState(1);

  // Configuration State
  const [goal, setGoal] = useState<InterviewGoal>('government');
  const [selectedExamId, setSelectedExamId] = useState('upsc-cse');
  const [examSearch, setExamSearch] = useState('');
  const [language, setLanguage] = useState('English');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('board_level');
  const [length, setLength] = useState<InterviewLength>(5);

  // Device Test State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCamTested, setIsCamTested] = useState(false);
  const [isMicTested, setIsMicTested] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [deviceStream, setDeviceStream] = useState<MediaStream | null>(null);

  // Filter exams based on goal and search
  const filteredExams = EXAMS_DATABASE.filter(e => {
    const matchesGoal = goal === 'communication' ? e.category === 'communication' : e.category === goal || e.category === 'government';
    const matchesSearch = e.name.toLowerCase().includes(examSearch.toLowerCase()) || e.description.toLowerCase().includes(examSearch.toLowerCase());
    return matchesGoal && matchesSearch;
  });

  const selectedExam = EXAMS_DATABASE.find(e => e.id === selectedExamId) || EXAMS_DATABASE[0];

  // Camera & Mic check handlers
  const testCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setDeviceStream(stream);
      setIsCamTested(true);
    } catch {
      setIsCamTested(false);
      alert('Camera access denied or device not found. You can still continue in simulated/audio mode.');
    }
  };

  const testMicrophone = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setIsMicTested(true);
      setAudioLevel(75);
      setTimeout(() => setAudioLevel(0), 2000);
      audioStream.getTracks().forEach(t => t.stop());
    } catch {
      setIsMicTested(false);
      alert('Microphone access denied. You can use keyboard input in the interview.');
    }
  };

  useEffect(() => {
    return () => {
      if (deviceStream) {
        deviceStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [deviceStream]);

  const handleStartInterview = async () => {
    if (!canStartInterview()) return;

    // Generate initial session questions
    const questions = await defaultAIProvider.generateQuestions(
      selectedExam.id,
      language,
      difficulty,
      length
    );

    const session: InterviewSession = {
      id: `session-${Date.now()}`,
      goal,
      examId: selectedExam.id,
      examName: selectedExam.name,
      language,
      difficulty,
      length,
      currentQuestionIndex: 0,
      questions,
      answers: [],
      startedAt: Date.now()
    };

    InterviewMemory.saveActiveSession(session);
    navigate('/interview/room');
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Bar & Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>AI INTERVIEW SETUP WIZARD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
            Configure Your Mock Interview Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Step {currentStep} of 6 &bull; Personalized to your preparation needs
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {[1, 2, 3, 4, 5, 6].map(step => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === currentStep
                    ? 'w-8 bg-amber-500'
                    : step < currentStep
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Card Body */}
        <div className="bg-[#111726] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          {/* STEP 1: SELECT GOAL */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Step 1 — Select Your Primary Goal</h2>
              <p className="text-xs text-slate-400 mb-6">
                Choose the domain of your interview simulation so our AI boards can adapt their evaluation criteria.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'government',
                    title: 'Government Exam',
                    desc: 'Civil Services, State PSC, Banking, Defence, Railways & Public Sector.',
                    icon: Shield
                  },
                  {
                    id: 'placement',
                    title: 'Campus & Job Placement',
                    desc: 'HR behavioral, Technical viva, Software, Consulting & Core Engineering.',
                    icon: Briefcase
                  },
                  {
                    id: 'job',
                    title: 'Corporate / Lateral Interview',
                    desc: 'Experienced professional roles, domain depth, and managerial scenarios.',
                    icon: Award
                  },
                  {
                    id: 'communication',
                    title: 'Communication Practice',
                    desc: 'Daily conversational fluency, Group Discussion (GD), and Extempore.',
                    icon: MessageSquare
                  }
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = goal === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setGoal(item.id as InterviewGoal)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/10'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg flex-shrink-0 ${isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{item.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT EXAM */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Step 2 — Select Your Specific Examination</h2>
              <p className="text-xs text-slate-400 mb-4">
                Choose from 50+ specialized boards trained on actual personality tests and syllabus criteria.
              </p>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={examSearch}
                  onChange={(e) => setExamSearch(e.target.value)}
                  placeholder="Search exam (e.g. UPSC CSE, BPSC, Banking PO, SSB...)"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Exam Options Grid */}
              <div className="grid sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {filteredExams.map(exam => {
                  const isSelected = selectedExamId === exam.id;
                  return (
                    <div
                      key={exam.id}
                      onClick={() => setSelectedExamId(exam.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>{exam.name}</span>
                          {exam.popular && (
                            <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-400 text-[9px] rounded font-semibold">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                          {exam.description}
                        </p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SELECT LANGUAGE */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Step 3 — Select Interview Medium &amp; Language</h2>
              <p className="text-xs text-slate-400 mb-6">
                Our AI panelists adapt voice speech synthesis and follow-ups to your chosen tongue.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {INDIAN_LANGUAGES.map(lang => {
                  const isSelected = language === lang.code;
                  return (
                    <div
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <span className="font-bold text-xs text-white block">{lang.label}</span>
                          {lang.note && (
                            <span className="text-[10px] text-amber-300 block">{lang.note}</span>
                          )}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                  );
                })}
              </div>

              {language === 'Hinglish' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs text-amber-200">
                  💡 <strong>Hinglish Note:</strong> Questions and speech feedback will use Roman-script conversational Hindi-English, matching actual Indian board environments.
                </div>
              )}
            </div>
          )}

          {/* STEP 4: DIFFICULTY */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Step 4 — Select Board Rigor &amp; Difficulty</h2>
              <p className="text-xs text-slate-400 mb-6">
                Adjust how aggressively the panel counter-questions and stress-tests your responses.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'beginner',
                    title: 'Beginner',
                    desc: 'Supportive tone, gentle prompts, focuses on core intro and basic concepts.'
                  },
                  {
                    id: 'intermediate',
                    title: 'Intermediate',
                    desc: 'Balanced board evaluation with 1-2 situational counter-questions.'
                  },
                  {
                    id: 'advanced',
                    title: 'Advanced',
                    desc: 'Challenging follow-ups, testing policy feasibility and numerical depth.'
                  },
                  {
                    id: 'board_level',
                    title: 'Board Level (Real UPSC/SSB)',
                    desc: 'Full stress simulation: rapid counter-questions, reality-checks on claims, high pressure.'
                  }
                ].map(item => {
                  const isSelected = difficulty === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setDifficulty(item.id as DifficultyLevel)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-white">{item.title}</h3>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: INTERVIEW LENGTH */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Step 5 — Select Interview Duration</h2>
              <p className="text-xs text-slate-400 mb-6">
                Choose how many questions your panel will cover during this practice session.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    length: 5,
                    title: 'Quick Mock',
                    time: '~10 Mins',
                    desc: '5 core questions. Perfect for daily consistency and quick warmup.'
                  },
                  {
                    length: 10,
                    title: 'Standard Board',
                    time: '~20 Mins',
                    desc: '10 questions covering profile, policy, situation, and follow-ups.'
                  },
                  {
                    length: 15,
                    title: 'Deep Simulation',
                    time: '~35 Mins',
                    desc: '15 questions with comprehensive stress rounds and extensive scoring.'
                  }
                ].map(item => {
                  const isSelected = length === item.length;
                  return (
                    <div
                      key={item.length}
                      onClick={() => setLength(item.length as InterviewLength)}
                      className={`p-5 rounded-xl border cursor-pointer text-center transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs font-bold text-amber-400 block mb-1">{item.time}</span>
                      <h3 className="font-bold text-base text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: CAMERA & MIC CHECK */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Step 6 — Camera &amp; Microphone Pre-Flight Check</h2>
              <p className="text-xs text-slate-400 mb-6">
                Verify your audio and visual readiness so our real-time practice telemetry works smoothly.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 items-center">
                {/* Video Preview Box */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/20 flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  {!isCamTested && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-950/80">
                      <Camera className="w-8 h-8 text-slate-500 mb-2" />
                      <span className="text-xs text-slate-400">Click "Test Camera" below</span>
                    </div>
                  )}
                  {isCamTested && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-bold">
                      Camera Ready
                    </div>
                  )}
                </div>

                {/* Device Test Actions */}
                <div className="space-y-4">
                  <div>
                    <button
                      onClick={testCamera}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>{isCamTested ? 'Re-test Camera' : 'Test Camera Preview'}</span>
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={testMicrophone}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Mic className="w-4 h-4 text-emerald-400" />
                      <span>{isMicTested ? 'Microphone Active' : 'Test Microphone Audio'}</span>
                    </button>

                    {audioLevel > 0 && (
                      <div className="mt-2 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-3/4 animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                    Note: If camera or mic permissions are denied, the interview automatically adapts to keyboard and simulated practice mode.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:translate-x-1"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleStartInterview}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Enter Interview Room &rarr;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
