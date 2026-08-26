'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AdaptiveMedia } from '@/components/media/AdaptiveMedia';
import { getAspectRatio } from '@/lib/media';

export interface ProjectCardMedia {
  src?: string;
  url?: string;
  thumbnailSrc?: string;
  thumbnail_url?: string | null;
  posterSrc?: string | null;
  poster_url?: string | null;
  width?: number | null;
  height?: number | null;
  mediaType?: 'image' | 'video';
  media_type?: 'image' | 'video';
  is_cover?: boolean | null;
}

export interface ProjectCardProps {
  project: {
    id: string;
    slug: string;
    title: string;
    category?: { name?: string; name_en?: string; name_tr?: string; slug?: string } | string | null;
    categories?: { name?: string; name_en?: string; name_tr?: string; slug?: string } | null;
    client?: string | null;
    presentation_style?: string | null;
    presentationStyle?: string | null;
    coverMedia?: ProjectCardMedia;
    cover_image?: string;
    cover_aspect_ratio?: string;
    media?: ProjectCardMedia[];
  };
  layout?: 'default' | 'featured' | 'compact' | 'horizontal';
  className?: string;
  index?: number;
}

export function ProjectCard({ project, layout = 'default', className }: ProjectCardProps) {
  // Resolve cover media
  let resolvedMedia: ProjectCardMedia | undefined = project.coverMedia;

  if (!resolvedMedia && project.media && project.media.length > 0) {
    resolvedMedia = project.media.find((m) => m.is_cover) || project.media[0];
  }

  if (!resolvedMedia && project.cover_image) {
    let width = 1920;
    let height = 1080;
    if (project.cover_aspect_ratio === '9:16') {
      width = 1080;
      height = 1920;
    } else if (project.cover_aspect_ratio === '1:1') {
      width = 1080;
      height = 1080;
    } else if (project.cover_aspect_ratio === '21:9') {
      width = 2560;
      height = 1080;
    } else if (project.cover_aspect_ratio === '4:5') {
      width = 1080;
      height = 1350;
    }

    resolvedMedia = {
      src: project.cover_image,
      width,
      height,
      mediaType: 'image',
    };
  }

  const categoryName =
    typeof project.category === 'string'
      ? project.category
      : project.category?.name_en ||
        project.category?.name_tr ||
        (project.category as any)?.name ||
        (project as any).categories?.name ||
        'Selected Work';

  const width = resolvedMedia?.width || 1920;
  const height = resolvedMedia?.height || 1080;
  const ratio = getAspectRatio(width, height);

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        'group block relative overflow-hidden bg-bc-black/80 border border-bc-white/5 transition-all duration-500 hover:border-bc-white/20',
        layout === 'default' && 'w-full',
        layout === 'featured' && 'w-full h-full min-h-[350px]',
        layout === 'horizontal' && 'h-full flex-shrink-0',
        className
      )}
      style={layout === 'default' ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {/* Media container */}
      {resolvedMedia ? (
        <AdaptiveMedia
          item={resolvedMedia}
          context={layout === 'featured' ? 'featured' : 'card'}
          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-bc-black transition-transform duration-700 group-hover:scale-105" />
      )}

      {/* Subtle liquid glass overlay with metadata */}
      <div className="absolute inset-0 bg-gradient-to-t from-bc-black/90 via-bc-black/30 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-100 flex flex-col justify-end p-6 md:p-8">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
          <p className="text-[0.6875rem] font-mono uppercase tracking-[0.2em] text-bc-white/60 mb-2">
            {categoryName}
          </p>
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-bc-white">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
