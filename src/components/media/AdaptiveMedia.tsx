'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { classifyMediaPresentation, getAspectRatio } from '@/lib/media';

export interface AdaptiveMediaProps {
  item?: {
    url?: string;
    src?: string;
    media_type?: 'image' | 'video';
    type?: 'image' | 'video';
    mediaType?: 'image' | 'video';
    width?: number | null;
    height?: number | null;
    poster_url?: string | null;
    posterUrl?: string | null;
    posterSrc?: string | null;
    thumbnail_url?: string | null;
    thumbnailUrl?: string | null;
    thumbnailSrc?: string | null;
    alt_text?: string | null;
    altText?: string | null;
    alt?: string | null;
    presentation_override?: string | null;
  };
  src?: string;
  thumbnailSrc?: string;
  posterSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  mediaType?: 'image' | 'video';
  presentationOverride?: string;
  context?: 'card' | 'detail' | 'viewer' | 'hero' | 'featured';
  className?: string;
  priority?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onLoad?: () => void;
  fill?: boolean;
}

export function AdaptiveMedia({
  item,
  src: rawSrc,
  thumbnailSrc: rawThumbnailSrc,
  posterSrc: rawPosterSrc,
  alt: rawAlt = '',
  width: rawWidth,
  height: rawHeight,
  mediaType: rawMediaType,
  presentationOverride: rawPresentationOverride,
  context = 'card',
  className,
  priority = false,
  autoPlay = true,
  muted = true,
  loop = true,
  onLoad,
  fill = false,
}: AdaptiveMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Unpack from item if provided
  const src = item?.url || item?.src || rawSrc || '';
  const thumbnailSrc = item?.thumbnail_url || item?.thumbnailUrl || item?.thumbnailSrc || rawThumbnailSrc;
  const posterSrc = item?.poster_url || item?.posterUrl || item?.posterSrc || rawPosterSrc;
  const alt = item?.alt_text || item?.altText || item?.alt || rawAlt || 'Bayraktar Creative Media';
  const width = Number(item?.width || rawWidth || 1920);
  const height = Number(item?.height || rawHeight || 1080);
  const mediaType = (item?.media_type || item?.type || item?.mediaType || rawMediaType || (src.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image')) as 'image' | 'video';
  const presentationOverride = item?.presentation_override || rawPresentationOverride;

  const aspectRatio = getAspectRatio(width, height);
  const presentation = presentationOverride && presentationOverride !== 'auto' ? presentationOverride : classifyMediaPresentation(width, height);

  useEffect(() => {
    if (mediaType !== 'video' || !videoRef.current || !autoPlay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [mediaType, autoPlay]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const wrapperClasses = cn(
    'relative overflow-hidden',
    !isLoaded && 'bg-bc-black/40',
    context === 'card' && 'w-full h-full',
    context === 'detail' && 'w-full mx-auto',
    context === 'viewer' && 'w-full h-full flex items-center justify-center',
    context === 'hero' && 'w-full h-full',
    context === 'featured' && 'w-full h-full',
    className
  );

  const mediaClasses = cn(
    'transition-opacity duration-700 ease-in-out',
    !isLoaded ? 'opacity-0' : 'opacity-100',
    (context === 'card' || context === 'hero') && 'object-cover w-full h-full',
    context === 'viewer' && 'object-contain max-h-[88vh] max-w-[90vw] w-auto h-auto m-auto',
    (context === 'detail' || context === 'featured') && 'w-full h-auto object-cover'
  );

  const style =
    !fill && context !== 'hero' && context !== 'viewer' && context !== 'card'
      ? { aspectRatio: `${width} / ${height}` }
      : undefined;

  if (!src) {
    return <div className={cn(wrapperClasses, 'bg-bc-black/80 flex items-center justify-center')} />;
  }

  return (
    <div className={wrapperClasses} style={style} data-presentation={presentation}>
      {mediaType === 'image' ? (
        <Image
          src={src}
          alt={alt}
          width={fill || context === 'card' || context === 'hero' || context === 'viewer' ? undefined : width}
          height={fill || context === 'card' || context === 'hero' || context === 'viewer' ? undefined : height}
          fill={fill || context === 'card' || context === 'hero' || context === 'viewer'}
          className={mediaClasses}
          priority={priority}
          onLoad={handleLoad}
          sizes={
            context === 'hero'
              ? '100vw'
              : context === 'viewer'
              ? '90vw'
              : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={posterSrc || thumbnailSrc}
          className={cn(
            mediaClasses,
            fill || context === 'card' || context === 'hero' ? 'absolute inset-0' : ''
          )}
          muted={muted}
          loop={loop}
          playsInline
          onLoadedData={handleLoad}
          {...(fill || context === 'card' || context === 'hero' || context === 'viewer' ? {} : { width, height })}
        />
      )}
    </div>
  );
}
