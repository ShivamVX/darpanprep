/**
 * DARPANPREP EXAM DATABASE
 * Extensible repository of supported exam profiles, requirements and metadata.
 */

import { ExamConfig } from '../engine/interviewTypes';

export const EXAMS_DATABASE: ExamConfig[] = [
  // GOVERNMENT EXAMS
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services (CSE)',
    category: 'government',
    description: 'Premier personality test conducted by the Union Public Service Commission for IAS, IPS, IFS, and Central Services.',
    languages: ['English', 'Hindi', 'Hinglish'],
    interviewTypes: ['Board Personality Test', 'DAF Analysis', 'Situation Reaction'],
    questionCategories: ['Governance', 'DAF/Profile', 'Current Affairs', 'Ethics', 'Economic Policy'],
    difficultyLevels: ['advanced', 'board_level'],
    popular: true
  },
  {
    id: 'bpsc',
    name: 'BPSC (Bihar Public Service)',
    category: 'government',
    state: 'Bihar',
    description: 'Administrative mock board for Bihar Civil Services covering regional governance, state budget, agriculture, and flood management.',
    languages: ['Hindi', 'English', 'Hinglish'],
    interviewTypes: ['State Administrative Board', 'Local Case Studies'],
    questionCategories: ['Bihar History & Economy', 'Administration', 'Social Schemes', 'Crisis Handling'],
    difficultyLevels: ['intermediate', 'advanced', 'board_level'],
    popular: true
  },
  {
    id: 'uppsc',
    name: 'UPPSC (Uttar Pradesh PSC)',
    category: 'government',
    state: 'Uttar Pradesh',
    description: 'Comprehensive mock interviews for UP Provincial Civil Services (PCS) focused on district management and state development priorities.',
    languages: ['Hindi', 'English', 'Hinglish'],
    interviewTypes: ['State Administrative Board'],
    questionCategories: ['UP Economy', 'Law & Order', 'Panchayat Reforms', 'Ethics'],
    difficultyLevels: ['intermediate', 'advanced', 'board_level'],
    popular: true
  },
  {
    id: 'mppsc',
    name: 'MPPSC (Madhya Pradesh PSC)',
    category: 'government',
    state: 'Madhya Pradesh',
    description: 'Interviews for state executive and forest services covering tribal welfare, rural economy, and public administration.',
    languages: ['Hindi', 'English'],
    interviewTypes: ['State Board'],
    questionCategories: ['Tribal Welfare', 'MP Heritage', 'State Governance'],
    difficultyLevels: ['intermediate', 'advanced']
  },
  {
    id: 'rpsc',
    name: 'RPSC (Rajasthan Administrative Service)',
    category: 'government',
    state: 'Rajasthan',
    description: 'RAS mock panel covering water resource management, tourism economy, local administrative structures, and state schemes.',
    languages: ['Hindi', 'English'],
    interviewTypes: ['State Board'],
    questionCategories: ['Water Management', 'Rajasthan Culture', 'Law Enforcement'],
    difficultyLevels: ['intermediate', 'advanced', 'board_level'],
    popular: true
  },
  {
    id: 'wbpsc',
    name: 'WBPSC (West Bengal Civil Service)',
    category: 'government',
    state: 'West Bengal',
    description: 'WBCS executive mock interview simulation with focus on industrial revival, port logistics, and social welfare programs.',
    languages: ['Bengali', 'English', 'Hindi'],
    interviewTypes: ['State Board'],
    questionCategories: ['Bengal Economy', 'Urban Planning', 'Public Health'],
    difficultyLevels: ['intermediate', 'advanced']
  },
  {
    id: 'ssc-cgl',
    name: 'SSC CGL (Central Govt Group B/C)',
    category: 'government',
    description: 'Interviews and verification assessments for Assistant Section Officer, Inspector (GST/IT), and Enforcement Officers.',
    languages: ['English', 'Hindi', 'Hinglish'],
    interviewTypes: ['Verbal Assessment', 'Aptitude Viva'],
    questionCategories: ['Taxation Principles', 'Government Operations', 'Integrity Test'],
    difficultyLevels: ['beginner', 'intermediate', 'advanced'],
    popular: true
  },
  {
    id: 'banking-po',
    name: 'Banking PO (SBI, IBPS, RBI Grade B)',
    category: 'government',
    description: 'Personal interviews for probationary officers assessing banking awareness, RBI monetary policy, digital finance, and customer conflict resolution.',
    languages: ['English', 'Hindi', 'Hinglish'],
    interviewTypes: ['PO Panel Interview', 'Situation Reaction'],
    questionCategories: ['Monetary Policy', 'NPA Recovery', 'Digital Banking', 'Customer Situations'],
    difficultyLevels: ['intermediate', 'advanced', 'board_level'],
    popular: true
  },
  {
    id: 'defence-ssb',
    name: 'Defence SSB (NDA, CDS, AFCAT)',
    category: 'government',
    description: 'SSB Interviewing Officer (IO) personal interview simulation assessing 15 Officer Like Qualities (OLQ), military history, and mental toughness.',
    languages: ['English', 'Hinglish'],
    interviewTypes: ['SSB Personal Interview', 'Rapid Fire Questions', 'Extempore'],
    questionCategories: ['Leadership Under Fire', 'Family Background', 'National Security', 'Moral Courage'],
    difficultyLevels: ['advanced', 'board_level'],
    popular: true
  },
  {
    id: 'capf',
    name: 'CAPF AC (Assistant Commandant)',
    category: 'government',
    description: 'UPSC CAPF personality board for BSF, CRPF, CISF, ITBP, and SSB commanding officers.',
    languages: ['English', 'Hindi'],
    interviewTypes: ['Armed Forces Panel'],
    questionCategories: ['Internal Security', 'Border Management', 'Troop Morale', 'Disaster Response'],
    difficultyLevels: ['advanced', 'board_level']
  },
  {
    id: 'teaching',
    name: 'Teaching & Academia (CTET, KVS, UGC NET)',
    category: 'government',
    description: 'Viva and demo interviews for Kendriya Vidyalaya, Navodaya, and university assistant professor positions.',
    languages: ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu'],
    interviewTypes: ['Pedagogical Demo', 'Subject Viva'],
    questionCategories: ['Classroom Management', 'NEP 2020', 'Curriculum Design', 'Child Psychology'],
    difficultyLevels: ['intermediate', 'advanced']
  },
  {
    id: 'railways-rrb',
    name: 'Railways RRB (NTPC & Officers)',
    category: 'government',
    description: 'Suitability interview round for Station Masters, Traffic Apprentices, and Railway Board supervisors.',
    languages: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu'],
    interviewTypes: ['Technical & Aptitude Viva'],
    questionCategories: ['Operational Safety', 'Logistics', 'Emergency Handling'],
    difficultyLevels: ['beginner', 'intermediate']
  },
  {
    id: 'psu-engineering',
    name: 'Public Sector (IES, ISRO, DRDO, BARC)',
    category: 'government',
    description: 'Rigorous technical viva board for Indian Engineering Services and research scientist posts.',
    languages: ['English', 'Hinglish'],
    interviewTypes: ['Technical Board Viva', 'Research Defense'],
    questionCategories: ['Core Engineering', 'System Design', 'Project Defense', 'Innovation Under Constraints'],
    difficultyLevels: ['advanced', 'board_level'],
    popular: true
  },

  // PLACEMENT INTERVIEWS
  {
    id: 'placement-hr',
    name: 'Campus Placement — HR Round',
    category: 'placement',
    description: 'Standard behavioral HR interview round for campus hires, internships, and entry-level corporate roles.',
    languages: ['English', 'Hinglish'],
    interviewTypes: ['STAR Behavioral Interview', 'Culture Fit'],
    questionCategories: ['Self Introduction', 'Conflict Resolution', 'Teamwork', 'Career Aspirations'],
    difficultyLevels: ['beginner', 'intermediate'],
    popular: true
  },
  {
    id: 'placement-software',
    name: 'Software Engineering & Tech Interview',
    category: 'placement',
    description: 'Technical behavioral and system conceptual round for SDE roles at top product and service companies.',
    languages: ['English'],
    interviewTypes: ['Technical Concept Viva', 'Project Walkthrough'],
    questionCategories: ['Data Structures & Algorithmic Thinking', 'Web Architecture', 'Debugging Scenarios', 'Code Ethics'],
    difficultyLevels: ['intermediate', 'advanced'],
    popular: true
  },
  {
    id: 'placement-consulting',
    name: 'Consulting & Strategy Interview',
    category: 'placement',
    description: 'Structured business problem solving, market entry estimates, and synthesis under pressure for MBB and Big 4 firms.',
    languages: ['English'],
    interviewTypes: ['Case Interview', 'Guesstimates'],
    questionCategories: ['Market Sizing', 'Profitability Diagnostic', 'Hypothesis-Led Thinking'],
    difficultyLevels: ['advanced', 'board_level'],
    popular: true
  },
  {
    id: 'placement-core',
    name: 'Core Engineering (Mech / Civil / Electrical)',
    category: 'placement',
    description: 'Technical viva for core manufacturing, infrastructure, automotive, and power generation firms.',
    languages: ['English', 'Hinglish'],
    interviewTypes: ['Technical Viva'],
    questionCategories: ['Thermodynamics & Structures', 'Circuit Analysis', 'Industrial Safety', 'CAD / Quality Control'],
    difficultyLevels: ['intermediate', 'advanced']
  },

  // COMMUNICATION PRACTICE
  {
    id: 'comm-everyday',
    name: 'Everyday English Conversation',
    category: 'communication',
    description: 'Natural, low-stress conversational practice to build casual speaking confidence and eliminate hesitation.',
    languages: ['English', 'Hinglish'],
    interviewTypes: ['Interactive Chat'],
    questionCategories: ['Daily Life', 'Travel', 'Hobbies', 'Expressing Opinions'],
    difficultyLevels: ['beginner', 'intermediate'],
    popular: true
  },
  {
    id: 'comm-gd',
    name: 'Group Discussion (GD) Simulation',
    category: 'communication',
    description: 'Multi-speaker simulation where AI participants present opposing views, allowing you to practice entry, moderation, and conclusion.',
    languages: ['English', 'Hinglish'],
    interviewTypes: ['Multi-agent Discussion'],
    questionCategories: ['Socio-Economic Debates', 'Tech Impact', 'Ethics in Business'],
    difficultyLevels: ['intermediate', 'advanced'],
    popular: true
  },
  {
    id: 'comm-extempore',
    name: 'Extempore (1-3 Minute Impromptu Speaking)',
    category: 'communication',
    description: 'Timed impromptu speaking challenges with instant evaluation of structure, flow, and filler words.',
    languages: ['English', 'Hindi', 'Hinglish'],
    interviewTypes: ['Timed Speech'],
    questionCategories: ['Abstract Topics', 'Current Controversies', 'Philosophical Quotes'],
    difficultyLevels: ['intermediate', 'advanced', 'board_level'],
    popular: true
  }
];

export const INDIAN_LANGUAGES = [
  { code: 'English', label: 'English', flag: '🇬🇧', voiceCode: 'en-IN' },
  { code: 'Hinglish', label: 'Hinglish (Conversational)', flag: '🇮🇳', voiceCode: 'en-IN', note: 'Roman script Hindi-English blend' },
  { code: 'Hindi', label: 'हिंदी (Hindi)', flag: '🇮🇳', voiceCode: 'hi-IN' },
  { code: 'Bengali', label: 'বাংলা (Bengali)', flag: '🇮🇳', voiceCode: 'bn-IN' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)', flag: '🇮🇳', voiceCode: 'ta-IN' },
  { code: 'Telugu', label: 'తెలుగు (Telugu)', flag: '🇮🇳', voiceCode: 'te-IN' },
  { code: 'Marathi', label: 'मराठी (Marathi)', flag: '🇮🇳', voiceCode: 'mr-IN' },
  { code: 'Gujarati', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', voiceCode: 'gu-IN' },
  { code: 'Kannada', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', voiceCode: 'kn-IN' },
  { code: 'Malayalam', label: 'മലയാളം (Malayalam)', flag: '🇮🇳', voiceCode: 'ml-IN' },
  { code: 'Punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳', voiceCode: 'pa-IN' },
];

export const PANEL_PERSONAS: Record<string, import('../engine/interviewTypes').Interviewer> = {
  dr_mehta: {
    id: 'dr_mehta',
    name: 'Dr. R. Mehta',
    role: 'Senior Civil Services Panel Chairperson',
    persona: 'Calm, highly analytical, and governance-oriented. Seeks structural understanding and administrative feasibility.',
    gender: 'male',
    style: 'governance',
    voicePitch: 0.9,
    voiceRate: 0.95,
    avatarUrl: '/assets/images/panel-interview.jpg'
  },
  ms_ananya: {
    id: 'ms_ananya',
    name: 'Ms. Ananya Sharma',
    role: 'Diplomatic & International Relations Panel',
    persona: 'Conversational, sharp, empathetic, and follow-up focused. Checks diplomatic nuance and cultural sensitivity.',
    gender: 'female',
    style: 'diplomatic',
    voicePitch: 1.1,
    voiceRate: 1.0,
    avatarUrl: '/assets/images/panel-interview.jpg'
  },
  prof_rao: {
    id: 'prof_rao',
    name: 'Prof. S. Rao',
    role: 'Economic Policy & Implementation Expert',
    persona: 'Intellectual, numbers-oriented, and challenges feasibility. Reality-checks exaggerated claims.',
    gender: 'male',
    style: 'economic',
    voicePitch: 0.95,
    voiceRate: 0.95,
    avatarUrl: '/assets/images/panel-interview.jpg'
  }
};
