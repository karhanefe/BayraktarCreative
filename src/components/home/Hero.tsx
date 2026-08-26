'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

export interface HeroProps {
  projects?: any[];
}

export function Hero({ projects }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Optional background cover media from first featured project if available
  const heroMedia = projects?.[0]?.media?.find((m: any) => m.is_cover) || projects?.[0]?.media?.[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
          normalMotion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as Record<string, boolean>;

          // Entrance animation
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          if (!reduceMotion) {
            tl.from(bgRef.current, {
              scale: 1.2,
              duration: 2,
              ease: 'power2.out',
            })
              .from(
                titleRef.current,
                {
                  y: 60,
                  opacity: 0,
                  duration: 1.2,
                },
                0.3
              )
              .from(
                subtitleRef.current,
                {
                  y: 40,
                  opacity: 0,
                  duration: 1,
                },
                0.6
              );

            // Scroll-driven hero transformation
            gsap.to(bgRef.current, {
              scale: 1.15,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            });

            // Title moves up on separate plane
            gsap.to(titleRef.current, {
              y: isDesktop ? -200 : -100,
              opacity: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '80% top',
                scrub: true,
              },
            });

            // Subtitle drifts
            gsap.to(subtitleRef.current, {
              y: isDesktop ? -120 : -60,
              opacity: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '70% top',
                scrub: true,
              },
            });

            // Darkening overlay
            gsap.to(overlayRef.current, {
              opacity: 0.7,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: '50% top',
                end: 'bottom top',
                scrub: true,
              },
            });
          } else {
            gsap.from([titleRef.current, subtitleRef.current], {
              opacity: 0,
              duration: 0.5,
              stagger: 0.15,
            });
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-bc-black flex items-center justify-center"
    >
      {/* Background Visual Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'scale(1)' }}
      >
        {heroMedia?.url ? (
          <img
            src={heroMedia.url}
            alt="Bayraktar Creative Cinema"
            className="w-full h-full object-cover opacity-40 brightness-75"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-bc-black to-bc-black" />
        )}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-bc-black opacity-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-5 w-full max-w-[1600px]">
        <h1
          ref={titleRef}
          className={cn(
            'text-bc-white font-extrabold tracking-[-0.04em] leading-[0.85] will-change-[transform,opacity]',
            'text-[clamp(2.5rem,12vw,10rem)]'
          )}
        >
          {t.hero.titleLine1}
          <br />
          <span className="text-[0.45em] tracking-[0.15em] font-medium text-bc-white/60 block mt-2">
            {t.hero.titleLine2}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className={cn(
            'mt-8 md:mt-12 text-bc-white/70 max-w-xl font-normal will-change-[transform,opacity]',
            'text-[clamp(0.875rem,1.5vw,1.125rem)] tracking-[0.1em] uppercase leading-relaxed'
          )}
        >
          {t.hero.subtitle}
        </p>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator text={t.hero.scroll} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bc-black to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
