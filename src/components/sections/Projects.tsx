'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/constants/portfolio';
import { Project } from '@/types';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { GithubIcon } from '@/components/ui/icons';
import { CodePlaygroundModal } from '@/components/ui/CodePlaygroundModal';
import { ArchitectureDiagramModal } from '@/components/ui/ArchitectureDiagramModal';
import { useSoundFX } from '@/components/providers/SoundProvider';
import { ArrowUpRight, Code2, X, Check, Image as ImageIcon, Layers } from 'lucide-react';
import Image from 'next/image';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCodeProjectId, setActiveCodeProjectId] = useState<string | null>(null);
  const [activeArchProjectId, setActiveArchProjectId] = useState<string | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const { playClick, playHover } = useSoundFX();

  const getAccentTagColor = (tag: string) => {
    switch (tag) {
      case 'AI':
        return 'bg-[#4F8EFF] text-[#111111]';
      case 'EMERGENCY':
      case 'SUSTAINABILITY':
      case 'NEXTJS':
      case 'FLUTTER':
        return 'bg-[#FFD54F] text-[#111111]';
      case 'SURVEILLANCE':
      case 'OPENCV':
      case 'GIS':
      case 'RIVERPOD':
        return 'bg-[#8BFFB0] text-[#111111]';
      case 'SOCKETIO':
      case 'ECOMMERCE':
        return 'bg-[#FF8A8A] text-[#111111]';
      default:
        return 'bg-[#C0AFFF] text-[#111111]';
    }
  };

  const getProjectTopStripe = (index: number) => {
    const stripes = ['bg-[#FF8A8A]', 'bg-[#4F8EFF]', 'bg-[#FFD54F]', 'bg-[#8BFFB0]'];
    return stripes[index % stripes.length];
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <RevealOnScroll direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2 text-[#4F8EFF] font-bold">
                Flagship AI, Mobile & Real-Time Applications
              </span>
              <h2 className="font-black text-4xl md:text-6xl font-display text-[#111111] text-huge">
                PROJECTS
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        {/* Neo-Brutal Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, idx) => (
            <RevealOnScroll key={project.id} direction="up" delay={idx * 0.1}>
              <article className="bg-white border-4 border-[#111111] flex flex-col neo-shadow-premium h-full group relative overflow-hidden">
                {/* Colorful Top Accent Stripe */}
                <div className={`h-2.5 w-full border-b-2 border-[#111111] ${getProjectTopStripe(idx)}`} />

                {/* Image container */}
                <div className="relative aspect-video bg-[#111111] border-b-4 border-[#111111] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-cover object-top group-hover:scale-105 transition-all duration-500"
                  />
                  {project.gallery && (
                    <div className="absolute top-3 right-3 bg-[#111111] text-white px-3 py-1 border-2 border-white font-mono text-xs font-black flex items-center gap-1.5 neo-shadow-premium z-10">
                      <ImageIcon className="w-3.5 h-3.5 text-[#FFD54F]" />
                      <span>{project.gallery.length} SCREENSHOTS</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 border-2 border-[#111111] text-xs font-mono font-bold ${getAccentTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display font-black text-2xl text-[#111111] group-hover:text-[#4F8EFF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm text-[#111111]/80 leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 flex flex-wrap items-center gap-3">
                    <button
                      onMouseEnter={playHover}
                      onClick={() => {
                        playClick();
                        setSelectedProject(project);
                        setActiveGalleryIndex(0);
                      }}
                      className="bg-[#111111] text-white px-4 py-2.5 font-display font-black text-xs border-2 border-[#111111] hover:bg-[#4F8EFF] hover:text-[#111111] transition-all flex items-center gap-2 neo-shadow-premium cursor-pointer"
                    >
                      <span>CASE STUDY & GALLERY</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                    </button>

                    <button
                      onMouseEnter={playHover}
                      onClick={() => {
                        playClick();
                        setActiveArchProjectId(project.slug);
                      }}
                      className="bg-[#8BFFB0] text-[#111111] px-3.5 py-2.5 font-display font-black text-xs border-2 border-[#111111] hover:bg-white transition-all flex items-center gap-1.5 neo-shadow-premium cursor-pointer"
                      title="View System Architecture Flow Diagram"
                    >
                      <Layers className="w-4 h-4 stroke-[2.5]" />
                      <span>ARCHITECTURE</span>
                    </button>

                    <button
                      onMouseEnter={playHover}
                      onClick={() => {
                        playClick();
                        setActiveCodeProjectId(project.slug);
                      }}
                      className="bg-[#FFD54F] text-[#111111] px-3.5 py-2.5 font-display font-black text-xs border-2 border-[#111111] hover:bg-white transition-all flex items-center gap-1.5 neo-shadow-premium cursor-pointer"
                      title="View Architecture Code Snippets"
                    >
                      <Code2 className="w-4 h-4 stroke-[2.5]" />
                      <span>CODE</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="p-2.5 border-2 border-[#111111] bg-white hover:bg-[#FFD54F] transition-colors neo-shadow-premium cursor-pointer"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Case Study & Gallery Modal */}
      {selectedProject && (
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-none p-6 sm:p-10 border-4 border-[#111111] bg-white neo-shadow-hard text-[#111111]">
            <div className="flex justify-between items-start mb-6 border-b-4 border-[#111111] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#4F8EFF] uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="font-display font-black text-3xl text-[#111111] mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setSelectedProject(null);
                }}
                className="p-2 border-2 border-[#111111] bg-[#FF8A8A] text-[#111111] hover:bg-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            {/* Gallery Screenshots Showcase */}
            {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
              <div className="mb-8 space-y-4">
                <div className="relative aspect-video sm:aspect-[16/10] bg-[#111111] border-4 border-[#111111] overflow-hidden neo-shadow-premium">
                  <Image
                    src={selectedProject.gallery[activeGalleryIndex]}
                    alt={`${selectedProject.title} Screenshot ${activeGalleryIndex + 1}`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>

                {/* Thumbnails row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {selectedProject.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveGalleryIndex(i)}
                      className={`relative w-20 h-28 border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                        activeGalleryIndex === i
                          ? 'border-[#4F8EFF] ring-4 ring-[#4F8EFF]/30 scale-105'
                          : 'border-[#111111] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="font-sans text-lg font-medium leading-relaxed mb-6">
              {selectedProject.fullDescription}
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              <h4 className="font-display font-black text-lg uppercase text-[#111111]">
                KEY ARCHITECTURE HIGHLIGHTS
              </h4>
              <div className="space-y-2">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#FFF9F0] border-2 border-[#111111]">
                    <Check className="w-5 h-5 text-[#8BFFB0] shrink-0 mt-0.5 stroke-[3]" />
                    <span className="font-sans text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3 mb-8">
              <h4 className="font-display font-black text-lg uppercase text-[#111111]">
                TECHS UTILIZED
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#111111] text-white border-2 border-[#111111] font-mono text-xs font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t-4 border-[#111111] flex flex-wrap gap-4">
              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  const slug = selectedProject.slug;
                  setSelectedProject(null);
                  setActiveArchProjectId(slug);
                }}
                className="px-6 py-3 bg-[#8BFFB0] text-[#111111] border-4 border-[#111111] font-display font-black text-sm neo-shadow-premium hover:bg-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-5 h-5 stroke-[2.5]" />
                <span>VIEW ARCHITECTURE DIAGRAM</span>
              </button>

              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  const slug = selectedProject.slug;
                  setSelectedProject(null);
                  setActiveCodeProjectId(slug);
                }}
                className="px-6 py-3 bg-[#FFD54F] text-[#111111] border-4 border-[#111111] font-display font-black text-sm neo-shadow-premium hover:bg-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <Code2 className="w-5 h-5 stroke-[2.5]" />
                <span>VIEW CODE PLAYGROUND</span>
              </button>

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="px-6 py-3 bg-[#111111] text-white border-4 border-[#111111] font-display font-black text-sm neo-shadow-premium hover:bg-[#4F8EFF] hover:text-[#111111] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span>VIEW GITHUB REPO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Visual Architecture Diagram Modal */}
      {activeArchProjectId && (
        <ArchitectureDiagramModal
          isOpen={!!activeArchProjectId}
          onClose={() => setActiveArchProjectId(null)}
          projectSlug={activeArchProjectId}
        />
      )}

      {/* Code Snippet Playground Modal */}
      {activeCodeProjectId && (
        <CodePlaygroundModal
          isOpen={!!activeCodeProjectId}
          onClose={() => setActiveCodeProjectId(null)}
          projectId={activeCodeProjectId}
        />
      )}
    </section>
  );
}
