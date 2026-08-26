'use client'

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'clip-up' | 'clip-left' | 'scale-in';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({ 
  children, 
  variant = 'fade-up', 
  delay = 0, 
  duration = 0.8, 
  className, 
  once = true 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!ref.current) return;
    
    const mm = gsap.matchMedia();
    
    mm.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      normal: "(prefers-reduced-motion: no-preference)"
    }, (context) => {
      const { reduceMotion } = context.conditions as any;
      
      if (reduceMotion) {
        gsap.to(ref.current, {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true }
        });
        return;
      }

      const yOffset = variant === 'fade-up' || variant === 'clip-up' ? 50 : 0;
      const xOffset = variant === 'clip-left' ? 50 : 0;
      const scale = variant === 'scale-in' ? 0.9 : 1;
      
      gsap.fromTo(ref.current,
        { opacity: 0, y: yOffset, x: xOffset, scale: scale },
        {
          opacity: 1, 
          y: 0, 
          x: 0,
          scale: 1, 
          duration, 
          delay, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: once,
          }
        }
      );
    });
    
    return () => mm.revert();
  });
  
  return <div ref={ref} className={cn("opacity-0 will-change-[opacity,transform]", className)}>{children}</div>;
}
