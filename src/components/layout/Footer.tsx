'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/constants/portfolio';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { ArrowUp, Mail, Phone, MapPin, Copy, Check, Terminal } from 'lucide-react';

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'WORK', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'JOURNEY', href: '#experience' },
    { name: 'CREDENTIALS', href: '#credentials' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer className="w-full mt-24 border-t-8 border-[#111111] bg-[#111111] text-white pt-16 pb-12 px-6 md:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Footer Row: Brand Info, Quick Nav & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b-2 border-white/15 pb-16">
          
          {/* Brand & Bio Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="font-display font-black text-3xl sm:text-4xl text-[#FFD54F] tracking-tight">
                RUDRAKSHA C. JADHAV
              </div>
              <p className="font-mono text-xs text-[#8BFFB0] font-bold">
                SOFTWARE ENGINEER • FULL-STACK & AI SPECIALIST
              </p>
            </div>

            <p className="font-sans text-sm text-white/80 leading-relaxed font-medium max-w-md">
              Crafting government-grade emergency platforms, AI-powered analytics tools, and native mobile applications with 100% type safety and high performance.
            </p>

            {/* Live System Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 border-2 border-white/20 font-mono text-xs font-bold text-white neo-shadow-premium">
              <span className="w-2.5 h-2.5 bg-[#8BFFB0] rounded-full animate-ping" />
              <span>SYSTEM STATUS: ONLINE • VERCEL EDGE</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-black text-[#4F8EFF] uppercase tracking-widest border-b border-white/10 pb-2">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-display font-bold text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[#FFD54F] transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-[#4F8EFF] group-hover:translate-x-1 transition-transform">→</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-mono text-xs font-black text-[#FF8A8A] uppercase tracking-widest border-b border-white/10 pb-2">
              GET IN TOUCH
            </h4>

            <div className="space-y-3 font-mono text-xs font-bold">
              {/* Email Chip with Copy Action */}
              <div className="p-3 bg-white/5 border-2 border-white/15 flex items-center justify-between gap-2 neo-shadow-premium">
                <div className="flex items-center gap-2 text-white/90 truncate">
                  <Mail className="w-4 h-4 text-[#FFD54F] shrink-0" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#FFD54F] transition-colors truncate">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 bg-[#FFD54F] text-[#111111] border border-white hover:bg-white transition-colors shrink-0 cursor-pointer"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              </div>

              {/* Phone Chip */}
              <div className="p-3 bg-white/5 border-2 border-white/15 flex items-center gap-2 text-white/90 neo-shadow-premium">
                <Phone className="w-4 h-4 text-[#8BFFB0] shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>

              {/* Location Chip */}
              <div className="p-3 bg-white/5 border-2 border-white/15 flex items-center gap-2 text-white/90 neo-shadow-premium">
                <MapPin className="w-4 h-4 text-[#FF8A8A] shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-[#111111] border-2 border-white hover:bg-[#4F8EFF] hover:text-[#111111] transition-all neo-shadow-premium cursor-pointer"
                title="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-[#111111] border-2 border-white hover:bg-[#FFD54F] hover:text-[#111111] transition-all neo-shadow-premium cursor-pointer"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner Row: Massive Typography & Back To Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-2">
          <div className="font-mono text-xs font-bold text-white/60 text-center sm:text-left space-y-1">
            <p>© {new Date().getFullYear()} RUDRAKSHA C. JADHAV • ALL RIGHTS RESERVED</p>
            <p className="text-[10px] text-white/40">BUILT WITH NEXT.JS 16, TAILWIND CSS & THREE.JS</p>
          </div>

          {/* Magnetic Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="px-6 py-3 bg-[#FFD54F] text-[#111111] border-4 border-white font-display font-black text-xs uppercase neo-shadow-premium hover:bg-[#8BFFB0] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
