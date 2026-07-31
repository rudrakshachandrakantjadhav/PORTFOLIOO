'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = [
    'INITIALIZING QUANTUM CORE...',
    'COMPILING DISASTERLINK & AI MODELS...',
    'FETCHING GEOSPATIAL TELEMETRY...',
    'PREPARING NEO-BRUTAL INTERFACE...',
    'SYSTEM READY',
  ];

  useEffect(() => {
    // Reset progress on mount to ensure smooth animation on every refresh
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
          }, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 8;
        return next > 100 ? 100 : next;
      });
    }, 80);

    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 380);

    return () => {
      clearInterval(timer);
      clearInterval(phraseTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 sm:p-16 bg-[#FFF9F0] text-[#111111] border-b-8 border-[#111111] select-none"
        >
          {/* Top Header Bar */}
          <div className="flex justify-between items-center font-mono text-xs sm:text-sm font-black tracking-widest uppercase">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-[#4F8EFF] border-2 border-[#111111] animate-ping" />
              <span>RUDRAKSHA JADHAV</span>
            </div>
            <div className="px-3.5 py-1.5 bg-[#FFD54F] border-2 border-[#111111] neo-shadow-premium">
              PORTFOLIO 2026
            </div>
          </div>

          {/* Center Brand Title & Progress */}
          <div className="max-w-4xl w-full mx-auto text-center space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#4F8EFF] uppercase tracking-widest block">
                {phrases[phraseIndex]}
              </span>
              <h1 className="text-huge font-display font-black text-[#111111] tracking-tighter leading-none">
                LOADING
              </h1>
            </div>

            {/* Neo-Brutal Progress Bar Container */}
            <div className="w-full max-w-2xl mx-auto border-4 border-[#111111] bg-white p-2 neo-shadow-hard">
              <div
                className="h-6 sm:h-8 bg-[#4F8EFF] border-2 border-[#111111] transition-all duration-150 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_75%,transparent_75%,transparent)] bg-[length:24px_24px] animate-[stripes_1s_linear_infinite]" />
              </div>
            </div>
          </div>

          {/* Bottom Counter & Status */}
          <div className="flex justify-between items-end font-mono">
            <div className="text-xs sm:text-sm font-bold opacity-70 uppercase tracking-widest">
              STATUS: INITIALIZING
            </div>
            <div className="text-5xl sm:text-7xl font-display font-black text-[#111111]">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
