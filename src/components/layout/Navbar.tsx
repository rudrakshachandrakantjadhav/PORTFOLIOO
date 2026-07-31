'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Command, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundFX } from '@/components/providers/SoundProvider';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { soundEnabled, toggleSound, playHover, playClick, playPalette } = useSoundFX();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Work', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Journey', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-5xl">
      <nav className="px-6 md:px-8 py-3.5 flex justify-between items-center bg-white border-4 border-[#111111] rounded-full neo-shadow-hard">
        {/* Brand Logo */}
        <a
          href="#hero"
          onMouseEnter={playHover}
          onClick={playClick}
          className="font-display font-extrabold text-xl tracking-tighter text-[#111111]"
        >
          RJ.
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onMouseEnter={playHover}
                onClick={playClick}
                className={`font-display font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-[#4F8EFF] underline underline-offset-4 decoration-4'
                    : 'text-[#111111] hover:text-[#4F8EFF]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Sound Effects Mute/Unmute Toggle */}
          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              toggleSound();
            }}
            className={`p-2 rounded-full border-2 border-[#111111] font-mono text-xs font-bold transition-all cursor-pointer ${
              soundEnabled ? 'bg-[#8BFFB0] text-[#111111]' : 'bg-[#FF8A8A]/30 text-[#111111]/60'
            }`}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <VolumeX className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>

          {/* Command Palette Hint */}
          <button
            onMouseEnter={playHover}
            onClick={() => {
              playPalette();
              const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
              window.dispatchEvent(event);
            }}
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-mono font-bold bg-[#111111]/5 border-2 border-[#111111] text-[#111111] hover:bg-[#FFD54F] transition-all cursor-pointer"
            title="Open Command Palette (Ctrl + K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span>K</span>
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onMouseEnter={playHover}
            onClick={playClick}
            className="hidden sm:inline-block px-6 py-2 rounded-full font-display font-black text-xs bg-[#111111] text-white border-2 border-[#111111] hover:scale-105 active:scale-95 transition-transform"
          >
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-[#111111]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 p-6 bg-white border-4 border-[#111111] rounded-3xl neo-shadow-hard flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className="font-display font-black text-lg text-[#111111] py-2 border-b-2 border-[#111111]/10 flex justify-between items-center"
              >
                <span>{link.name}</span>
                <span className="font-mono text-xs opacity-50">→</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
