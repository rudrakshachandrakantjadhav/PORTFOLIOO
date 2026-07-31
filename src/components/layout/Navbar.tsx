'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

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
          {/* Command Palette Hint */}
          <button
            onClick={() => {
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
            className="hidden sm:inline-block px-6 py-2 rounded-full font-display font-black text-xs bg-[#111111] text-white border-2 border-[#111111] hover:scale-105 active:scale-95 transition-transform"
          >
            HIRE ME
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border-2 border-[#111111] bg-white text-[#111111]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 p-6 bg-white border-4 border-[#111111] rounded-3xl neo-shadow-hard space-y-4 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-display font-extrabold text-lg text-[#111111] hover:text-[#4F8EFF] py-1"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 mt-4 rounded-full font-display font-black text-sm bg-[#111111] text-white border-2 border-[#111111]"
            >
              HIRE ME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
