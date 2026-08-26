'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap-config';

export function AboutClient() {
  useGSAP(() => {
    // We can add page-specific scroll effects here that aren't covered by ScrollReveal
    // For example, a background color change or specific element pinning
    ScrollTrigger.refresh();
  }, []);

  return null;
}
