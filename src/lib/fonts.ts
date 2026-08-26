import { Inter } from 'next/font/google';

/**
 * Body font — Inter variable font
 * Used for all body text, UI elements, navigation, and metadata.
 */
export const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

/**
 * Display font — Currently Inter with display weights.
 * Designed to be easily swapped for a premium display face.
 * To change: replace Inter import with desired font, keep variable name.
 */
export const displayFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['700', '800', '900'],
});
