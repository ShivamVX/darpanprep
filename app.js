/**
 * DARPANPREP INTERACTIVE LOGIC & AI SIMULATOR
 * Practice Today, Reflect Tomorrow
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. QUESTION DATABASE FOR MOCK INTERVIEWS
  // -------------------------------------------------------------
  const INTERVIEW_QUESTIONS = [
    {
      speaker: 'Dr. R. Mehta',
      role: 'Board Chairperson (Former UPSC Board Member)',
      text: 'Welcome. You mentioned rural development in your DAF. How would you practically implement sustainable economic models at the Gram Panchayat level in an aspirational district?',
      voicePitch: 0.9,
      voiceRate: 0.95
    },
    {
      speaker: 'Ms. Ananya Sharma',
      role: 'Board Member (Ex-IFS)',
      text: 'In the context of the current geopolitical climate and Global South leadership, how should India balance strategic energy autonomy with renewable commitments?',
      voicePitch: 1.1,
      voiceRate: 1.0
    },
    {
      speaker: 'Prof. S. Rao',
      role: 'Board Member (Policy Expert)',
      text: 'If you encounter local administrative resistance and political pressure while clearing encroachments, what will be your step-by-step Standard Operating Procedure?',
      voicePitch: 0.95,
      voiceRate: 0.95
    },
    {
      speaker: 'Dr. R. Mehta',
      role: 'Board Chairperson',
      text: 'Integrity is tested not in comfort, but under duress. Can you give an example from your personal life or career where you chose principle over convenience?',
      voicePitch: 0.9,
      voiceRate: 0.95
    }
  ];

  let currentQuestionIndex = 0;
  let timerInterval = null;
  let elapsedSeconds = 48;
  let isWebcamActive = false;
  let webcamStream = null;

  // -------------------------------------------------------------
  // 2. DOM ELEMENTS
  // -------------------------------------------------------------
  // Modals
  const interviewModal = document.getElementById('interviewModal');
  const reportModal = document.getElementById('reportModal');
  const examDetailModal = document.getElementById('examDetailModal');

  // Trigger buttons
  const heroStartBtn = document.getElementById('heroStartPracticeBtn');
  const laptopPreviewCard = document.getElementById('laptopPreviewCard');
  const laptopTryBtn = document.getElementById('laptopTryBtn');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const footerStartBtn = document.getElementById('footerStartBtn');
  const exploreCommBtn = document.getElementById('exploreCommBtn');

  // Modal controls
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeReportBtn = document.getElementById('closeReportBtn');
  const closeReportFinalBtn = document.getElementById('closeReportFinalBtn');
  const closeExamModalBtn = document.getElementById('closeExamModalBtn');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
  const endInterviewBtn = document.getElementById('endInterviewBtn');
  const replayQuestionBtn = document.getElementById('replayQuestionBtn');
  const restartPracticeBtn = document.getElementById('restartPracticeBtn');
  const toggleWebcamBtn = document.getElementById('toggleWebcamBtn');

  // Dynamic elements in simulator
  const sessionTimer = document.getElementById('sessionTimer');
  const currentSpeakerName = document.getElementById('currentSpeakerName');
  const panelQuestionDisplay = document.getElementById('panelQuestionDisplay');
  const panelAudioWave = document.getElementById('panelAudioWave');
  const confScore = document.getElementById('confScore');
  const paceScore = document.getElementById('paceScore');
  const fillerScore = document.getElementById('fillerScore');
  const webcamVideo = document.getElementById('webcamVideo');
  const simulatedCandidateImg = document.getElementById('simulatedCandidateImg');

  // Language Dropdown
  const langSelectBtn = document.getElementById('langSelectBtn');
  const langMenu = document.getElementById('langMenu');
  const langOptions = document.querySelectorAll('.lang-option');

  // -------------------------------------------------------------
  // 3. SPEECH SYNTHESIS (VOICE OF AI PANEL)
  // -------------------------------------------------------------
  function speakQuestion(text, pitch = 1.0, rate = 1.0) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.lang = 'en-IN'; // Indian English accent if available

      // Wave animation activates while speaking
      panelAudioWave.classList.add('active');

      utterance.onend = () => {
        panelAudioWave.classList.remove('active');
      };
      utterance.onerror = () => {
        panelAudioWave.classList.remove('active');
      };

      window.speechSynthesis.speak(utterance);
    }
  }

  // -------------------------------------------------------------
  // 4. INTERVIEW SIMULATOR FLOW
  // -------------------------------------------------------------
  function openInterviewModal(questionIdx = 0) {
    currentQuestionIndex = questionIdx;
    interviewModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    startTimer();
    renderCurrentQuestion();
  }

  function closeInterviewModal() {
    interviewModal.classList.remove('open');
    document.body.style.overflow = '';
    stopTimer();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopWebcam();
  }

  function renderCurrentQuestion() {
    const q = INTERVIEW_QUESTIONS[currentQuestionIndex];
    if (!q) return;

    currentSpeakerName.textContent = `${q.speaker} (${q.role})`;
    panelQuestionDisplay.textContent = `"${q.text}"`;

    // Dynamic telemetry fluctuations for realism
    const randomConf = Math.floor(82 + Math.random() * 12);
    const randomPace = Math.floor(128 + Math.random() * 15);
    const randomFillers = Math.floor(Math.random() * 2);

    confScore.textContent = `${randomConf}%`;
    paceScore.textContent = `${randomPace} WPM (Optimal)`;
    fillerScore.textContent = `${randomFillers} detected`;

    // Speak the question
    speakQuestion(q.text, q.voicePitch, q.voiceRate);
  }

  function startTimer() {
    stopTimer();
    elapsedSeconds = 48;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
  }

  function updateTimerDisplay() {
    const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const secs = String(elapsedSeconds % 60).padStart(2, '0');
    sessionTimer.textContent = `${mins}:${secs}`;
  }

  // Next Question / Finish
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex >= INTERVIEW_QUESTIONS.length) {
        showReportModal();
      } else {
        renderCurrentQuestion();
      }
    });
  }

  if (endInterviewBtn) {
    endInterviewBtn.addEventListener('click', () => {
      showReportModal();
    });
  }

  if (replayQuestionBtn) {
    replayQuestionBtn.addEventListener('click', () => {
      const q = INTERVIEW_QUESTIONS[currentQuestionIndex];
      if (q) speakQuestion(q.text, q.voicePitch, q.voiceRate);
    });
  }

  function showReportModal() {
    closeInterviewModal();
    reportModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (closeReportBtn) {
    closeReportBtn.addEventListener('click', () => {
      reportModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (closeReportFinalBtn) {
    closeReportFinalBtn.addEventListener('click', () => {
      reportModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (restartPracticeBtn) {
    restartPracticeBtn.addEventListener('click', () => {
      reportModal.classList.remove('open');
      openInterviewModal(0);
    });
  }

  // -------------------------------------------------------------
  // 5. WEBCAM REAL / SIMULATED TOGGLE
  // -------------------------------------------------------------
  async function toggleWebcam() {
    if (!isWebcamActive) {
      try {
        webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        webcamVideo.srcObject = webcamStream;
        webcamVideo.style.display = 'block';
        simulatedCandidateImg.style.display = 'none';
        isWebcamActive = true;
        toggleWebcamBtn.querySelector('span').textContent = 'Switch to Simulated Video';
      } catch (err) {
        alert('Webcam access was not granted or is unavailable on this device. Using high-resolution AI Candidate simulation feed.');
      }
    } else {
      stopWebcam();
    }
  }

  function stopWebcam() {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      webcamStream = null;
    }
    webcamVideo.style.display = 'none';
    simulatedCandidateImg.style.display = 'block';
    isWebcamActive = false;
    toggleWebcamBtn.querySelector('span').textContent = 'Enable Real Camera';
  }

  if (toggleWebcamBtn) {
    toggleWebcamBtn.addEventListener('click', toggleWebcam);
  }

  // -------------------------------------------------------------
  // 6. EVENT LISTENERS FOR MODALS & CTAS
  // -------------------------------------------------------------
  if (heroStartBtn) heroStartBtn.addEventListener('click', () => openInterviewModal(0));
  if (laptopPreviewCard) laptopPreviewCard.addEventListener('click', () => openInterviewModal(0));
  if (laptopTryBtn) laptopTryBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openInterviewModal(0);
  });
  if (getStartedBtn) getStartedBtn.addEventListener('click', () => openInterviewModal(0));
  if (footerStartBtn) footerStartBtn.addEventListener('click', () => openInterviewModal(0));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeInterviewModal);

  // Close modals on clicking backdrop outside card
  [interviewModal, reportModal, examDetailModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (modal === interviewModal) closeInterviewModal();
      }
    });
  });

  // -------------------------------------------------------------
  // 7. EXAM CATEGORIES DETAILS
  // -------------------------------------------------------------
  const EXAM_DATA = {
    upsc: {
      title: 'UPSC Civil Services (CSE) Interview',
      tag: 'CIVIL SERVICES',
      desc: 'Simulated 5-member interview board comprising retired IAS/IFS chairpersons and eminent academicians. Dynamic questions based on your Detailed Application Form (DAF), current affairs, and ethical case studies.'
    },
    psc: {
      title: 'State Public Service Commission (BPSC, RPSC, UPPSC)',
      tag: 'STATE SERVICES',
      desc: 'State-specific administrative scenarios, local geography, state budget policies, and regional administrative challenges in Hindi and regional languages.'
    },
    banking: {
      title: 'Banking & Financial Sector (IBPS PO, SBI PO, RBI Grade B)',
      tag: 'BANKING & FINANCE',
      desc: 'Monetary policy, NPA resolution, digital banking infrastructure, priority sector lending, and behavioral situation reaction tests.'
    },
    defence: {
      title: 'Defence SSB Interview (NDA, CDS, AFCAT)',
      tag: 'DEFENCE FORCES',
      desc: 'Comprehensive 5-day SSB psychological and personal interview simulation. Officer Like Qualities (OLQ) evaluation and extempore speech practice.'
    },
    teaching: {
      title: 'Teaching & Academia (CTET, UGC NET, KVS)',
      tag: 'EDUCATION',
      desc: 'Pedagogical methodology, classroom management simulations, NEP 2020 frameworks, and subject matter deep-dives.'
    },
    railways: {
      title: 'Railway Recruitment Board (RRB NTPC, JE)',
      tag: 'RAILWAYS',
      desc: 'Operational safety, signaling, logistics management, and candidate suitability rounds for Indian Railways.'
    },
    psu: {
      title: 'Public Sector Undertakings (IES, ISRO, DRDO, GATE)',
      tag: 'ENGINEERING & RESEARCH',
      desc: 'High-level core technical viva, engineering principles, system architecture, and R&D problem-solving panels.'
    },
    placements: {
      title: 'Campus & Corporate Placements',
      tag: 'PLACEMENTS',
      desc: 'Technical rounds, HR rounds, resume walkthrough, culture-fit evaluations, and managerial problem scenario practice.'
    }
  };

  const examCards = document.querySelectorAll('.exam-card[data-exam]');
  const examModalTitle = document.getElementById('examModalTitle');
  const examModalTag = document.getElementById('examModalTag');
  const examModalDesc = document.getElementById('examModalDesc');
  const startExamSpecificMock = document.getElementById('startExamSpecificMock');

  examCards.forEach(card => {
    card.addEventListener('click', () => {
      const examKey = card.getAttribute('data-exam');
      const data = EXAM_DATA[examKey];
      if (data) {
        examModalTitle.textContent = data.title;
        examModalTag.textContent = data.tag;
        examModalDesc.textContent = data.desc;
        examDetailModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeExamModalBtn) {
    closeExamModalBtn.addEventListener('click', () => {
      examDetailModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (startExamSpecificMock) {
    startExamSpecificMock.addEventListener('click', () => {
      examDetailModal.classList.remove('open');
      openInterviewModal(0);
    });
  }

  const moreExamsCard = document.getElementById('moreExamsCard');
  const viewAllExamsBtn = document.getElementById('viewAllExamsBtn');
  [moreExamsCard, viewAllExamsBtn].forEach(el => {
    if (el) {
      el.addEventListener('click', () => {
        examModalTitle.textContent = 'All 50+ Supported Examinations';
        examModalTag.textContent = 'COMPLETE DIRECTORY';
        examModalDesc.textContent = 'Includes SSC CGL, SSC CHSL, CAPF, EPFO, State Police Services, Judicial Services, SEBI, NABARD, and Engineering Services.';
        examDetailModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  // -------------------------------------------------------------
  // 8. COMMUNICATION MODULE EXPLORATION
  // -------------------------------------------------------------
  if (exploreCommBtn) {
    exploreCommBtn.addEventListener('click', () => {
      examModalTitle.textContent = 'DarpanPrep Communication Mastery Coach';
      examModalTag.textContent = 'SPEAKING & CONFIDENCE';
      examModalDesc.textContent = '1-on-1 daily practice with your AI coach. Master Group Discussions (GD), Extempore 2-minute impromptu speaking, elevator pitches, and pronunciation accent improvement.';
      examDetailModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  // -------------------------------------------------------------
  // 9. PRICING ACTIONS
  // -------------------------------------------------------------
  const freePlanBtn = document.getElementById('freePlanBtn');
  const proPlanBtn = document.getElementById('proPlanBtn');
  const yearlyPlanBtn = document.getElementById('yearlyPlanBtn');

  if (freePlanBtn) {
    freePlanBtn.addEventListener('click', () => {
      openInterviewModal(0);
    });
  }

  if (proPlanBtn) {
    proPlanBtn.addEventListener('click', () => {
      alert('🌟 Pro Plan Selected (₹299/month)!\n\nWelcome to DarpanPrep Pro. Unlimited mock interviews with 3D AI panels and comprehensive body language analysis are unlocked.');
    });
  }

  if (yearlyPlanBtn) {
    yearlyPlanBtn.addEventListener('click', () => {
      alert('💎 Yearly Plan Selected (₹2,499/year - Save 30%)!\n\nFull 365-day access to all 50+ government exams, placement prep, and priority doubt support activated.');
    });
  }

  // -------------------------------------------------------------
  // 10. LANGUAGE SELECTOR
  // -------------------------------------------------------------
  if (langSelectBtn && langMenu) {
    langSelectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      langMenu.classList.remove('show');
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        langOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const lang = opt.getAttribute('data-lang');
        langSelectBtn.querySelector('span').textContent = lang;
        langMenu.classList.remove('show');
      });
    });
  }
});
