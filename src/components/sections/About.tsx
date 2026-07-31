'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/constants/portfolio';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { GraduationCap, Sparkles, FolderGit2, Cpu, Award, GitCommit, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

export function About() {
  const statCardColors = [
    { bg: 'bg-[#4F8EFF]/15', border: 'border-[#4F8EFF]', text: 'text-[#4F8EFF]', icon: FolderGit2 },
    { bg: 'bg-[#FFD54F]/20', border: 'border-[#FFD54F]', text: 'text-[#111111]', icon: Cpu },
    { bg: 'bg-[#8BFFB0]/20', border: 'border-[#8BFFB0]', text: 'text-[#111111]', icon: Award },
    { bg: 'bg-[#FF8A8A]/20', border: 'border-[#FF8A8A]', text: 'text-[#111111]', icon: GitCommit },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <RevealOnScroll direction="up">
          <div className="border-4 border-[#111111] bg-white p-8 md:p-14 neo-shadow-hard grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            {/* Parallax Rotating Badge */}
            <ParallaxWrapper speed={-0.5} className="absolute -top-10 -right-6 z-20 hidden lg:block">
              <div className="w-24 h-24 bg-[#FF8A8A] border-4 border-[#111111] rounded-full flex items-center justify-center font-black text-xl rotate-12 neo-shadow-hard text-[#111111]">
                HI!
              </div>
            </ParallaxWrapper>

            {/* Story & Education Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#4F8EFF] font-bold block">
                  Background & Expertise
                </span>
                <h2 className="text-huge text-4xl lg:text-6xl font-display font-black text-[#111111]">
                  THE STORY
                </h2>
              </div>

              <p className="font-sans text-xl leading-relaxed text-[#111111]/90 font-medium">
                {PERSONAL_INFO.aboutBioLight}
              </p>

              {/* Education Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-[#C0AFFF]/20 border-4 border-[#111111] neo-shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#C0AFFF]" />
                  <div className="flex items-center gap-3 mb-2 pt-1">
                    <GraduationCap className="w-6 h-6 text-[#111111] stroke-[2.5]" />
                    <h3 className="font-display font-black text-xl">B.TECH CSE</h3>
                  </div>
                  <p className="font-bold text-sm text-[#111111]">
                    {PERSONAL_INFO.education.degree}
                  </p>
                  <p className="font-mono text-xs mt-2 opacity-90 font-bold">
                    {PERSONAL_INFO.education.institution}
                  </p>
                  <span className="font-mono text-xs mt-1 inline-block px-2.5 py-0.5 border border-[#111111] bg-white font-bold">
                    {PERSONAL_INFO.education.period}
                  </span>
                </div>

                <div className="p-6 bg-[#8BFFB0]/20 border-4 border-[#111111] neo-shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#8BFFB0]" />
                  <div className="flex items-center gap-3 mb-2 pt-1">
                    <GraduationCap className="w-6 h-6 text-[#111111] stroke-[2.5]" />
                    <h3 className="font-display font-black text-xl">DIPLOMA</h3>
                  </div>
                  <p className="font-bold text-sm text-[#111111]">
                    {PERSONAL_INFO.diploma.degree}
                  </p>
                  <p className="font-mono text-xs mt-2 opacity-90 font-bold">
                    {PERSONAL_INFO.diploma.institution}
                  </p>
                  <span className="font-mono text-xs mt-1 inline-block px-2.5 py-0.5 border border-[#111111] bg-white font-bold">
                    {PERSONAL_INFO.diploma.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Real Avatar Photo & Contact Info Column */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <ParallaxWrapper speed={0.2} className="w-full">
                <div className="aspect-[4/3] sm:aspect-[4/5] border-4 border-[#111111] bg-[#FFD54F] neo-shadow-premium overflow-hidden relative group">
                  <Image
                    src="/rudraksha.jpg"
                    alt={PERSONAL_INFO.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#111111] text-white px-3 py-1 font-mono text-xs font-black border-2 border-white neo-shadow-premium">
                    RUDRAKSHA C. JADHAV
                  </div>
                </div>
              </ParallaxWrapper>

              <div className="bg-[#111111] text-white p-6 border-4 border-[#111111] neo-shadow-premium space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#8BFFB0] rounded-full animate-pulse"></span>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#8BFFB0] font-bold">
                    Official Contact Info
                  </p>
                </div>
                <div className="space-y-1.5 font-mono text-xs font-bold text-white/90">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#FFD54F] stroke-[2.5]" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#FFD54F] transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8BFFB0] stroke-[2.5]" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Stats Grid with Colorful Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAL_INFO.stats.map((stat, idx) => {
            const style = statCardColors[idx % statCardColors.length];
            const Icon = style.icon;
            return (
              <RevealOnScroll key={stat.label} direction="up" delay={idx * 0.1}>
                <div className={`border-4 border-[#111111] bg-white p-6 neo-shadow-premium flex flex-col justify-between h-full group hover:-rotate-1 transition-transform`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 border-2 border-[#111111] ${style.bg}`}>
                      <Icon className="w-5 h-5 text-[#111111] stroke-[2.5]" />
                    </div>
                  </div>
                  <div>
                    <span className="font-display font-black text-4xl sm:text-5xl text-[#111111] block mb-1">
                      <CounterAnimation value={stat.value} />
                    </span>
                    <span className="font-mono text-xs font-bold text-[#111111]/70 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
