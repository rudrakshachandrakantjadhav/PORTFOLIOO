'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Copy, Check, Target, Zap, Briefcase, ArrowRight } from 'lucide-react';
import { useSoundFX } from '@/components/providers/SoundProvider';

interface JDMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AnalysisResult {
  matchScore: number;
  matchCategory: string;
  summary: string;
  matchingSkills: string[];
  matchingProjects: { title: string; reason: string }[];
  tailoredPitch: string;
}

export function JDMatcherModal({ isOpen, onClose }: JDMatcherModalProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const { playClick, playHover, playSuccess } = useSoundFX();

  if (!isOpen) return null;

  const sampleJDs = [
    { title: 'Senior Full-Stack Engineer (React / Next.js / Node.js)', text: 'We are seeking a Full-Stack Engineer proficient in React.js, Next.js, TypeScript, Node.js, and MongoDB to build scalable web platforms and RESTful APIs.' },
    { title: 'Mobile Developer (Flutter & Android)', text: 'Looking for a Mobile Developer with hands-on experience in Flutter, Dart, Riverpod, Java, Android SDK, and REST API integration for cross-platform apps.' },
    { title: 'AI & Full-Stack Solutions Developer', text: 'Seeking a developer experienced in integrating third-party AI/LLM APIs, building responsive UI dashboards with Tailwind CSS, and working with MongoDB.' },
  ];

  const handleAnalyze = async (textToUse?: string, titleToUse?: string) => {
    const jdText = textToUse || jobDescription;
    const jdTitle = titleToUse || jobTitle;

    if (!jdText.trim()) return;

    playClick();
    setAnalyzing(true);
    setAnalysis(null);

    try {
      const res = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jdText, jobTitle: jdTitle }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        playSuccess();
      }
    } catch {
      // Fallback
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCopyPitch = () => {
    if (!analysis?.tailoredPitch) return;
    navigator.clipboard.writeText(analysis.tailoredPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-4 border-[#111111] neo-shadow-hard text-[#111111] p-6 sm:p-10 relative">
        {/* Close Button */}
        <button
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 bg-[#FF8A8A] border-2 border-[#111111] hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-8 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD54F] border-2 border-[#111111] font-mono text-xs font-black uppercase neo-shadow-premium">
            <Sparkles className="w-4 h-4 text-[#111111]" />
            <span>GEMINI 3.1 AI RECRUITER ANALYZER</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#111111]">
            JOB DESCRIPTION MATCH & COMPATIBILITY
          </h2>
          <p className="font-sans text-sm font-medium text-[#111111]/80">
            Paste any Job Description or target role below. Gemini AI will instantly analyze compatibility with Rudraksha's resume and generate a tailored pitch report!
          </p>
        </div>

        {/* Preset Sample JDs */}
        <div className="space-y-2 mb-6">
          <label className="block font-mono text-xs font-black uppercase text-[#111111]/70">
            TRY PRESET JOB DESCRIPTIONS:
          </label>
          <div className="flex flex-wrap gap-2">
            {sampleJDs.map((sample, i) => (
              <button
                key={i}
                onClick={() => {
                  setJobTitle(sample.title);
                  setJobDescription(sample.text);
                  handleAnalyze(sample.text, sample.title);
                }}
                className="px-3 py-1.5 bg-[#FFF9F0] border-2 border-[#111111] font-mono text-xs font-bold hover:bg-[#FFD54F] transition-colors text-left shrink-0 cursor-pointer"
              >
                + {sample.title}
              </button>
            ))}
          </div>
        </div>

        {/* Job Title & JD Input */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block font-mono text-xs font-black uppercase mb-1.5 text-[#111111]">
              JOB TITLE / ROLE (OPTIONAL)
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior React Developer / Mobile Engineer"
              className="w-full px-4 py-3 bg-[#FFF9F0] border-2 border-[#111111] font-sans font-bold text-sm outline-none focus:border-[#4F8EFF] neo-shadow-premium"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-black uppercase mb-1.5 text-[#111111]">
              PASTE JOB DESCRIPTION
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description requirements, responsibilities, or tech stack..."
              className="w-full px-4 py-3 bg-[#FFF9F0] border-2 border-[#111111] font-sans font-bold text-sm outline-none focus:border-[#4F8EFF] neo-shadow-premium"
            />
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing || !jobDescription.trim()}
            className="w-full py-4 bg-[#111111] text-white border-4 border-[#111111] font-display font-black text-lg neo-shadow-premium hover:bg-[#4F8EFF] hover:text-[#111111] transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#FFD54F]" />
            <span>{analyzing ? 'GEMINI AI ANALYZING MATCH...' : 'ANALYZE COMPATIBILITY WITH GEMINI AI'}</span>
          </button>
        </div>

        {/* AI Analysis Result */}
        {analysis && (
          <div className="space-y-6 pt-6 border-t-4 border-[#111111] animate-in fade-in duration-300">
            {/* Top Score Banner */}
            <div className="p-6 bg-[#111111] text-white border-4 border-[#111111] neo-shadow-premium flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="font-mono text-xs font-bold text-[#8BFFB0]">COMPATIBILITY RATING</span>
                <h3 className="font-display font-black text-2xl text-white">
                  {analysis.matchCategory}
                </h3>
              </div>
              <div className="px-6 py-3 bg-[#FFD54F] text-[#111111] border-2 border-white font-display font-black text-4xl neo-shadow-premium">
                {analysis.matchScore}%
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 bg-[#FFF9F0] border-2 border-[#111111] font-sans text-sm font-medium leading-relaxed">
              {analysis.summary}
            </div>

            {/* Matching Technical Skills */}
            <div className="space-y-3">
              <h4 className="font-display font-black text-base uppercase flex items-center gap-2">
                <Target className="w-5 h-5 text-[#4F8EFF]" />
                <span>DIRECTLY ALIGNED TECHNICAL SKILLS</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.matchingSkills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-3.5 py-1.5 bg-[#8BFFB0] text-[#111111] border-2 border-[#111111] font-mono text-xs font-black flex items-center gap-2 neo-shadow-premium"
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Projects */}
            <div className="space-y-3">
              <h4 className="font-display font-black text-base uppercase flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#FF8A8A]" />
                <span>RECOMMENDED PORTFOLIO PROJECTS FOR THIS ROLE</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {analysis.matchingProjects.map((p, i) => (
                  <div key={i} className="p-4 bg-white border-2 border-[#111111] neo-shadow-premium space-y-1.5">
                    <h5 className="font-display font-black text-sm text-[#111111] flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#FFD54F] shrink-0" />
                      <span>{p.title}</span>
                    </h5>
                    <p className="font-sans text-xs text-[#111111]/80 font-medium">{p.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tailored Elevator Pitch */}
            <div className="p-5 bg-white border-4 border-[#111111] neo-shadow-premium space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-black text-sm uppercase text-[#111111]">
                  TAILORED RECRUITER ELEVATOR PITCH
                </h4>
                <button
                  onClick={handleCopyPitch}
                  className="px-3 py-1.5 bg-[#FFD54F] text-[#111111] border-2 border-[#111111] font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedPitch ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY PITCH</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#111111] leading-relaxed italic bg-[#FFF9F0] p-3 border-2 border-[#111111]">
                "{analysis.tailoredPitch}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
