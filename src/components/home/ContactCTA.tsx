'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export function ContactCTA({ email, contactText }: { email?: string; contactText?: string }) {
  const { t } = useLanguage();

  return (
    <section className="py-40 md:py-48 px-6 bg-bc-white text-bc-black text-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-8xl font-bold tracking-tighter max-w-4xl mx-auto mb-12 leading-[1.1] uppercase">
            {contactText || t.contactCTA.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center bg-bc-black text-bc-white px-10 py-5 text-sm md:text-base font-mono uppercase tracking-widest hover:scale-105 transition-transform duration-300"
          >
            {t.contactCTA.btn}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="mt-8">
          <a
            href={`mailto:${email || t.contactCTA.email}`}
            className="text-xs md:text-sm font-mono tracking-widest text-bc-black/60 hover:text-bc-black transition-colors"
          >
            {(email || t.contactCTA.email).toUpperCase()}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
