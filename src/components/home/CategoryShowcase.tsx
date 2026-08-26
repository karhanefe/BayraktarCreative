'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export interface CategoryShowcaseProps {
  categories?: any[];
}

export function CategoryShowcase({ categories: passedCategories }: CategoryShowcaseProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useLanguage();

  const fallback = [
    { id: 'commercial', name: t.categories['commercial'], slug: 'commercial' },
    { id: 'real-estate', name: t.categories['real-estate'], slug: 'real-estate' },
    { id: 'automotive', name: t.categories['automotive'], slug: 'automotive' },
    { id: 'drone', name: t.categories['drone'], slug: 'drone' },
  ];

  const list = passedCategories && passedCategories.length > 0 ? passedCategories : fallback;

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-bc-black text-bc-white border-t border-bc-white/5">
      <div className="max-w-[1800px] mx-auto">
        <ScrollReveal>
          <h2 className="text-xs md:text-sm font-mono tracking-[0.25em] text-bc-white/50 uppercase mb-12">
            {t.categories.title}
          </h2>
        </ScrollReveal>

        <div className="flex flex-col group/list border-t border-bc-white/10">
          {list.map((cat, idx) => {
            const localizedName = (t.categories as Record<string, string>)[cat.slug] || cat.name;
            return (
              <ScrollReveal key={cat.id || idx} delay={idx * 0.08}>
                <Link
                  href={`/work?category=${cat.slug}`}
                  className={cn(
                    'block border-b border-bc-white/10 py-8 md:py-14 transition-all duration-500',
                    hovered === cat.id ? 'opacity-100 pl-4 md:pl-8' : hovered ? 'opacity-30' : 'opacity-100'
                  )}
                  onMouseEnter={() => setHovered(cat.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase">
                      {localizedName}
                    </h3>
                    <span className="text-xs md:text-sm font-mono tracking-widest text-bc-white/40 group-hover:text-bc-white transition-colors">
                      {t.categories.explore}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
