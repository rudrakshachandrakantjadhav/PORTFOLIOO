'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/constants/portfolio';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

export function Skills() {
  const getCategoryStyles = (color: string) => {
    switch (color) {
      case 'blue':
        return { title: 'text-[#4F8EFF]', bg: 'bg-[#4F8EFF]/10', border: 'border-[#4F8EFF]', stripe: 'bg-[#4F8EFF]' };
      case 'green':
        return { title: 'text-[#8BFFB0]', bg: 'bg-[#8BFFB0]/15', border: 'border-[#8BFFB0]', stripe: 'bg-[#8BFFB0]' };
      case 'coral':
        return { title: 'text-[#FF8A8A]', bg: 'bg-[#FF8A8A]/15', border: 'border-[#FF8A8A]', stripe: 'bg-[#FF8A8A]' };
      case 'yellow':
        return { title: 'text-[#FFD54F]', bg: 'bg-[#FFD54F]/20', border: 'border-[#FFD54F]', stripe: 'bg-[#FFD54F]' };
      default:
        return { title: 'text-[#4F8EFF]', bg: 'bg-[#4F8EFF]/10', border: 'border-[#4F8EFF]', stripe: 'bg-[#4F8EFF]' };
    }
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="mb-16 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest block text-[#4F8EFF] font-bold text-right">
              Capabilities & Tools
            </span>
            <h2 className="font-black text-4xl md:text-6xl font-display text-[#111111] text-huge text-right">
              SKILLS
            </h2>
          </div>
        </RevealOnScroll>

        {/* Neo-Brutal 4-Column Arsenal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => {
            const styles = getCategoryStyles(category.accentColor);
            return (
              <RevealOnScroll key={category.title} direction="up" delay={idx * 0.1}>
                <div
                  className={`bg-white border-4 border-[#111111] p-8 neo-shadow-hard transform transition-transform duration-300 relative overflow-hidden ${
                    idx % 2 === 0 ? 'hover:-rotate-2' : 'hover:rotate-2'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-full h-2.5 ${styles.stripe}`} />

                  <h3 className={`font-display font-black text-2xl mb-6 ${styles.title}`}>
                    {category.title}
                  </h3>

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`${styles.bg} border-2 border-[#111111] px-3 py-1 font-mono text-xs font-bold text-[#111111]`}
                      >
                        {skill.name}
                      </span>
                    ))}
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
