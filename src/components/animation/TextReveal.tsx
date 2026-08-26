'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP } from '@/lib/gsap-config';

interface TextRevealProps {
  text?: string;
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  splitBy?: 'word' | 'line' | 'character';
  className?: string;
  stagger?: number;
  scrub?: boolean;
}

export function TextReveal({ 
  text, 
  children,
  as: Component = 'p', 
  splitBy = 'word', 
  className, 
  stagger = 0.05, 
  scrub = false 
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  
  const contentString = text || (typeof children === 'string' ? children : String(children || ''));
  const units = splitBy === 'word' 
    ? contentString.split(' ') 
    : splitBy === 'character' 
    ? contentString.split('') 
    : [contentString];
  
  useGSAP(() => {
    if (!ref.current || !contentString) return;
    
    const mm = gsap.matchMedia();
    
    mm.add({
      reduceMotion: '(prefers-reduced-motion: reduce)',
      normal: '(prefers-reduced-motion: no-preference)'
    }, (context) => {
      const { reduceMotion } = context.conditions as Record<string, boolean>;
      
      if (reduceMotion) {
        gsap.to(ref.current, {
          opacity: 1, 
          duration: 0.5,
          scrollTrigger: { trigger: ref.current, start: 'top 85%' }
        });
        return;
      }
      
      const childElements = ref.current?.querySelectorAll('.reveal-unit-inner');
      if (!childElements || childElements.length === 0) return;

      gsap.fromTo(childElements,
        { opacity: 0, y: 24 },
        {
          opacity: 1, 
          y: 0, 
          stagger, 
          ease: 'power3.out', 
          duration: 0.8,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            scrub: scrub
          }
        }
      );
    });
    
    return () => mm.revert();
  }, [contentString, splitBy, stagger, scrub]);

  return (
    <Component ref={ref as any} className={cn('flex flex-wrap gap-x-[0.25em]', className)} aria-label={contentString}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="reveal-unit-inner inline-block opacity-0 will-change-[opacity,transform]">
            {unit}{splitBy === 'word' ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Component>
  );
}
