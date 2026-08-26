'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { TextReveal } from '@/components/animation/TextReveal';
import { Parallax } from '@/components/animation/Parallax';
import { useLanguage } from '@/context/LanguageContext';

export interface AboutContentProps {
  customAboutText?: string | null;
}

export function AboutContent({ customAboutText }: AboutContentProps) {
  const { t } = useLanguage();
  const philosophyText = customAboutText || t.aboutPage.philosophyText;

  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-[1800px] mx-auto">
      {/* Header */}
      <section className="min-h-[60vh] flex flex-col justify-center mb-24">
        <TextReveal
          as="h1"
          text={t.aboutPage.title}
          className="text-4xl md:text-7xl lg:text-[6.5rem] leading-[0.95] font-display font-bold uppercase tracking-tighter max-w-6xl"
        />
      </section>

      {/* Image & Text Split */}
      <section className="flex flex-col md:flex-row gap-12 md:gap-24 mb-32 items-center">
        <div className="w-full md:w-5/12 aspect-[4/5] relative overflow-hidden bg-bc-white/5 border border-bc-white/10">
          <Parallax speed={-0.1}>
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1080&q=80"
              alt="Cinema Production Equipment"
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </Parallax>
        </div>
        <div className="w-full md:w-7/12">
          <ScrollReveal>
            <h2 className="text-xs uppercase tracking-[0.25em] font-mono text-bc-white/50 mb-8">
              {t.aboutPage.philosophy}
            </h2>
            <div className="text-xl md:text-3xl lg:text-4xl leading-snug font-normal text-bc-white/90">
              {philosophyText}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 border-t border-bc-white/10">
        <ScrollReveal>
          <h2 className="text-xs uppercase tracking-[0.25em] font-mono text-bc-white/50 mb-16">
            {t.aboutPage.expertise}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {t.aboutPage.servicesList.map((service, index) => (
            <ScrollReveal key={service} delay={index * 0.08}>
              <div className="group border-b border-bc-white/10 pb-8">
                <div className="text-2xl md:text-4xl font-display font-bold uppercase text-bc-white/70 group-hover:text-bc-white transition-colors duration-500">
                  {service}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
