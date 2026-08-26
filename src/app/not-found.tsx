'use client';

import { Button } from '@/components/ui/Button';
import { TextReveal } from '@/components/animation/TextReveal';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-bc-black text-bc-white flex flex-col items-center justify-center p-6 text-center overflow-x-clip">
      <TextReveal
        as="h1"
        text={t.notFound.title}
        className="text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none font-display font-bold uppercase mb-4 opacity-10 justify-center"
      />

      <div className="relative z-10 -mt-20 md:-mt-32">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-5xl font-display font-bold uppercase mb-6 tracking-tight">
            {t.notFound.subtitle}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-bc-white/60 text-base md:text-lg mb-12 max-w-md mx-auto">
            {t.notFound.desc}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button href="/" variant="primary">
              {t.notFound.homeBtn}
            </Button>
            <Button href="/work" variant="outline">
              {t.notFound.workBtn}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
