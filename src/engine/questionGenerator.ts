/**
 * DARPANPREP QUESTION GENERATOR ENGINE
 * Extensible question bank and session plan generator.
 */

import { InterviewQuestion, DifficultyLevel, InterviewerId } from './interviewTypes';

interface QuestionBankItem {
  id: string;
  exams: string[]; // e.g. ['upsc-cse', 'bpsc', 'uppsc', 'all-gov']
  category: string;
  difficulty: DifficultyLevel;
  text: {
    English: string;
    Hindi?: string;
    Hinglish?: string;
  };
  interviewerId: InterviewerId;
  keywords: string[];
  followUpTopics: string[];
}

export const QUESTION_BANK: QuestionBankItem[] = [
  // 1. Introduction & Profile (Dr. Mehta)
  {
    id: 'intro-daf-01',
    exams: ['upsc-cse', 'bpsc', 'uppsc', 'mppsc', 'rpsc', 'wbpsc'],
    category: 'Introduction / DAF',
    difficulty: 'beginner',
    text: {
      English: 'Welcome to the board. Looking through your profile, tell us what pivotal experience during your education or early career convinced you to enter public administration?',
      Hindi: 'बोर्ड में आपका स्वागत है। आपके प्रोफाइल को देखते हुए, हमें बताएं कि आपकी शिक्षा या प्रारंभिक जीवन के किस अनुभव ने आपको लोक सेवा में आने के लिए प्रेरित किया?',
      Hinglish: 'Welcome to the board. Aapke profile ko dekh kar, batayein ki aapke education ya early career ke kis specific experience ne aapko civil services me aane ke liye motivate kiya?'
    },
    interviewerId: 'dr_mehta',
    keywords: ['experience', 'background', 'public service', 'motivation', 'education'],
    followUpTopics: ['rural development', 'governance', 'social impact', 'policy']
  },
  // 2. Rural Development / Administration (Dr. Mehta)
  {
    id: 'gov-rural-01',
    exams: ['upsc-cse', 'bpsc', 'uppsc', 'mppsc', 'rpsc', 'ssc-cgl'],
    category: 'Administration & Governance',
    difficulty: 'intermediate',
    text: {
      English: 'You mentioned rural development in your answer. How would you practically implement sustainable economic models at the Gram Panchayat level in an aspirational district?',
      Hindi: 'आपने अपने उत्तर में ग्रामीण विकास का उल्लेख किया। एक आकांक्षी जिले में ग्राम पंचायत स्तर पर आप स्थायी आर्थिक मॉडल को जमीनी स्तर पर कैसे लागू करेंगे?',
      Hinglish: 'Aapne rural development ki baat ki. Ek aspirational district me Gram Panchayat level par aap sustainable economic models ko practically ground level par kaise implement karenge?'
    },
    interviewerId: 'dr_mehta',
    keywords: ['rural', 'gram panchayat', 'agriculture', 'shg', 'implementation', 'district'],
    followUpTopics: ['monitoring', 'local resistance', 'budget allocation', 'self help groups']
  },
  // 3. International Relations / Diplomacy (Ms. Ananya)
  {
    id: 'ir-south-01',
    exams: ['upsc-cse', 'defence-ssb', 'capf'],
    category: 'Diplomacy & Current Affairs',
    difficulty: 'advanced',
    text: {
      English: 'Given the shifting multipolar world order and India’s voice for the Global South, how should our strategic diplomacy balance energy security partnerships with renewable commitments?',
      Hindi: 'बदलती वैश्विक व्यवस्था और ग्लोबल साउथ के लिए भारत के नेतृत्व को देखते हुए, हमारी कूटनीति को ऊर्जा सुरक्षा और नवीकरणीय ऊर्जा प्रतिबद्धताओं के बीच संतुलन कैसे बनाना चाहिए?',
      Hinglish: 'Global South leadership aur changing world order ko dekhte hue, India ko apni strategic energy security aur green renewable commitments ke beech balance kaise strike karna chahiye?'
    },
    interviewerId: 'ms_ananya',
    keywords: ['energy', 'global south', 'diplomacy', 'renewables', 'climate', 'multipolar'],
    followUpTopics: ['geopolitics', 'sanctions', 'strategic autonomy', 'trade']
  },
  // 4. Economic Feasibility & Fiscal Prudence (Prof. Rao)
  {
    id: 'econ-fiscal-01',
    exams: ['upsc-cse', 'banking-po', 'bpsc', 'uppsc'],
    category: 'Economic Policy',
    difficulty: 'advanced',
    text: {
      English: 'There is an ongoing debate between capital expenditure in infrastructure versus welfare transfers. From a fiscal deficit perspective, where do you draw the line between necessary welfare and unsustainable fiscal strain?',
      Hindi: 'बुनियादी ढांचे में पूंजीगत व्यय बनाम कल्याणकारी प्रत्यक्ष लाभ अंतरण के बीच निरंतर बहस चल रही है। राजकोषीय घाटे के संदर्भ में, आप आवश्यक कल्याण और राजकोषीय तनाव के बीच सीमा कहाँ तय करेंगे?',
      Hinglish: 'Infrastructure capital expenditure aur social welfare transfers ke beech debate chalti rehti hai. Fiscal deficit ko dhyan me rakhte hue, aap welfare aur fiscal discipline ke beech line kahan draw karenge?'
    },
    interviewerId: 'prof_rao',
    keywords: ['capex', 'welfare', 'fiscal deficit', 'freebies', 'subsidy', 'growth'],
    followUpTopics: ['revenue generation', 'tax compliance', 'targeting beneficiaries']
  },
  // 5. Ethics & Administrative Resistance (Dr. Mehta)
  {
    id: 'ethics-pressure-01',
    exams: ['upsc-cse', 'bpsc', 'uppsc', 'rpsc', 'ssc-cgl'],
    category: 'Ethics & Integrity',
    difficulty: 'board_level',
    text: {
      English: 'Imagine you are a District Magistrate executing an anti-encroachment drive on government land. An influential local representative asks you to halt the drive under threat of public agitation. What is your step-by-step course of action?',
      Hindi: 'कल्पना कीजिए कि आप एक जिला मजिस्ट्रेट हैं और सरकारी भूमि पर अतिक्रमण विरोधी अभियान चला रहे हैं। एक प्रभावशाली जनप्रतिनिधि आंदोलन की धमकी देकर इसे रोकने के लिए कहते हैं। आपकी चरणबद्ध कार्ययोजना क्या होगी?',
      Hinglish: 'Imagine kijiye aap ek District Magistrate hain aur anti-encroachment drive chala rahe hain. Ek influential local leader public agitation ki threat dekar drive rokne ko kehta hai. Aapka step-by-step SOP kya hoga?'
    },
    interviewerId: 'dr_mehta',
    keywords: ['magistrate', 'encroachment', 'pressure', 'law and order', 'sop', 'integrity'],
    followUpTopics: ['rule of law', 'community dialogue', 'media handling', 'escalation']
  },
  // 6. Banking & NPA Resolution (Prof. Rao)
  {
    id: 'bank-npa-01',
    exams: ['banking-po'],
    category: 'Banking Policy',
    difficulty: 'intermediate',
    text: {
      English: 'With digital lending platforms surging alongside rising unsecured retail credit, how should scheduled commercial banks adapt their credit appraisal models without dampening credit growth?',
      Hinglish: 'Digital lending platforms aur unsecured retail credit badhne ke dauran, commercial banks ko apni credit risk assessment kaise modify karni chahiye taaki credit growth par asar na pade?'
    },
    interviewerId: 'prof_rao',
    keywords: ['banking', 'npa', 'credit', 'rbi', 'fintech', 'risk'],
    followUpTopics: ['underwriting', 'cibil score', 'default recovery']
  },
  // 7. Defence & Officer Like Qualities (Ms. Ananya / Dr. Mehta)
  {
    id: 'defence-olq-01',
    exams: ['defence-ssb', 'capf'],
    category: 'Defence Leadership',
    difficulty: 'board_level',
    text: {
      English: 'In modern asymmetric warfare and drone surveillance, technical agility often clashes with traditional hierarchy. As a young officer commanding a unit, how do you foster rapid decentralized decision making while preserving chain of command?',
      Hinglish: 'Modern asymmetric warfare me technical agility aur traditional military hierarchy ke beech balance banana padta hai. As a young officer, aap decentralized quick decision making kaise promote karenge bina discipline compromise kiye?'
    },
    interviewerId: 'ms_ananya',
    keywords: ['defence', 'leadership', 'drones', 'chain of command', 'tactical', 'discipline'],
    followUpTopics: ['morale', 'combat readiness', 'delegation']
  },
  // 8. Placement HR — Conflict & Initiative (Ms. Ananya)
  {
    id: 'placement-hr-01',
    exams: ['placement-hr', 'placement-software', 'placement-consulting', 'placement-core'],
    category: 'Behavioral HR',
    difficulty: 'intermediate',
    text: {
      English: 'Tell me about a time when a critical team project went off track due to conflicting opinions between team members. What role did you personally play to mediate and deliver on deadline?',
      Hinglish: 'Apne college ya project life se ek aisi situation batayein jab team members ke conflicting views ki wajah se deadline miss hone wali thi. Aapne situation ko kaise handle aur deliver kiya?'
    },
    interviewerId: 'ms_ananya',
    keywords: ['teamwork', 'conflict', 'deadline', 'resolution', 'leadership', 'project'],
    followUpTopics: ['stakeholder management', 'tradeoffs', 'peer feedback']
  },
  // 9. Tech & Software Systems (Prof. Rao)
  {
    id: 'placement-tech-01',
    exams: ['placement-software'],
    category: 'System Architecture',
    difficulty: 'advanced',
    text: {
      English: 'When architecting a high-throughput real-time service expected to experience unpredictable traffic spikes, what tradeoffs do you evaluate between asynchronous event-driven queues versus synchronous microservices?',
      Hinglish: 'High-throughput system design karte waqt jab unpredictable traffic spikes expect kiye jate hain, aap asynchronous event queues aur synchronous APIs ke beech kya engineering tradeoffs evaluate karenge?'
    },
    interviewerId: 'prof_rao',
    keywords: ['system design', 'microservices', 'queues', 'scalability', 'latency', 'concurrency'],
    followUpTopics: ['caching', 'fault tolerance', 'database bottlenecks']
  },
  // 10. Communication — Extempore & Opinion (Ms. Ananya)
  {
    id: 'comm-extemp-01',
    exams: ['comm-everyday', 'comm-gd', 'comm-extempore'],
    category: 'Public Speaking',
    difficulty: 'intermediate',
    text: {
      English: '"Discipline builds freedom, but excessive rigidity stifles innovation." Take 2 minutes to articulate your perspective with one personal and one societal example.',
      Hinglish: '"Discipline builds freedom, lekin excessive rigidity innovation ko rok sakti hai." Is topic par apna viewpoint present kijiye ek personal aur ek societal example ke saath.'
    },
    interviewerId: 'ms_ananya',
    keywords: ['discipline', 'freedom', 'innovation', 'creativity', 'structure'],
    followUpTopics: ['habits', 'work-life balance', 'startup agility']
  }
];

export function generateQuestionsForSession(
  examId: string,
  language: string,
  difficulty: DifficultyLevel,
  count: number = 5
): InterviewQuestion[] {
  // Filter questions matching exam or general categories
  let candidates = QUESTION_BANK.filter(q => 
    q.exams.includes(examId) || q.exams.includes('all-gov')
  );

  // Fallback if not enough specific questions
  if (candidates.length < count) {
    const additional = QUESTION_BANK.filter(q => !candidates.some(c => c.id === q.id));
    candidates = [...candidates, ...additional];
  }

  // Shuffle deterministic
  const shuffled = [...candidates].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((q, idx) => {
    let text = q.text.English;
    if (language === 'Hindi' && q.text.Hindi) {
      text = q.text.Hindi;
    } else if (language === 'Hinglish' && q.text.Hinglish) {
      text = q.text.Hinglish;
    }

    return {
      id: `${q.id}-${idx + 1}`,
      examId,
      category: q.category,
      difficulty: q.difficulty || difficulty,
      language,
      text,
      interviewerId: q.interviewerId,
      followUpTopics: q.followUpTopics,
      keywords: q.keywords,
      isFollowUp: false
    };
  });
}
