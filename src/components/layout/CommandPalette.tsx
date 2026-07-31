'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { PERSONAL_INFO, PROJECTS } from '@/constants/portfolio';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import {
  User,
  FolderGit2,
  Cpu,
  History,
  Mail,
  FileText,
  X,
} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border-4 bg-white border-[#111111] neo-shadow-hard text-[#111111] cursor-default"
      >
        <Command label="Global Command Menu" onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false);
          }
        }}>
          <div className="flex items-center px-4 border-b-4 border-[#111111] justify-between">
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="w-full py-4 font-sans font-bold text-sm bg-transparent outline-none placeholder:text-[#111111]/40"
            />

            <button
              onClick={() => setOpen(false)}
              className="px-2.5 py-1 text-xs font-mono font-black rounded border-2 border-[#111111] bg-[#FFD54F] hover:bg-[#FF8A8A] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              title="Close (ESC)"
            >
              <span>ESC</span>
              <X className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-center font-mono text-sm opacity-70 font-bold">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1.5 font-mono text-xs font-black uppercase text-[#4F8EFF]">
              <Command.Item
                onSelect={() => runCommand(() => (window.location.href = '#about'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#FFD54F] font-display font-bold text-sm"
              >
                <User className="w-4 h-4 stroke-[3]" />
                <span>Go to About</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => (window.location.href = '#projects'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#8BFFB0] font-display font-bold text-sm"
              >
                <FolderGit2 className="w-4 h-4 stroke-[3]" />
                <span>Go to Projects</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => (window.location.href = '#skills'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#FF8A8A] font-display font-bold text-sm"
              >
                <Cpu className="w-4 h-4 stroke-[3]" />
                <span>Go to Skills Arsenal</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => (window.location.href = '#experience'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#C0AFFF] font-display font-bold text-sm"
              >
                <History className="w-4 h-4 stroke-[3]" />
                <span>Go to Journey & Experience</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => (window.location.href = '#contact'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#4F8EFF] font-display font-bold text-sm"
              >
                <Mail className="w-4 h-4 stroke-[3]" />
                <span>Go to Contact</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Projects" className="px-2 py-1.5 font-mono text-xs font-black uppercase text-[#FF8A8A]">
              {PROJECTS.map((project) => (
                <Command.Item
                  key={project.id}
                  onSelect={() => runCommand(() => (window.location.href = `#projects`))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#FFD54F] font-display font-bold text-sm"
                >
                  <FolderGit2 className="w-4 h-4 text-[#111111]" />
                  <span>{project.title}</span>
                  <span className="ml-auto text-xs font-mono font-bold px-2 py-0.5 border border-[#111111] bg-white">
                    {project.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className="px-2 py-1.5 font-mono text-xs font-black uppercase text-[#8BFFB0]">
              <Command.Item
                onSelect={() => runCommand(() => window.open('/resume.pdf', '_blank'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#FFD54F] font-display font-bold text-sm"
              >
                <FileText className="w-4 h-4 stroke-[3]" />
                <span>Download Resume (PDF)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open(PERSONAL_INFO.github, '_blank'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#4F8EFF] font-display font-bold text-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Open GitHub Profile</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open(PERSONAL_INFO.linkedin, '_blank'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#8BFFB0] font-display font-bold text-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>Open LinkedIn Profile</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
