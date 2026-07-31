'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, FileText } from 'lucide-react';
import Image from 'next/image';
import { useSoundFX } from '@/components/providers/SoundProvider';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { playClick, playHover } = useSoundFX();

  if (!isOpen) return null;

  const handlePrint = () => {
    playClick();
    const printWindow = window.open('/resume_preview.png', '_blank');
    if (printWindow) {
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            playClick();
            onClose();
          }
        }}
        className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] bg-white border-4 border-[#111111] neo-shadow-hard flex flex-col overflow-hidden text-[#111111] cursor-default"
        >
          {/* Header Bar */}
          <div className="bg-[#111111] text-white p-4 sm:p-5 border-b-4 border-[#111111] flex flex-wrap justify-between items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FFD54F] text-[#111111] border-2 border-white">
                <FileText className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display font-black text-sm sm:text-base tracking-wider uppercase text-white">
                  RUDRAKSHA_JADHAV_RESUME.PDF
                </h3>
                <span className="font-mono text-[10px] text-[#8BFFB0] font-bold block">
                  OFFICIAL RESUME • VERIFIED
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onMouseEnter={playHover}
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-[#8BFFB0] text-[#111111] border-2 border-white font-mono text-xs font-black flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
                title="Print Resume"
              >
                <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">PRINT</span>
              </button>

              <a
                href="/resume_preview.png"
                download="Rudraksha_Jadhav_Resume.png"
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-3.5 py-1.5 bg-[#FFD54F] text-[#111111] border-2 border-white font-mono text-xs font-black flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
                title="Download Resume"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">DOWNLOAD</span>
              </a>

              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1.5 bg-[#FF8A8A] text-[#111111] border-2 border-white hover:bg-white transition-colors cursor-pointer"
                title="Close (ESC)"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Resume Document Viewer */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FFF9F0] flex justify-center items-start min-h-0"
          >
            <div className="w-full max-w-3xl border-4 border-[#111111] bg-white neo-shadow-hard p-2 sm:p-4">
              <Image
                src="/resume_preview.png"
                alt="Rudraksha C. Jadhav Official Resume"
                width={1200}
                height={1600}
                priority
                className="w-full h-auto object-contain border-2 border-[#111111]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
