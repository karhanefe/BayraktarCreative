'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { useLanguage } from '@/context/LanguageContext';

export interface FeaturedWorkProps {
  projects?: any[];
}

export function FeaturedWork({ projects = [] }: FeaturedWorkProps) {
  const { t } = useLanguage();

  if (!projects || projects.length === 0) return null;

  const items = projects.slice(0, 4);

  return (
    <section className="py-24 md:py-36 bg-bc-black px-6 md:px-12 text-bc-white border-t border-bc-white/5">
      <div className="max-w-[1800px] mx-auto">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center justify-between mb-16 md:mb-20">
            <h2 className="text-xs md:text-sm font-mono tracking-[0.25em] text-bc-white/50 uppercase">
              {t.featuredWork.title}
            </h2>
            <span className="text-xs font-mono tracking-widest text-bc-white/40">
              01 — {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </ScrollReveal>

        {/* Asymmetric layout highlighting mixed aspect ratios */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {items[0] && (
            <div className="md:col-span-8 min-h-[400px] md:min-h-[600px]">
              <ProjectCard project={items[0]} layout="featured" className="h-full" />
            </div>
          )}
          {items[1] && (
            <div className="md:col-span-4 min-h-[400px] md:min-h-[600px]">
              <ProjectCard project={items[1]} layout="featured" className="h-full" />
            </div>
          )}
          {items[2] && (
            <div className="md:col-span-6 min-h-[350px] md:min-h-[500px]">
              <ProjectCard project={items[2]} layout="featured" className="h-full" />
            </div>
          )}
          {items[3] && (
            <div className="md:col-span-6 min-h-[350px] md:min-h-[500px]">
              <ProjectCard project={items[3]} layout="featured" className="h-full" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
