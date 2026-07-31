'use client';

import React from 'react';
import { EXPERIENCES } from '@/constants/portfolio';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

export function Experience() {
  const getNodeColor = (color: string) => {
    switch (color) {
      case 'green':
        return { dot: 'bg-[#8BFFB0]', text: 'text-[#8BFFB0]', stripe: 'bg-[#8BFFB0]' };
      case 'coral':
        return { dot: 'bg-[#FF8A8A]', text: 'text-[#FF8A8A]', stripe: 'bg-[#FF8A8A]' };
      case 'blue':
        return { dot: 'bg-[#4F8EFF]', text: 'text-[#4F8EFF]', stripe: 'bg-[#4F8EFF]' };
      default:
        return { dot: 'bg-[#FFD54F]', text: 'text-[#FFD54F]', stripe: 'bg-[#FFD54F]' };
    }
  };

  return (
    <section id="experience" className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="mb-20">
            <span className="font-mono text-xs uppercase tracking-widest block mb-2 text-[#8BFFB0] font-bold">
              Career Path
            </span>
            <h2 className="font-black text-4xl md:text-6xl font-display text-[#111111] text-huge">
              JOURNEY
            </h2>
          </div>
        </RevealOnScroll>

        {/* Neo-Brutal Timeline */}
        <div className="relative space-y-16 before:content-[''] before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-2 before:bg-[#111111] before:-translate-x-1/2">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            const style = getNodeColor(exp.accentColor);
            return (
              <RevealOnScroll key={exp.id} direction="up" delay={idx * 0.1}>
                <div
                  className={`relative flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center justify-between group`}
                >
                  {/* Node Dot */}
                  <div
                    className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 ${style.dot} border-4 border-[#111111] rounded-full z-10 group-hover:scale-150 transition-transform`}
                  />

                  {/* Card */}
                  <div
                    className={`w-full md:w-[45%] bg-white border-4 border-[#111111] p-8 neo-shadow-premium relative overflow-hidden ${
                      isEven ? 'md:ml-0 ml-10' : 'md:mr-0 ml-10'
                    }`}
                  >
                    <div className={`absolute top-0 left-0 w-2.5 h-full ${style.stripe}`} />

                    <div className="pl-3 space-y-3">
                      <span className={`font-mono text-xs font-black uppercase px-2.5 py-0.5 border border-[#111111] ${style.dot} text-[#111111] inline-block`}>
                        {exp.period}
                      </span>
                      <h3 className="font-display font-black text-2xl text-[#111111]">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs text-[#111111]/60 uppercase tracking-tighter font-extrabold">
                        {exp.company}
                      </p>
                      <p className="font-sans text-sm text-[#111111]/90 leading-relaxed font-medium">
                        {exp.description}
                      </p>

                      <ul className="space-y-1.5 pt-3 border-t-2 border-[#111111]/10">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="font-sans text-xs text-[#111111]/90 list-disc list-inside font-semibold">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="hidden md:block w-[45%]" />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
