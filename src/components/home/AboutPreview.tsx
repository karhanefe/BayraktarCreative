'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export interface AboutPreviewProps {
  text?: string | null;
}

export function AboutPreview({ text }: AboutPreviewProps) {
  const { t } = useLanguage();
  const description = text || t.aboutPreview.desc;

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-bc-black text-bc-white border-t border-bc-white/10">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div>
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-10 uppercase tracking-tight">
              {t.aboutPreview.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              href="/about"
              className="inline-block text-xs font-mono tracking-[0.2em] uppercase border-b border-bc-white pb-1.5 hover:text-bc-white/60 hover:border-bc-white/60 transition-colors"
            >
              {t.aboutPreview.btn}
            </Link>
          </ScrollReveal>
        </div>

        <div className="flex flex-col justify-center">
          <ScrollReveal delay={0.1}>
            <p className="text-lg md:text-xl text-bc-white/80 leading-relaxed mb-12">
              {description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono tracking-widest text-bc-white/50 uppercase border-t border-bc-white/10 pt-8">
              {t.aboutPreview.services.map((s, idx) => (
                <div key={idx} className="py-2">
                  {s}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
