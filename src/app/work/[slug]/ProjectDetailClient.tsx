'use client';

import { useState, useEffect } from 'react';
import { MediaViewer } from '@/components/media/MediaViewer';

interface Props {
  media?: any[];
}

export function ProjectDetailClient({ media = [] }: Props) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    const handleMediaClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.media-item-trigger');
      if (target) {
        const indexStr = target.getAttribute('data-media-index');
        if (indexStr !== null) {
          setInitialIndex(parseInt(indexStr, 10));
          setViewerOpen(true);
        }
      }
    };

    document.addEventListener('click', handleMediaClick);
    return () => document.removeEventListener('click', handleMediaClick);
  }, []);

  return (
    <MediaViewer
      media={media}
      isOpen={viewerOpen}
      onClose={() => setViewerOpen(false)}
      initialIndex={initialIndex}
    />
  );
}
