/** 
 * Bayraktar Creative — Centralized Design Tokens
 * All visual system values are defined here for global consistency.
 * Change values here to update the entire website's visual language.
 */

export const COLORS = {
  black: '#0a0a0a',
  offWhite: '#f5f5f0',
  white: '#ffffff',
  gray: {
    100: '#e5e5e0',
    200: '#cccccc',
    300: '#aaaaaa',
    400: '#8a8a8a',
    500: '#6a6a6a',
    600: '#3a3a3a',
    700: '#2a2a2a',
    800: '#1a1a1a',
  },
} as const;

export const TYPOGRAPHY = {
  displayXl: 'clamp(3rem, 8vw, 7rem)',
  displayLg: 'clamp(2.5rem, 6vw, 5rem)',
  displayMd: 'clamp(2rem, 5vw, 3.5rem)',
  headingLg: 'clamp(1.5rem, 4vw, 2.5rem)',
  headingMd: 'clamp(1.25rem, 3vw, 2rem)',
  headingSm: 'clamp(1.125rem, 2vw, 1.5rem)',
  bodyLg: 'clamp(1.125rem, 1.5vw, 1.25rem)',
  bodyMd: '1rem',
  bodySm: '0.875rem',
  caption: '0.75rem',
} as const;

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
  fluid: 'clamp(2rem, 5vw, 4rem)',
  fluidLg: 'clamp(4rem, 10vw, 8rem)',
} as const;

export const DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  cinematic: 1.8,
} as const;

export const EASINGS = {
  smooth: 'power2.inOut',
  snap: 'back.out(1.7)',
  cinematic: 'expo.inOut',
  entrance: 'power3.out',
  exit: 'power2.in',
} as const;

export const Z_INDEX = {
  base: 1,
  content: 10,
  header: 100,
  mobileNav: 150,
  overlay: 200,
  transition: 250,
  modal: 300,
  viewer: 350,
  cursor: 400,
  toast: 450,
  max: 999,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

export const PARALLAX = {
  /** Default parallax settings */
  default: {
    speed: 0.15,
    scrub: 1,
  },
  /** Subtle parallax for secondary elements */
  subtle: {
    speed: 0.08,
    scrub: 0.8,
  },
  /** Stronger parallax for dramatic effect */
  dramatic: {
    speed: 0.25,
    scrub: 1.2,
  },
} as const;

// Legacy aliases for backward compatibility
export const colors = COLORS;
export const typography = TYPOGRAPHY;
export const spacing = SPACING;
export const animation = {
  durations: DURATIONS,
  easing: EASINGS,
};
export const zIndex = Z_INDEX;
export const breakpoints = BREAKPOINTS;
export const parallax = PARALLAX;
