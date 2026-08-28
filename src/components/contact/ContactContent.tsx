'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { TextReveal } from '@/components/animation/TextReveal';
import { useLanguage } from '@/context/LanguageContext';

export interface ContactContentProps {
  settings?: {
    email?: string | null;
    phone?: string | null;
    instagram?: string | null;
    whatsapp?: string | null;
    contact_text?: string | null;
  };
}

export function ContactContent({ settings }: ContactContentProps) {
  const { t } = useLanguage();

  const email = settings?.email || 'hello@bayraktarcreative.com';
  const phone = settings?.phone || '+90 (212) 000 00 00';
  const instagram = settings?.instagram || 'https://instagram.com/bayraktarcreative';
  const whatsapp = settings?.whatsapp || '+90 500 000 00 00';

  const contacts = [
    { label: t.contactPage.email, value: email, href: `mailto:${email}` },
    { label: t.contactPage.phone, value: phone, href: `tel:${phone?.replace(/\D/g, '')}` },
    { label: t.contactPage.instagram, value: '@bayraktarcreative', href: instagram },
    { label: t.contactPage.whatsapp, value: 'Direct Message', href: `https://wa.me/${whatsapp?.replace(/\D/g, '')}` },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-[1800px] mx-auto w-full">
      <div className="mb-20 md:mb-28">
        <TextReveal
          as="h1"
          text={t.contactPage.title}
          className="text-4xl md:text-7xl lg:text-[6.5rem] leading-[0.95] font-display font-bold uppercase tracking-tighter max-w-5xl"
        />
        {settings?.contact_text && (
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-bc-white/65 md:text-2xl">
            {settings.contact_text}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-start">
        <ScrollReveal>
          <div className="flex flex-col gap-12">
            {contacts.map((contact) => (
              <div key={contact.label} className="group border-b border-bc-white/10 pb-6">
                <h3 className="text-xs uppercase tracking-[0.25em] font-mono text-bc-white/40 mb-2">
                  {contact.label}
                </h3>
                <Link
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-2xl md:text-4xl font-display uppercase font-bold text-bc-white hover:text-bc-white/60 transition-colors"
                >
                  {contact.value}
                </Link>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-bc-white/5 border border-bc-white/10 p-8 md:p-14 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase font-mono tracking-[0.25em] text-bc-white/50 mb-4">
                {t.contactPage.hq}
              </h3>
              <p className="text-bc-white/80 text-xl leading-relaxed whitespace-pre-line">
                {t.contactPage.hqText}
              </p>
            </div>
            <div className="mt-16 border-t border-bc-white/10 pt-6">
              <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-bc-white/40 mb-1">
                {t.contactPage.hours}
              </h4>
              <p className="text-xs text-bc-white/60 uppercase font-mono tracking-widest leading-relaxed">
                {t.contactPage.hoursText}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
