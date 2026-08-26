'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { useLanguage } from '@/context/LanguageContext';

export interface HorizontalPortfolioProps {
  projects?: any[];
}

export function HorizontalPortfolio({ projects = [] }: HorizontalPortfolioProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  if (!projects || projects.length === 0) return null;

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as Record<string, boolean>;

          if (isDesktop && !reduceMotion && trackRef.current && containerRef.current) {
            const getDistance = () => {
              if (!trackRef.current) return 0;
              return Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 120);
            };

            gsap.to(trackRef.current, {
              x: () => -getDistance(),
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                start: 'top top',
                end: () => `+=${getDistance()}`,
              },
            });
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-bc-black text-bc-white overflow-x-clip flex flex-col justify-center relative py-16 md:py-24 border-t border-bc-white/5"
    >
      <div className="px-6 md:px-12 mb-8 md:mb-12 max-w-[1800px] w-full mx-auto flex items-center justify-between">
        <h2 className="text-xs md:text-sm font-mono tracking-[0.25em] text-bc-white/50 uppercase">
          {t.horizontal.title}
        </h2>
        <span className="text-xs font-mono tracking-widest text-bc-white/40 hidden md:block">
          {t.horizontal.scrollNav}
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex gap-8 md:gap-12 px-6 md:px-12 h-[60vh] md:h-[65vh] w-max overflow-x-auto lg:overflow-visible snap-x lg:snap-none no-scrollbar will-change-transform items-stretch"
      >
        {projects.map((proj) => (
          <div key={proj.id} className="h-full flex-shrink-0 snap-center w-[85vw] sm:w-[60vw] md:w-[450px] lg:w-auto">
            <ProjectCard project={proj} layout="featured" className="h-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
