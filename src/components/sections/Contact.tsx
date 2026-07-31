'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/constants/portfolio';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Official Formspree Endpoint ID
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xnjbjbgw';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setStatus('idle');

    try {
      // 1. Primary submission to Formspree
      const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      if (formspreeRes.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        // Fallback to internal API route if Formspree returns an error
        const fallbackRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (fallbackRes.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } else {
          setStatus('error');
        }
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="bg-[#111111] text-white p-8 sm:p-16 md:p-20 neo-shadow-hard space-y-12 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 border-8 border-[#4F8EFF]/20 rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 border-8 border-[#FFD54F]/20 rounded-full pointer-events-none" />

            <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
              <h2 className="text-huge text-4xl sm:text-6xl md:text-8xl font-display font-black text-white">
                LET'S BUILD
              </h2>
              <p className="font-sans text-xl opacity-80 leading-relaxed font-normal">
                I'm currently looking for new opportunities and collaborations. Send me a message powered by Formspree!
              </p>
            </div>

            {/* Formspree Integrated Contact Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-2 text-[#FFD54F]">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-5 py-4 bg-white text-[#111111] border-4 border-[#111111] font-sans font-bold placeholder:text-[#111111]/40 focus:bg-white focus:border-[#FFD54F] outline-none transition-all neo-shadow-premium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-2 text-[#8BFFB0]">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-5 py-4 bg-white text-[#111111] border-4 border-[#111111] font-sans font-bold placeholder:text-[#111111]/40 focus:bg-white focus:border-[#8BFFB0] outline-none transition-all neo-shadow-premium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-2 text-[#FF8A8A]">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-5 py-4 bg-white text-[#111111] border-4 border-[#111111] font-sans font-bold placeholder:text-[#111111]/40 focus:bg-white focus:border-[#FF8A8A] outline-none transition-all neo-shadow-premium"
                />
              </div>

              {status === 'success' && (
                <div className="p-4 bg-[#8BFFB0] text-[#111111] border-4 border-[#111111] font-mono text-sm font-bold flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  <span>Message sent via Formspree! I will get back to you soon.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-[#FF8A8A] text-[#111111] border-4 border-[#111111] font-mono text-sm font-bold flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                  <span>Failed to send message. Please try emailing {PERSONAL_INFO.email} directly!</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#FFD54F] text-[#111111] border-4 border-[#111111] px-10 py-5 font-display font-black text-xl neo-shadow-premium hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{loading ? 'SENDING...' : 'SAY HELLO'}</span>
                    <Send className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </MagneticButton>

                <div className="flex gap-4">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-4 border-[#111111] bg-white text-[#111111] hover:bg-[#4F8EFF] hover:text-[#111111] transition-all neo-shadow-premium"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-6 h-6" />
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-4 border-[#111111] bg-white text-[#111111] hover:bg-[#FFD54F] hover:text-[#111111] transition-all neo-shadow-premium"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
