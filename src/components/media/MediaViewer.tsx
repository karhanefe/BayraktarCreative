'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { AdaptiveMedia } from './AdaptiveMedia';

export interface MediaViewerItem {
  src?: string;
  url?: string;
  posterSrc?: string | null;
  poster_url?: string | null;
  thumbnail_url?: string | null;
  alt?: string | null;
  alt_text?: string | null;
  width?: number | null;
  height?: number | null;
  mediaType?: 'image' | 'video';
  media_type?: 'image' | 'video';
  title?: string;
}

export interface MediaViewerProps {
  items?: MediaViewerItem[];
  media?: MediaViewerItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function MediaViewer({ items: rawItems, media, initialIndex = 0, isOpen, onClose }: MediaViewerProps) {
  const items = rawItems || media || [];
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const next = useCallback(() => {
    if (items.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    if (items.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, next, prev, onClose]);

  useGSAP(() => {
    if (isOpen && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen || !mounted || items.length === 0) return null;

  const currentRaw = items[currentIndex];
  if (!currentRaw) return null;

  const currentItem = {
    src: currentRaw.url || currentRaw.src || '',
    posterSrc: currentRaw.poster_url || currentRaw.posterSrc || currentRaw.thumbnail_url || undefined,
    alt: currentRaw.alt_text || currentRaw.alt || 'Bayraktar Creative Project Media',
    width: currentRaw.width || 1920,
    height: currentRaw.height || 1080,
    mediaType: currentRaw.media_type || currentRaw.mediaType || 'image',
  };

  const content = (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[350] flex items-center justify-center bg-bc-black/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute top-6 right-6 text-bc-white z-50 text-xl font-mono tracking-widest px-4 py-2 hover:opacity-70 transition-opacity border border-bc-white/20 bg-bc-black/40 backdrop-blur-sm"
      >
        ESC [✕]
      </button>

      {/* Navigation arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous frame"
            className="absolute left-4 md:left-8 text-bc-white z-50 text-2xl p-4 hover:opacity-60 transition-opacity bg-bc-black/30 backdrop-blur-sm rounded-full"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next frame"
            className="absolute right-4 md:right-8 text-bc-white z-50 text-2xl p-4 hover:opacity-60 transition-opacity bg-bc-black/30 backdrop-blur-sm rounded-full"
          >
            →
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-bc-white/60 text-xs tracking-[0.2em] font-mono bg-bc-black/50 px-4 py-1.5 border border-bc-white/10">
            {currentIndex + 1} / {items.length}
          </div>
        </>
      )}

      {/* Media container: native aspect-ratio preserved with contained viewport bounds */}
      <div className="w-full h-full p-6 md:p-12 lg:p-16 flex items-center justify-center pointer-events-auto">
        <AdaptiveMedia
          {...currentItem}
          context="viewer"
          className="max-h-[85vh] max-w-[90vw]"
        />
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
