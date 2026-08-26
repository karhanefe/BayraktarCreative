import { animation as tokens } from './design-tokens';

/**
 * Animation duration scale matching design tokens
 */
export const durations = tokens.durations;

/**
 * GSAP Easing strings
 */
export const easing = tokens.easing;

export const presets = {
  fadeUp: {
    y: 30,
    opacity: 0,
    duration: durations.medium,
    ease: easing.entrance,
  },
  fadeIn: {
    opacity: 0,
    duration: durations.medium,
    ease: easing.smooth,
  },
  scaleIn: {
    scale: 0.9,
    opacity: 0,
    duration: durations.medium,
    ease: easing.snap,
  },
  clipReveal: {
    clipPath: 'inset(100% 0 0 0)',
    duration: durations.slow,
    ease: easing.cinematic,
  },
};

export const stagger = {
  fast: 0.05,
  medium: 0.1,
  slow: 0.2,
};

export const parallaxPresets = {
  portrait: { y: 100 },
  square: { y: 60 },
  wide: { y: 40 },
};

export const reducedMotionAlternative = {
  fadeUp: presets.fadeIn,
  scaleIn: presets.fadeIn,
  clipReveal: presets.fadeIn,
};

/**
 * Helper to determine if the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
