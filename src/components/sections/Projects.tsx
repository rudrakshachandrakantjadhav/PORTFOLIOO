'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/constants/portfolio';
import { Project } from '@/types';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { GithubIcon } from '@/components/ui/icons';
import { ExternalLink, ArrowUpRight, X, Check } from 'lucide-react';
import Image from 'next/image';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getAccentTagColor = (tag: string) => {
    switch (tag) {
      case 'AI':
        return 'bg-[#4F8EFF] text-[#111111]';
      case 'EMERGENCY':
      case 'SUSTAINABILITY':
      case 'NEXTJS':
        return 'bg-[#FFD54F] text-[#111111]';
      case 'SURVEILLANCE':
      case 'OPENCV':
      case 'GIS':
        return 'bg-[#8BFFB0] text-[#111111]';
      case 'SOCKETIO':
        return 'bg-[#FF8A8A] text-[#111111]';
      default:
        return 'bg-[#C0AFFF] text-[#111111]';
    }
  };

  const getProjectTopStripe = (index: number) => {
    const stripes = ['bg-[#FF8A8A]', 'bg-[#4F8EFF]', 'bg-[#FFD54F]'];
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
                Flagship AI & Real-Time Applications
              </span>
              <h2 className="font-black text-4xl md:text-6xl font-display text-[#111111] text-huge">
                PROJECTS
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        {/* Neo-Brutal Project Grid (3 Flagship Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, idx) => (
            <RevealOnScroll key={project.id} direction="up" delay={idx * 0.1}>
              <article className="bg-white border-4 border-[#111111] flex flex-col neo-shadow-premium h-full group relative overflow-hidden">
                {/* Colorful Top Accent Stripe */}
                <div className={`h-2.5 w-full border-b-2 border-[#111111] ${getProjectTopStripe(idx)}`} />

                {/* Image container */}
                <div className="relative aspect-video bg-[#4F8EFF]/10 border-b-4 border-[#111111] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
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

                  <div className="pt-6 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-[#111111] text-white px-5 py-2.5 font-display font-black text-xs border-2 border-[#111111] hover:bg-[#4F8EFF] hover:text-[#111111] transition-all flex items-center gap-2 neo-shadow-premium"
                    >
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border-2 border-[#111111] bg-white hover:bg-[#FFD54F] transition-colors neo-shadow-premium"
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

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 border-4 border-[#111111] bg-white neo-shadow-hard text-[#111111]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-mono text-xs font-bold text-[#4F8EFF] uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="font-display font-black text-3xl text-[#111111] mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full border-2 border-[#111111] hover:bg-[#FF8A8A] transition-colors"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            <div className="space-y-6">
              <p className="font-sans text-base leading-relaxed text-[#111111]/90 font-medium">
                {selectedProject.fullDescription}
              </p>

              <div>
                <h4 className="font-mono text-xs font-black uppercase mb-3 text-[#111111]/70">
                  Key Technical Highlights & Stack
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-sans font-medium">
                      <Check className="w-4 h-4 text-[#4F8EFF] shrink-0 mt-0.5 stroke-[3]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-[#111111]/5 border-2 border-[#111111] font-mono text-xs font-bold text-[#111111]">
                    {tech}
                  </span>
                ))}
              </div>

              {selectedProject.metrics && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t-2 border-[#111111]/10">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label} className="text-center p-3 border-2 border-[#111111] bg-[#FFD54F]/20 neo-shadow-premium">
                      <div className="font-display font-black text-lg text-[#111111]">{m.value}</div>
                      <div className="font-mono text-[10px] font-bold text-[#111111]/70 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 flex gap-4">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    className="px-6 py-3 bg-[#111111] text-white border-2 border-[#111111] font-display font-black text-sm hover:bg-[#4F8EFF] hover:text-[#111111] transition-colors flex items-center gap-2 neo-shadow-premium"
                  >
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                    <span>Live Demo</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    className="px-6 py-3 bg-white text-[#111111] border-2 border-[#111111] font-display font-black text-sm hover:bg-[#FFD54F] transition-colors flex items-center gap-2 neo-shadow-premium"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
