'use client';

import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export interface ProjectGridProps {
  projects?: any[];
  categories?: any[];
}

export function ProjectGrid({ projects = [], categories: initialCategories = [] }: ProjectGridProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const { t, locale } = useLanguage();

  const categoryList = [
    { id: 'all', name: t.workPage.all, slug: 'all' },
    ...initialCategories.map((c) => ({
      id: c.id || c.slug,
      name:
        (t.categories as Record<string, string>)[c.slug] ||
        (locale === 'tr' ? c.name_tr : c.name_en) ||
        c.name_en ||
        c.name_tr ||
        c.name,
      slug: c.slug,
    })),
  ];

  const filtered =
    activeCategorySlug === 'all'
      ? projects
      : projects.filter((p) => {
          const pCatSlug = p.category?.slug || p.categories?.slug || (typeof p.category === 'string' ? p.category.toLowerCase() : '');
          const pCatId = p.category_id;
          return pCatSlug === activeCategorySlug || pCatId === activeCategorySlug;
        });

  return (
    <div className="py-8 min-h-screen text-bc-white">
      {/* Category filter pills */}
      <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 mb-12 border-b border-bc-white/10 no-scrollbar">
        {categoryList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategorySlug(cat.slug)}
            className={`text-xs uppercase tracking-[0.15em] font-mono whitespace-nowrap py-2 transition-all duration-300 cursor-pointer ${
              activeCategorySlug === cat.slug
                ? 'text-bc-white border-b-2 border-bc-white font-bold'
                : 'text-bc-white/40 hover:text-bc-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of projects with mixed aspect ratios */}
      {filtered.length === 0 ? (
        <div className="text-center py-32 text-bc-white/40 font-mono text-sm tracking-widest uppercase">
          {t.workPage.empty}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {filtered.map((proj, i) => (
            <ScrollReveal key={proj.id} delay={(i % 3) * 0.1} className="w-full">
              <ProjectCard project={proj} layout="default" className="w-full" />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
