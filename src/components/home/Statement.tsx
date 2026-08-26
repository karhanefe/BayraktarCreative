'use client';

import React from 'react';
import { TextReveal } from '@/components/animation/TextReveal';
import { useLanguage } from '@/context/LanguageContext';

export interface StatementProps {
  text?: string | null;
}

export function Statement({ text }: StatementProps) {
  const { t } = useLanguage();
  const content = text || t.statement.text;

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-bc-black text-bc-white flex items-center justify-center min-h-[70vh] border-t border-bc-white/5">
      <div className="max-w-5xl mx-auto text-center">
        <TextReveal
          as="h2"
          text={content}
          className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-balance justify-center"
          stagger={0.08}
          scrub={true}
        />
      </div>
    </section>
  );
}
