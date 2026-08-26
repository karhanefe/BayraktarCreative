import { CSSProperties } from 'react';

export type MediaPresentation = 'portrait' | 'vertical' | 'square' | 'landscape' | 'wide' | 'ultrawide';

export interface MediaDimensions {
  width: number;
  height: number;
}

export interface MediaItem extends MediaDimensions {
  url: string;
  type: 'image' | 'video';
  alt?: string;
  presentation?: MediaPresentation;
}

export const STANDARD_RATIOS = {
  SQUARE: 1,
  PORTRAIT_4_5: 4 / 5,
  PORTRAIT_3_4: 3 / 4,
  PORTRAIT_9_16: 9 / 16,
  LANDSCAPE_4_3: 4 / 3,
  LANDSCAPE_16_9: 16 / 9,
  CINEMATIC_21_9: 21 / 9,
};

/**
 * Calculates aspect ratio given width and height
 */
export function getAspectRatio(width: number, height: number): number {
  if (height === 0) return 1;
  return width / height;
}

/**
 * Classifies media into presentation types based on its dimensions
 */
export function classifyMediaPresentation(width: number, height: number): MediaPresentation {
  const ratio = getAspectRatio(width, height);
  
  if (ratio < 0.6) return 'portrait'; // 9:16 and taller
  if (ratio < 0.9) return 'vertical'; // 4:5, 3:4
  if (ratio >= 0.9 && ratio <= 1.1) return 'square'; // 1:1 roughly
  if (ratio > 1.1 && ratio < 1.6) return 'landscape'; // 4:3
  if (ratio >= 1.6 && ratio <= 2.0) return 'wide'; // 16:9
  return 'ultrawide'; // 21:9 and wider
}

/**
 * Returns optimized CSS properties for rendering media in different contexts
 */
export function getMediaContainerStyle(
  width: number, 
  height: number, 
  context: 'card' | 'detail' | 'viewer' | 'hero' | 'featured'
): CSSProperties {
  const ratio = getAspectRatio(width, height);
  const presentation = classifyMediaPresentation(width, height);
  
  const style: CSSProperties = {
    aspectRatio: `${width} / ${height}`,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  };

  switch (context) {
    case 'card':
      // Cards might constraint extreme vertical content
      if (presentation === 'portrait') {
        style.maxHeight = '80vh';
      }
      break;
    case 'detail':
      // Detail view allows natural height up to constraints
      if (presentation === 'ultrawide') {
        style.maxWidth = '100vw';
      } else if (presentation === 'portrait' || presentation === 'vertical') {
        style.maxWidth = 'min(100%, 65vh * ' + ratio + ')';
        style.margin = '0 auto';
      }
      break;
    case 'hero':
      // Hero typically fills viewport or specific height, override aspect ratio logic
      style.height = '100vh';
      style.aspectRatio = 'auto';
      style.objectFit = 'cover';
      break;
    case 'viewer':
      style.maxHeight = '90vh';
      style.maxWidth = '90vw';
      style.margin = '0 auto';
      style.objectFit = 'contain';
      break;
    case 'featured':
      if (presentation === 'portrait') {
        style.maxWidth = '400px';
      }
      break;
  }
  
  return style;
}

/**
 * Computes suggested parallax intensity based on media and device
 */
export function getParallaxIntensity(presentation: MediaPresentation, device: 'desktop' | 'mobile'): number {
  if (device === 'mobile') return 20; // Subtle on mobile
  
  switch (presentation) {
    case 'portrait':
    case 'vertical':
      return 100; // Strongest parallax for vertical media
    case 'square':
      return 60;
    case 'landscape':
    case 'wide':
      return 40; // Milder for wider
    case 'ultrawide':
      return 30; // Mildest for ultrawide to prevent visual breaking
    default:
      return 50;
  }
}
