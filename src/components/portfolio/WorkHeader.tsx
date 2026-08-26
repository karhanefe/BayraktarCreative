'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export function WorkHeader() {
  const { t } = useLanguage();

  return (
    <ScrollReveal>
      <header className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold uppercase tracking-tight text-bc-white mb-6">
          {t.workPage.title}
        </h1>
        <p className="text-lg md:text-xl text-bc-white/70 max-w-2xl">
          {t.workPage.desc}
        </p>
      </header>
    </ScrollReveal>
  );
}
