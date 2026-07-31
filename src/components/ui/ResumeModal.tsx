'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { useSoundFX } from '@/components/providers/SoundProvider';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { playClick, playHover } = useSoundFX();

  if (!isOpen) return null;

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
          className="w-full max-w-5xl h-[88vh] bg-white border-4 border-[#111111] neo-shadow-hard flex flex-col overflow-hidden text-[#111111] cursor-default"
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
                  OFFICIAL RESUME • VERIFIED PDF
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-3.5 py-1.5 bg-[#8BFFB0] text-[#111111] border-2 border-white font-mono text-xs font-black flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
                title="Open PDF in New Tab"
              >
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">OPEN NEW TAB</span>
              </a>

              <a
                href="/resume.pdf"
                download="Rudraksha_C_Jadhav_Resume.pdf"
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-3.5 py-1.5 bg-[#FFD54F] text-[#111111] border-2 border-white font-mono text-xs font-black flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">DOWNLOAD PDF</span>
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

          {/* Native PDF Object Viewer */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 bg-[#FFF9F0] p-2 sm:p-4 min-h-0"
          >
            <object
              data="/resume.pdf#toolbar=1&navpanes=0"
              type="application/pdf"
              className="w-full h-full border-4 border-[#111111] bg-white neo-shadow-hard"
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
                <p className="font-mono text-sm font-bold text-[#111111]">
                  Your browser does not support inline PDF viewing.
                </p>
                <a
                  href="/resume.pdf"
                  download="Rudraksha_C_Jadhav_Resume.pdf"
                  className="px-6 py-3 bg-[#FFD54F] text-[#111111] border-4 border-[#111111] font-display font-black text-sm neo-shadow-premium"
                >
                  DOWNLOAD RESUME PDF
                </a>
              </div>
            </object>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
