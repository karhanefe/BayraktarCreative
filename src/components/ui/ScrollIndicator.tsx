'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP } from '@/lib/gsap-config';

interface ScrollIndicatorProps {
  className?: string;
  text?: string;
}

export function ScrollIndicator({ className, text = 'SCROLL' }: ScrollIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useGSAP(() => {
    if (!lineRef.current || isReducedMotion) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    tl.fromTo(
      lineRef.current, 
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1.2, ease: 'power2.inOut' }
    ).to(lineRef.current, {
      scaleY: 0, 
      transformOrigin: 'bottom', 
      duration: 1.2, 
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [isReducedMotion]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      opacity: isScrolled ? 0 : 1,
      duration: 0.3,
      ease: 'power2.inOut',
      pointerEvents: isScrolled ? 'none' : 'auto',
    });
  }, [isScrolled]);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Scroll to explore"
      className={cn(
        'flex flex-col items-center space-y-3 cursor-pointer group transition-opacity duration-300 select-none',
        className
      )}
    >
      {text && (
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-bc-white/50 group-hover:text-bc-white transition-colors">
          {text}
        </span>
      )}
      <div className="w-[1px] h-12 bg-bc-white/20 relative overflow-hidden">
        <div 
          ref={lineRef}
          className="absolute top-0 left-0 w-full h-full bg-bc-white"
        />
      </div>
    </div>
  );
}
