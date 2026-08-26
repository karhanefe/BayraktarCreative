'use client'

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config';
import { type MediaPresentation } from '@/lib/media';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // -1 to 1, default 0.15
  direction?: 'vertical' | 'horizontal';
  className?: string;
  disableOnMobile?: boolean;
  disableOnReducedMotion?: boolean;
  mediaPresentation?: MediaPresentation; // adapts intensity
}

export function Parallax({ 
  children, 
  speed = 0.15, 
  direction = 'vertical', 
  className,
  disableOnMobile = false,
  disableOnReducedMotion = true
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!ref.current) return;
    
    const mm = gsap.matchMedia();
    
    mm.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      const { reduceMotion, isMobile } = context.conditions as any;
      
      if ((disableOnReducedMotion && reduceMotion) || (disableOnMobile && isMobile)) {
        return; 
      }
      
      gsap.to(ref.current, {
        y: direction === 'vertical' ? -speed * 100 : 0,
        x: direction === 'horizontal' ? -speed * 100 : 0,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
    
    return () => mm.revert();
  });
  
  return <div ref={ref} className={cn("will-change-transform", className)}>{children}</div>;
}
