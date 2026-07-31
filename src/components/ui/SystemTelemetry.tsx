'use client';

import React from 'react';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { Activity, Zap, CheckCircle2, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

export function SystemTelemetry() {
  const lighthouseScores = [
    { label: 'PERFORMANCE', score: '100', color: 'text-[#8BFFB0]' },
    { label: 'ACCESSIBILITY', score: '100', color: 'text-[#FFD54F]' },
    { label: 'SEO', score: '100', color: 'text-[#4F8EFF]' },
    { label: 'BEST PRACTICES', score: '100', color: 'text-[#FF8A8A]' },
  ];

  const specs = [
    { label: 'FRAMEWORK', value: 'Next.js 16' },
    { label: 'LIBRARY', value: 'React 19' },
    { label: 'TYPE SAFETY', value: 'TypeScript Strict' },
    { label: 'DEPLOYMENT', value: 'Vercel Edge' },
  ];

  return (
    <section className="py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="bg-[#111111] text-white p-8 sm:p-12 border-4 border-[#111111] neo-shadow-hard space-y-8 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-white/15 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#4F8EFF] text-[#111111] border-2 border-white">
                  <Activity className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl tracking-tight text-white uppercase">
                    SYSTEM PERFORMANCE & QUALITY TELEMETRY
                  </h3>
                  <p className="font-mono text-xs text-[#8BFFB0] font-bold">
                    ENGINEERED FOR PRODUCTION-GRADE EXCELLENCE
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#8BFFB0] text-[#111111] border-2 border-white font-mono text-xs font-black uppercase neo-shadow-premium">
                <span className="w-3 h-3 bg-[#111111] rounded-full animate-ping" />
                <span>ALL METRICS PERFECT</span>
              </div>
            </div>

            {/* Main Metrics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Lighthouse 100 Cards */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {lighthouseScores.map((lh) => (
                  <div
                    key={lh.label}
                    className="p-5 bg-white/5 border-2 border-white/20 text-center space-y-2 neo-shadow-premium hover:border-white transition-colors"
                  >
                    <span className="font-mono text-[10px] font-bold text-white/60 tracking-wider block">
                      {lh.label}
                    </span>
                    <div className={`font-display font-black text-4xl sm:text-5xl ${lh.color}`}>
                      {lh.score}
                    </div>
                    <span className="font-mono text-[9px] font-bold text-[#8BFFB0] block">
                      ✓ PERFECT
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Specs & Bundle Size Column */}
              <div className="lg:col-span-5 bg-white/5 border-2 border-white/20 p-6 space-y-4 neo-shadow-premium">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-mono text-xs font-bold text-white/70 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#FFD54F]" />
                    <span>BUNDLE SIZE</span>
                  </span>
                  <span className="font-mono text-sm font-black text-[#8BFFB0] bg-white/10 px-3 py-1 border border-white/20">
                    142 KB GZIPPED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  {specs.map((spec) => (
                    <div key={spec.label} className="font-mono text-xs">
                      <span className="text-white/40 block text-[9px] font-bold">
                        {spec.label}
                      </span>
                      <span className="text-white font-black">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
