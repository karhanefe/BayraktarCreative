'use client';

import React from 'react';
import Link from 'next/link';
import { AdaptiveMedia } from '@/components/media/AdaptiveMedia';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { Parallax } from '@/components/animation/Parallax';
import { useLanguage } from '@/context/LanguageContext';

export interface ProjectDetailContentProps {
  project: any;
  related: any[];
}

export function ProjectDetailContent({ project, related }: ProjectDetailContentProps) {
  const { t } = useLanguage();

  const media: any[] = project.media || [];
  const coverMedia = media.find((m: any) => m.is_hero || m.is_cover) || media[0];
  const isLandscape = !coverMedia || (coverMedia.width && coverMedia.height ? coverMedia.width >= coverMedia.height : true);

  const categoryName =
    (project.category?.slug && (t.categories as Record<string, string>)[project.category.slug]) ||
    project.category?.name_en ||
    project.category?.name_tr ||
    (project.category as any)?.name ||
    t.projectDetail.category;

  return (
    <>
      {/* Hero Section */}
      <section className={`relative w-full ${isLandscape ? 'min-h-[80vh] md:min-h-screen flex items-end' : 'pt-36 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto'}`}>
        {isLandscape ? (
          <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
            {coverMedia?.url && (
              <div className="absolute inset-0">
                <Parallax speed={-0.15}>
                  <AdaptiveMedia
                    item={coverMedia}
                    context="hero"
                    priority
                    className="w-full h-full object-cover brightness-75"
                  />
                </Parallax>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bc-black via-bc-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-[1800px] mx-auto">
              <ScrollReveal>
                <span className="text-xs font-mono tracking-[0.25em] text-bc-white/60 uppercase block mb-4">
                  {categoryName}
                </span>
                <h1 className="text-4xl md:text-7xl lg:text-9xl font-display font-bold uppercase tracking-tight">
                  {project.title}
                </h1>
              </ScrollReveal>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-mono tracking-[0.25em] text-bc-white/60 uppercase block mb-4">
                  {categoryName}
                </span>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight mb-8">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="text-lg md:text-xl text-bc-white/80 leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                )}
              </ScrollReveal>
            </div>
            <div className="md:col-span-6 max-w-[550px] mx-auto w-full">
              {coverMedia && (
                <Parallax speed={-0.08}>
                  <div className="overflow-hidden border border-bc-white/10">
                    <AdaptiveMedia
                      item={coverMedia}
                      context="featured"
                      priority
                      className="w-full h-auto"
                    />
                  </div>
                </Parallax>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Project Meta Information */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-bc-white/10 pt-10">
            <div>
              <h3 className="text-bc-white/40 text-xs font-mono tracking-[0.2em] uppercase mb-2">
                {t.projectDetail.client}
              </h3>
              <p className="font-semibold text-lg">{project.client || t.projectDetail.commission}</p>
            </div>
            <div>
              <h3 className="text-bc-white/40 text-xs font-mono tracking-[0.2em] uppercase mb-2">
                {t.projectDetail.location}
              </h3>
              <p className="font-semibold text-lg">{project.location || 'Istanbul, Turkey'}</p>
            </div>
            <div>
              <h3 className="text-bc-white/40 text-xs font-mono tracking-[0.2em] uppercase mb-2">
                {t.projectDetail.category}
              </h3>
              <p className="font-semibold text-lg">{categoryName}</p>
            </div>
            <div>
              <h3 className="text-bc-white/40 text-xs font-mono tracking-[0.2em] uppercase mb-2">
                {t.projectDetail.timeline}
              </h3>
              <p className="font-semibold text-lg">{project.project_date || '2024'}</p>
            </div>
          </div>
        </ScrollReveal>

        {isLandscape && project.description && (
          <ScrollReveal>
            <div className="mt-16 md:mt-24 max-w-3xl text-xl md:text-2xl leading-relaxed text-bc-white/90">
              {project.description}
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* Media Gallery with Mixed Aspect Ratio Rhythm */}
      {media.length > 0 && (
        <section className="px-6 md:px-12 max-w-[1800px] mx-auto py-12 flex flex-col gap-12 md:gap-24">
          {media.map((item: any, index: number) => {
            const isWide = item.width && item.height ? item.width / item.height > 1.7 : true;
            return (
              <ScrollReveal
                key={item.id || index}
                className={isWide ? 'w-full' : 'w-full md:w-3/4 lg:w-2/3 mx-auto'}
              >
                <div
                  className="cursor-pointer media-item-trigger group relative overflow-hidden border border-bc-white/5 hover:border-bc-white/20 transition-colors"
                  data-media-index={index}
                >
                  <Parallax speed={isWide ? 0 : 0.04}>
                    <AdaptiveMedia
                      item={item}
                      context="detail"
                      priority={index < 2}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-bc-black/0 group-hover:bg-bc-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono tracking-[0.2em] bg-bc-black/80 px-4 py-2 uppercase border border-bc-white/20">
                      {t.projectDetail.expand}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </section>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 py-24 max-w-[1800px] mx-auto border-t border-bc-white/10 mt-20">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight">
                {t.projectDetail.moreWork}
              </h2>
              <Link href="/work" className="text-xs font-mono tracking-widest text-bc-white/50 hover:text-bc-white uppercase">
                {t.projectDetail.allWork}
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p: any) => {
              const relCover = p.media?.find((m: any) => m.is_hero || m.is_cover) || p.media?.[0];
              const relCatName =
                (p.category?.slug && (t.categories as Record<string, string>)[p.category.slug]) ||
                p.category?.name_en ||
                p.category?.name_tr ||
                p.category?.name;
              return (
                <ScrollReveal key={p.id}>
                  <Link href={`/work/${p.slug}`} className="group block">
                    <div className="aspect-[4/5] relative overflow-hidden mb-4 bg-bc-white/5 border border-bc-white/5 group-hover:border-bc-white/20 transition-colors">
                      {relCover ? (
                        <AdaptiveMedia
                          item={relCover}
                          context="card"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-900" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold uppercase group-hover:text-bc-white/70 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs font-mono tracking-wider text-bc-white/40 uppercase">
                      {relCatName}
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
