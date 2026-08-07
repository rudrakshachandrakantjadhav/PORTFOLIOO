'use client';

import React, { useState, useEffect } from 'react';
import {
  X, Sparkles, CheckCircle2, Copy, Check, Target, Zap, Briefcase,
  Terminal, ShieldCheck, Award, ChevronDown, ChevronUp, Share2, FileText,
  DollarSign, TrendingUp, AlertTriangle, ExternalLink, ArrowRight
} from 'lucide-react';
import { useSoundFX } from '@/components/providers/SoundProvider';

interface JDMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AnalysisResult {
  matchScore: number;
  atsScore: number;
  matchCategory: string;
  verdictRating: string;
  recommendedAction: string;
  summary: string;
  strengths: string[];
  matchingSkills: string[];
  missingSkills: string[];
  matchingProjects: { title: string; score: number; reason: string }[];
  interviewQuestions: { question: string; answer: string }[];
  salaryBenchmark: { typical: string; marketDemand: string; competition: string };
  hiringProbability: { recruiterInterest: string; likelyInterview: string; likelyShortlist: string };
  tailoredPitch: string;
  coverLetter: string;
  linkedinMessage: string;
  suggestedPath: string[];
}

export function JDMatcherModal({ isOpen, onClose }: JDMatcherModalProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'interview' | 'actions'>('overview');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { playClick, playHover, playSuccess } = useSoundFX();

  if (!isOpen) return null;

  const roleCards = [
    {
      id: 'frontend',
      title: '💻 Frontend Engineer',
      stack: 'React • Next.js • TypeScript',
      jobTitle: 'Senior Frontend Engineer',
      company: 'TechCorp Web',
      text: 'We are seeking a Frontend Engineer proficient in React.js, Next.js 15, TypeScript, Tailwind CSS, and state management (Zustand) to build high-performance web dashboards and reusable component systems.'
    },
    {
      id: 'flutter',
      title: '📱 Flutter Mobile Developer',
      stack: 'Flutter • Dart • Riverpod',
      jobTitle: 'Mobile Software Engineer (Flutter)',
      company: 'AppStudio Mobile',
      text: 'Looking for a Mobile Developer with strong experience in Flutter, Dart, Riverpod state management, GoRouter, REST APIs, and native mobile Android SDK integration.'
    },
    {
      id: 'ai',
      title: '🤖 AI & Full-Stack Solutions',
      stack: 'React • Node • AI/LLM APIs',
      jobTitle: 'AI Solutions Engineer',
      company: 'Neural Labs',
      text: 'Seeking an AI Engineer to integrate third-party LLM/AI APIs into full-stack React and Node.js applications, building interactive analytics dashboards and automated data pipelines.'
    },
    {
      id: 'fullstack',
      title: '⚙️ Full Stack Engineer',
      stack: 'MERN • REST APIs • Next.js',
      jobTitle: 'Full-Stack Developer',
      company: 'GrowthScale Inc',
      text: 'Seeking a Full-Stack Engineer skilled in React, Next.js, Node.js, Express, MongoDB schema design, RESTful API architecture, and responsive web deployment.'
    },
    {
      id: 'backend',
      title: '☁️ Backend API Engineer',
      stack: 'Node.js • Express • MongoDB',
      jobTitle: 'Backend Engineer',
      company: 'DataCore Systems',
      text: 'Looking for a Backend Engineer proficient in Node.js, Express.js, MongoDB database modeling, REST API design, authentication workflows, and system optimization.'
    },
    {
      id: 'custom',
      title: '🏢 Custom Job Description',
      stack: 'Paste your own JD',
      jobTitle: '',
      company: '',
      text: ''
    }
  ];

  const terminalScanLogs = [
    'Initializing Copilot ATS Engine & Gemini 3.1 Flash Lite...',
    'Parsing target Job Description requirements...',
    'Scanning Candidate Resume: Rudraksha C. Jadhav (B.Tech CSE & CodSoft Intern)...',
    '✓ Matched Core Skills: React.js, Next.js 15, Flutter, Dart, Node.js, MongoDB',
    '✓ Matched Project Portfolio: CarbonLens, Collections, DisasterLink, Terralife',
    '✓ Matched Verified Credentials: 7 Google & Meta Certifications',
    '! Identified Growth Opportunities: Docker Containerization & AWS Services',
    'Generating Recruiter Compatibility Report & Radar Ratings...'
  ];

  const handleAnalyze = async (textToUse?: string, titleToUse?: string, companyToUse?: string) => {
    const jdText = textToUse !== undefined ? textToUse : jobDescription;
    const jdTitle = titleToUse !== undefined ? titleToUse : jobTitle;
    const jdCompany = companyToUse !== undefined ? companyToUse : companyName;

    if (!jdText.trim()) return;

    playClick();
    setAnalyzing(true);
    setAnalysis(null);
    setScanStep(0);

    // Simulate GitHub Copilot live scanning steps
    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < terminalScanLogs.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 350);

    try {
      const res = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jdText, jobTitle: jdTitle, companyName: jdCompany }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setTimeout(() => {
          setAnalysis(data.analysis);
          setAnalyzing(false);
          playSuccess();
        }, 1200);
      } else {
        setAnalyzing(false);
      }
    } catch {
      setAnalyzing(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleClear = () => {
    playClick();
    setJobTitle('');
    setCompanyName('');
    setJobDescription('');
    setAnalysis(null);
  };

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white border-4 border-[#111111] neo-shadow-hard text-[#111111] p-6 sm:p-10 relative">
        {/* Close Button */}
        <button
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 bg-[#FF8A8A] text-[#111111] border-2 border-[#111111] hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Hero Banner Header */}
        <div className="space-y-3 mb-8 pr-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFD54F] border-2 border-[#111111] font-mono text-xs font-black uppercase neo-shadow-premium">
            <Sparkles className="w-4 h-4 text-[#111111]" />
            <span>AI RECRUITER COMPATIBILITY CENTER • GEMINI 3.1 FLASH LITE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#111111]">
            RECRUITER COMPATIBILITY ANALYZER
          </h2>
          <p className="font-sans text-sm sm:text-base font-medium text-[#111111]/80 max-w-3xl leading-relaxed">
            Analyze any Job Description against Rudraksha's resume, 4 flagship projects, 7 Google/Meta certs, and skills arsenal to generate an instant ATS compatibility score, skill gap analysis, and tailored pitch.
          </p>
        </div>

        {/* 6 Quick Action Role Cards Grid */}
        <div className="space-y-3 mb-8">
          <label className="block font-mono text-xs font-black uppercase tracking-wider text-[#111111]">
            SELECT A TARGET ROLE PRESET OR CUSTOM JOB:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {roleCards.map((card) => (
              <button
                key={card.id}
                onClick={() => {
                  if (card.id === 'custom') {
                    handleClear();
                  } else {
                    setJobTitle(card.jobTitle);
                    setCompanyName(card.company);
                    setJobDescription(card.text);
                    handleAnalyze(card.text, card.jobTitle, card.company);
                  }
                }}
                className={`p-3 border-2 border-[#111111] text-left flex flex-col justify-between transition-all cursor-pointer neo-shadow-premium hover:-translate-y-1 ${
                  jobTitle === card.jobTitle && card.id !== 'custom'
                    ? 'bg-[#FFD54F] font-bold'
                    : 'bg-[#FFF9F0] hover:bg-[#8BFFB0]'
                }`}
              >
                <span className="font-display font-black text-xs text-[#111111] line-clamp-1">{card.title}</span>
                <span className="font-mono text-[10px] text-[#111111]/70 font-bold mt-2">{card.stack}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4 p-5 bg-[#FFF9F0] border-4 border-[#111111] neo-shadow-premium mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-1 text-[#111111]">
                TARGET JOB TITLE
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior React Developer / Mobile Engineer"
                className="w-full px-4 py-2.5 bg-white border-2 border-[#111111] font-sans font-bold text-xs outline-none focus:border-[#4F8EFF]"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-1 text-[#111111]">
                COMPANY NAME (OPTIONAL)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google, Vercel, Meta"
                className="w-full px-4 py-2.5 bg-white border-2 border-[#111111] font-sans font-bold text-xs outline-none focus:border-[#4F8EFF]"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-black uppercase mb-1 text-[#111111]">
              PASTE JOB DESCRIPTION
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description requirements, responsibilities, or tech stack..."
              className="w-full px-4 py-2.5 bg-white border-2 border-[#111111] font-sans font-bold text-xs outline-none focus:border-[#4F8EFF]"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handleAnalyze()}
              disabled={analyzing || !jobDescription.trim()}
              className="flex-1 min-w-[200px] py-3.5 bg-[#111111] text-white border-4 border-[#111111] font-display font-black text-sm neo-shadow-premium hover:bg-[#4F8EFF] hover:text-[#111111] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FFD54F]" />
              <span>{analyzing ? 'GEMINI AI SCANNING...' : 'ANALYZE COMPATIBILITY WITH GEMINI AI'}</span>
            </button>

            <button
              onClick={handleClear}
              className="px-5 py-3.5 bg-white text-[#111111] border-4 border-[#111111] font-display font-black text-sm neo-shadow-premium hover:bg-[#FF8A8A] transition-colors cursor-pointer"
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* GitHub Copilot Style Live Terminal Scan Console */}
        {analyzing && (
          <div className="p-5 bg-[#111111] text-white border-4 border-[#111111] neo-shadow-hard space-y-3 font-mono text-xs mb-8 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#8BFFB0]" />
                <span className="font-bold text-[#8BFFB0]">GITHUB COPILOT ATS SCANNER IN PROGRESS</span>
              </div>
              <span className="w-2.5 h-2.5 bg-[#FFD54F] rounded-full animate-ping" />
            </div>

            <div className="space-y-1.5 pt-1">
              {terminalScanLogs.slice(0, scanStep + 1).map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-white/40">&gt;</span>
                  <span className={log.startsWith('✓') ? 'text-[#8BFFB0] font-bold' : log.startsWith('!') ? 'text-[#FFD54F]' : 'text-white/90'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full bg-white/20 h-2 mt-4 overflow-hidden border border-white">
              <div
                className="bg-[#4F8EFF] h-full transition-all duration-300"
                style={{ width: `${((scanStep + 1) / terminalScanLogs.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Full Interactive AI Recruiter Report */}
        {analysis && !analyzing && (
          <div className="space-y-8 pt-4 animate-in fade-in duration-300">
            {/* Top Verdict Banner */}
            <div className="p-6 bg-[#111111] text-white border-4 border-[#111111] neo-shadow-hard flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-[#8BFFB0] text-[#111111] font-mono text-xs font-black uppercase border border-white">
                    {analysis.verdictRating}
                  </span>
                  <span className="px-3 py-1 bg-[#FFD54F] text-[#111111] font-mono text-xs font-black uppercase border border-white">
                    RECOMMENDED: {analysis.recommendedAction}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  FINAL RECRUITER VERDICT: {analysis.matchCategory}
                </h3>
              </div>

              {/* Dual Scores */}
              <div className="flex gap-4">
                <div className="p-4 bg-white text-[#111111] border-2 border-white text-center neo-shadow-premium min-w-[110px]">
                  <div className="font-mono text-[10px] font-bold text-[#111111]/70">COMPATIBILITY</div>
                  <div className="font-display font-black text-3xl text-[#4F8EFF]">{analysis.matchScore}%</div>
                </div>
                <div className="p-4 bg-[#FFD54F] text-[#111111] border-2 border-white text-center neo-shadow-premium min-w-[110px]">
                  <div className="font-mono text-[10px] font-bold text-[#111111]/70">ATS SCORE</div>
                  <div className="font-display font-black text-3xl text-[#111111]">{analysis.atsScore}%</div>
                </div>
              </div>
            </div>

            {/* Radar Rating Chart & Candidate Strengths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Visual Skill Radar Chart */}
              <div className="md:col-span-6 p-6 bg-white border-4 border-[#111111] neo-shadow-premium space-y-4">
                <h4 className="font-display font-black text-base uppercase flex items-center gap-2 text-[#111111]">
                  <Target className="w-5 h-5 text-[#4F8EFF]" />
                  <span>SKILL RADAR MATCH RATING</span>
                </h4>
                <div className="space-y-3 font-mono text-xs font-bold">
                  {[
                    { category: 'Frontend (React/Next)', rating: '●●●●● (5/5)', color: 'text-[#4F8EFF]' },
                    { category: 'Mobile (Flutter/Android)', rating: '●●●●● (5/5)', color: 'text-[#8BFFB0]' },
                    { category: 'Backend (Node/Express)', rating: '●●●●☆ (4/5)', color: 'text-[#FFD54F]' },
                    { category: 'AI & LLM APIs', rating: '●●●●☆ (4/5)', color: 'text-[#FF8A8A]' },
                    { category: 'Database & REST APIs', rating: '●●●●● (5/5)', color: 'text-[#8BFFB0]' },
                    { category: 'Cloud & Containerization', rating: '●●☆☆☆ (2/5)', color: 'text-gray-400' },
                  ].map((radar, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-[#111111]/10 pb-2">
                      <span className="text-[#111111]">{radar.category}</span>
                      <span className={radar.color}>{radar.rating}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Candidate Summary */}
              <div className="md:col-span-6 p-6 bg-[#FFF9F0] border-4 border-[#111111] neo-shadow-premium space-y-4">
                <h4 className="font-display font-black text-base uppercase flex items-center gap-2 text-[#111111]">
                  <Award className="w-5 h-5 text-[#FFD54F]" />
                  <span>CANDIDATE ALIGNMENT SUMMARY</span>
                </h4>
                <p className="font-sans text-xs sm:text-sm font-medium leading-relaxed text-[#111111]">
                  {analysis.summary}
                </p>
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-black uppercase text-[#111111]/70">KEY COMPETENCY HIGHLIGHTS:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs font-bold">
                    {analysis.strengths.map((str, idx) => (
                      <div key={idx} className="p-2 bg-white border border-[#111111] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8BFFB0] shrink-0 stroke-[3]" />
                        <span className="truncate">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Matched vs Identified Skill Gap Roadmap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div className="p-6 bg-white border-4 border-[#111111] neo-shadow-premium space-y-4">
                <h4 className="font-display font-black text-base uppercase text-[#111111] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#8BFFB0] stroke-[3]" />
                  <span>MATCHED TECHNICAL SKILLS ({analysis.matchingSkills.length})</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchingSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-[#8BFFB0] text-[#111111] border-2 border-[#111111] font-mono text-xs font-black neo-shadow-premium">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Identified Skill Gap / Next Steps */}
              <div className="p-6 bg-white border-4 border-[#111111] neo-shadow-premium space-y-4">
                <h4 className="font-display font-black text-base uppercase text-[#111111] flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#FF8A8A]" />
                  <span>IDENTIFIED GROWTH OPPORTUNITIES</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((gap, i) => (
                    <span key={i} className="px-3 py-1 bg-[#FF8A8A] text-[#111111] border-2 border-[#111111] font-mono text-xs font-black neo-shadow-premium">
                      ! {gap}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-[11px] text-[#111111]/70 font-bold">
                  *Currently actively building proficiency toward Docker containerization & AWS cloud deployments.
                </p>
              </div>
            </div>

            {/* Project Recommendations with Match Score */}
            <div className="space-y-4 p-6 bg-[#FFF9F0] border-4 border-[#111111] neo-shadow-premium">
              <h4 className="font-display font-black text-lg uppercase flex items-center gap-2 text-[#111111]">
                <Briefcase className="w-5 h-5 text-[#4F8EFF]" />
                <span>MOST RELEVANT PORTFOLIO PROJECTS FOR THIS ROLE</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.matchingProjects.map((p, idx) => (
                  <div key={idx} className="p-4 bg-white border-2 border-[#111111] neo-shadow-premium space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-display font-black text-sm text-[#111111]">{p.title}</span>
                        <span className="px-2 py-0.5 bg-[#4F8EFF] text-white font-mono text-[10px] font-black border border-[#111111]">
                          {p.score}% MATCH
                        </span>
                      </div>
                      <p className="font-sans text-xs font-medium text-[#111111]/80 leading-relaxed">{p.reason}</p>
                    </div>

                    <a
                      href="#projects"
                      onClick={() => onClose()}
                      className="px-3 py-1.5 bg-[#111111] text-white font-mono text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#FFD54F] hover:text-[#111111] transition-colors"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Likely Technical Interview Questions */}
            <div className="space-y-4 p-6 bg-white border-4 border-[#111111] neo-shadow-premium">
              <h4 className="font-display font-black text-lg uppercase flex items-center gap-2 text-[#111111]">
                <Zap className="w-5 h-5 text-[#FFD54F]" />
                <span>LIKELY RECRUITER TECHNICAL INTERVIEW QUESTIONS</span>
              </h4>
              <div className="space-y-3">
                {analysis.interviewQuestions.map((q, idx) => (
                  <div key={idx} className="border-2 border-[#111111] bg-[#FFF9F0]">
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                      className="w-full p-3 text-left font-display font-black text-xs sm:text-sm flex justify-between items-center hover:bg-[#FFD54F] transition-colors cursor-pointer"
                    >
                      <span>Q{idx + 1}: {q.question}</span>
                      {expandedQuestion === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedQuestion === idx && (
                      <div className="p-4 border-t-2 border-[#111111] bg-white font-sans text-xs font-medium leading-relaxed">
                        <span className="font-mono text-[10px] font-bold text-[#4F8EFF] block mb-1">RECOMMENDED ANSWER:</span>
                        {q.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Benchmark & Hiring Probability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#111111] text-white border-4 border-[#111111] neo-shadow-premium space-y-3">
                <h4 className="font-display font-black text-sm uppercase text-[#8BFFB0] flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>SALARY & MARKET BENCHMARK</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2 bg-white/10 border border-white/20">
                    <span className="text-[9px] text-white/60 block">TYPICAL SALARY</span>
                    <span className="font-black text-xs text-[#FFD54F]">{analysis.salaryBenchmark.typical}</span>
                  </div>
                  <div className="p-2 bg-white/10 border border-white/20">
                    <span className="text-[9px] text-white/60 block">MARKET DEMAND</span>
                    <span className="font-black text-xs text-[#8BFFB0]">{analysis.salaryBenchmark.marketDemand}</span>
                  </div>
                  <div className="p-2 bg-white/10 border border-white/20">
                    <span className="text-[9px] text-white/60 block">COMPETITION</span>
                    <span className="font-black text-xs text-white">{analysis.salaryBenchmark.competition}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#111111] text-white border-4 border-[#111111] neo-shadow-premium space-y-3">
                <h4 className="font-display font-black text-sm uppercase text-[#FFD54F] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>HIRING PROBABILITY METRICS</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2 bg-white/10 border border-white/20">
                    <span className="text-[9px] text-white/60 block">RECRUITER INTEREST</span>
                    <span className="font-black text-xs text-[#FFD54F]">{analysis.hiringProbability.recruiterInterest}</span>
                  </div>
                  <div className="p-2 bg-white/10 border border-white/20">
                    <span className="text-[9px] text-white/60 block">LIKELY INTERVIEW</span>
                    <span className="font-black text-xs text-[#8BFFB0]">{analysis.hiringProbability.likelyInterview}</span>
                  </div>
                  <div className="p-2 bg-white/10 border border-white/20">
                    <span className="text-[9px] text-white/60 block">SHORTLIST RATE</span>
                    <span className="font-black text-xs text-white">{analysis.hiringProbability.likelyShortlist}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Portfolio Path */}
            <div className="p-4 bg-[#FFF9F0] border-2 border-[#111111] neo-shadow-premium flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <span className="font-black uppercase text-[#111111]">RECOMMENDED PORTFOLIO PATH:</span>
              <div className="flex items-center gap-2 overflow-x-auto">
                {analysis.suggestedPath.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2.5 py-1 bg-white border border-[#111111] font-bold text-[#111111] shrink-0">
                      {step}
                    </span>
                    {idx < analysis.suggestedPath.length - 1 && <span className="text-[#111111]/40">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div className="p-6 bg-white border-4 border-[#111111] neo-shadow-hard space-y-4">
              <h4 className="font-display font-black text-base uppercase text-[#111111]">
                1-CLICK RECRUITER ACTIONS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleCopy(analysis.tailoredPitch, 'pitch')}
                  className="p-3 bg-[#FFD54F] text-[#111111] border-2 border-[#111111] font-mono text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer neo-shadow-premium"
                >
                  {copiedKey === 'pitch' ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                  <span>COPY ELEVATOR PITCH</span>
                </button>

                <button
                  onClick={() => handleCopy(analysis.coverLetter, 'cover')}
                  className="p-3 bg-[#4F8EFF] text-[#111111] border-2 border-[#111111] font-mono text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer neo-shadow-premium"
                >
                  {copiedKey === 'cover' ? <Check className="w-4 h-4 stroke-[3]" /> : <FileText className="w-4 h-4" />}
                  <span>COPY COVER LETTER</span>
                </button>

                <button
                  onClick={() => handleCopy(analysis.linkedinMessage, 'linkedin')}
                  className="p-3 bg-[#8BFFB0] text-[#111111] border-2 border-[#111111] font-mono text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer neo-shadow-premium"
                >
                  {copiedKey === 'linkedin' ? <Check className="w-4 h-4 stroke-[3]" /> : <Share2 className="w-4 h-4" />}
                  <span>COPY LINKEDIN DM</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
