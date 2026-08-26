'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // 1. Check prefers-reduced-motion: if enabled, rely entirely on native browser scroll
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // 2. Initialize Lenis instance
    let lenis: Lenis | null = null;
    let tickerUpdate: ((time: number) => void) | null = null;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smooth easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
        syncTouch: false,
      });

      // 3. Connect Lenis scroll events to GSAP ScrollTrigger
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // 4. Hook Lenis RAF updates into GSAP's central ticker
      tickerUpdate = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(0);

      // 5. Initial refresh
      ScrollTrigger.refresh();
    } catch (err) {
      console.warn('Lenis initialization failed, falling back to native browser scroll:', err);
    }

    // 6. Complete cleanup on unmount
    return () => {
      if (tickerUpdate) {
        gsap.ticker.remove(tickerUpdate);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
