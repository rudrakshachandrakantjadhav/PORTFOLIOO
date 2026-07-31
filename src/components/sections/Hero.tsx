'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/constants/portfolio';
import { HeroThreeScene } from '@/components/animations/HeroThreeScene';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { ResumeModal } from '@/components/ui/ResumeModal';
import { useSoundFX } from '@/components/providers/SoundProvider';
import { ArrowUpRight, Download, Sparkles } from 'lucide-react';

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const { playClick, playHover } = useSoundFX();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-16 px-6 md:px-16"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <RevealOnScroll direction="up" delay={0.1}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4F8EFF]/15 border-2 border-[#111111] neo-shadow-premium">
                <Sparkles className="w-4 h-4 text-[#111111]" />
                <span className="font-mono text-[#111111] font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                  {PERSONAL_INFO.title}
                </span>
              </div>

              <h1 className="text-huge text-[#111111] font-display font-black leading-[0.85]">
                RUDRAKSHA<br />
                <span className="text-[#111111] relative inline-block">
                  JADHAV
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#FFD54F] -z-10 transform -rotate-1 border-b-2 border-[#111111]" />
                </span>
              </h1>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="font-sans text-[#111111]/90 max-w-xl text-xl leading-relaxed font-medium">
              {PERSONAL_INFO.headline}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.3}>
            <div className="flex flex-wrap gap-6 pt-4">
              <MagneticButton>
                <a
                  href="#projects"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="bg-[#4F8EFF] text-[#111111] border-4 border-[#111111] px-8 py-4 font-display font-black text-xl neo-shadow-premium flex items-center gap-3 hover:rotate-1 hover:bg-[#3b7be8] transition-all"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowUpRight className="w-6 h-6 stroke-[3]" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setResumeOpen(true);
                  }}
                  className="bg-[#FFD54F] text-[#111111] border-4 border-[#111111] px-8 py-4 font-display font-black text-xl neo-shadow-premium flex items-center gap-3 hover:-rotate-1 hover:bg-[#ecc23a] transition-all cursor-pointer"
                >
                  <span>GET CV</span>
                  <Download className="w-6 h-6 stroke-[3]" />
                </button>
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>

        {/* Three.js Interactive 3D Canvas with Parallax */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <ParallaxWrapper speed={0.4} className="w-full">
            <HeroThreeScene />
          </ParallaxWrapper>
        </div>
      </div>

      {/* Interactive Resume Modal Viewer */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
