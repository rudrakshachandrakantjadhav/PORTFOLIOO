'use client';

import React, { useState } from 'react';
import { CERTIFICATES } from '@/constants/portfolio';
import { CertificateItem } from '@/types';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { useSoundFX } from '@/components/providers/SoundProvider';
import { Award, ExternalLink, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, Sparkles, Filter } from 'lucide-react';

export function Credentials() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [filterIssuer, setFilterIssuer] = useState<string>('ALL');
  const { playClick, playHover } = useSoundFX();

  const issuers = ['ALL', 'GOOGLE', 'META', 'IBM', 'CIPS'];

  const filteredCerts = CERTIFICATES.filter((cert) => {
    if (filterIssuer === 'ALL') return true;
    if (filterIssuer === 'GOOGLE') return cert.issuer.toLowerCase().includes('google');
    if (filterIssuer === 'META') return cert.issuer.toLowerCase().includes('meta');
    if (filterIssuer === 'IBM') return cert.issuer.toLowerCase().includes('ibm');
    if (filterIssuer === 'CIPS') return cert.issuer.toLowerCase().includes('california') || cert.issuerBadge === 'CIPS';
    return true;
  });

  const getAccentStyles = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-[#4F8EFF]/15',
          border: 'border-[#4F8EFF]',
          stripe: 'bg-[#4F8EFF]',
          text: 'text-[#4F8EFF]',
          badge: 'bg-[#4F8EFF] text-[#111111]',
        };
      case 'yellow':
        return {
          bg: 'bg-[#FFD54F]/20',
          border: 'border-[#FFD54F]',
          stripe: 'bg-[#FFD54F]',
          text: 'text-[#111111]',
          badge: 'bg-[#FFD54F] text-[#111111]',
        };
      case 'coral':
        return {
          bg: 'bg-[#FF8A8A]/20',
          border: 'border-[#FF8A8A]',
          stripe: 'bg-[#FF8A8A]',
          text: 'text-[#111111]',
          badge: 'bg-[#FF8A8A] text-[#111111]',
        };
      case 'green':
        return {
          bg: 'bg-[#8BFFB0]/20',
          border: 'border-[#8BFFB0]',
          stripe: 'bg-[#8BFFB0]',
          text: 'text-[#111111]',
          badge: 'bg-[#8BFFB0] text-[#111111]',
        };
      default:
        return {
          bg: 'bg-[#C0AFFF]/20',
          border: 'border-[#C0AFFF]',
          stripe: 'bg-[#C0AFFF]',
          text: 'text-[#111111]',
          badge: 'bg-[#C0AFFF] text-[#111111]',
        };
    }
  };

  return (
    <section id="credentials" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <RevealOnScroll direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2 text-[#FFD54F] font-bold">
                Industry Certifications Locker
              </span>
              <h2 className="font-black text-4xl md:text-6xl font-display text-[#111111] text-huge">
                CREDENTIALS
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#111111] neo-shadow-premium">
              <ShieldCheck className="w-5 h-5 text-[#8BFFB0] stroke-[2.5]" />
              <span className="font-mono text-xs font-black text-[#111111] uppercase tracking-wider">
                100% Verified Credentials
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Filter Badges Bar */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 p-4 bg-white border-4 border-[#111111] neo-shadow-hard">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#111111] mr-2">
              <Filter className="w-4 h-4 stroke-[2.5]" />
              <span>FILTER ISSUER:</span>
            </div>
            {issuers.map((issuer) => {
              const count =
                issuer === 'ALL'
                  ? CERTIFICATES.length
                  : CERTIFICATES.filter((c) => {
                      if (issuer === 'GOOGLE') return c.issuer.toLowerCase().includes('google');
                      if (issuer === 'META') return c.issuer.toLowerCase().includes('meta');
                      if (issuer === 'IBM') return c.issuer.toLowerCase().includes('ibm');
                      if (issuer === 'CIPS') return c.issuer.toLowerCase().includes('california') || c.issuerBadge === 'CIPS';
                      return true;
                    }).length;

              const isSelected = filterIssuer === issuer;

              return (
                <button
                  key={issuer}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setFilterIssuer(issuer);
                  }}
                  className={`px-4 py-2 border-2 border-[#111111] font-mono text-xs font-black transition-all cursor-pointer neo-shadow-premium ${
                    isSelected
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#FFF9F0] text-[#111111] hover:bg-[#FFD54F]'
                  }`}
                >
                  {issuer} ({count})
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Professional Neo-Brutal Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCerts.map((cert, idx) => {
            const styles = getAccentStyles(cert.accentColor);
            const isExpanded = expandedCert === cert.id;

            return (
              <RevealOnScroll key={cert.id} direction="up" delay={idx * 0.08}>
                <div
                  className={`bg-white border-4 border-[#111111] neo-shadow-premium flex flex-col justify-between h-full relative overflow-hidden group transition-all duration-300 ${
                    idx % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'
                  }`}
                >
                  {/* Top Color Stripe */}
                  <div className={`h-3 w-full border-b-2 border-[#111111] ${styles.stripe}`} />

                  {/* Header Content */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Badge & Date Header */}
                      <div className="flex flex-wrap justify-between items-center gap-3">
                        <span className={`px-3 py-1 border-2 border-[#111111] font-mono text-xs font-black ${styles.badge}`}>
                          {cert.issuerBadge}
                        </span>

                        <span className="font-mono text-xs font-bold text-[#111111]/70">
                          {cert.date}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="font-display font-black text-2xl text-[#111111] leading-tight group-hover:text-[#4F8EFF] transition-colors">
                          {cert.title}
                        </h3>
                        {cert.subtitle && (
                          <p className="font-mono text-xs font-bold text-[#111111]/70 mt-1">
                            {cert.subtitle} • {cert.issuer}
                          </p>
                        )}
                      </div>

                      {/* Course Syllabus Dropdown List */}
                      {cert.courses && cert.courses.length > 0 && (
                        <div className="pt-2">
                          <button
                            onMouseEnter={playHover}
                            onClick={() => {
                              playClick();
                              setExpandedCert(isExpanded ? null : cert.id);
                            }}
                            className="flex items-center justify-between w-full p-3 bg-[#111111]/5 border-2 border-[#111111] font-mono text-xs font-bold text-[#111111] hover:bg-[#FFD54F]/30 transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-[#4F8EFF]" />
                              <span>View {cert.coursesCount} Specialization Courses</span>
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="p-4 mt-2 bg-[#FFF9F0] border-2 border-[#111111] space-y-2">
                              {cert.courses.map((course, i) => (
                                <div key={i} className="flex items-start gap-2.5 font-sans text-xs font-semibold text-[#111111]/90">
                                  <CheckCircle2 className="w-4 h-4 text-[#8BFFB0] shrink-0 mt-0.5 stroke-[2.5]" />
                                  <span>{course}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Registration Nos for CIPS */}
                      {cert.registrationNo && (
                        <div className="p-3 bg-[#111111]/5 border-2 border-[#111111] font-mono text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="font-bold opacity-60">REGISTRATION NO:</span>
                            <span className="font-black">{cert.registrationNo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold opacity-60">CERTIFICATE NO:</span>
                            <span className="font-black">{cert.certificateNo}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions / Verification Button */}
                    <div className="pt-4 border-t-2 border-[#111111]/10 flex items-center justify-between gap-4">
                      {cert.verifyUrl ? (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={playHover}
                          onClick={playClick}
                          className="w-full text-center px-5 py-3 bg-[#111111] text-white border-2 border-[#111111] font-display font-black text-xs hover:bg-[#4F8EFF] hover:text-[#111111] transition-all flex items-center justify-center gap-2 neo-shadow-premium"
                        >
                          <span>VERIFY CREDENTIAL</span>
                          <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                        </a>
                      ) : (
                        <div className="w-full text-center px-5 py-3 bg-[#8BFFB0] text-[#111111] border-2 border-[#111111] font-display font-black text-xs flex items-center justify-center gap-2 neo-shadow-premium">
                          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                          <span>INSTITUTE VERIFIED</span>
                        </div>
                      )}
                    </div>
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
