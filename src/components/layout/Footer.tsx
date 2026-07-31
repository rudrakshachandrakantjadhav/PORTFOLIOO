'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/constants/portfolio';

export function Footer() {
  return (
    <footer className="w-full mt-32 border-t-8 border-[#111111] bg-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <div className="font-display font-black text-3xl md:text-4xl tracking-tighter text-[#111111]">
            {PERSONAL_INFO.name}
          </div>
          <p className="font-mono text-xs opacity-60 italic text-[#111111]">
            © {new Date().getFullYear()} DESIGNED FOR IMPACT.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-8 font-display font-black text-lg sm:text-xl">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] hover:text-[#4F8EFF] transition-colors underline decoration-4 underline-offset-4"
          >
            GITHUB
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] hover:text-[#8BFFB0] transition-colors underline decoration-4 underline-offset-4"
          >
            LINKEDIN
          </a>
          <a
            href={PERSONAL_INFO.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] hover:text-[#FF8A8A] transition-colors underline decoration-4 underline-offset-4"
          >
            TWITTER
          </a>
        </div>
      </div>
    </footer>
  );
}
