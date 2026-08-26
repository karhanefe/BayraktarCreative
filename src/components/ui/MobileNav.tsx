'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Z_INDEX } from '@/lib/design-tokens';
import { gsap, useGSAP } from '@/lib/gsap-config';
import { useLanguage } from '@/context/LanguageContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLAnchorElement[]>([]);
  const { locale, setLocale, t } = useLanguage();

  const setNavLinkRef = (index: number) => (el: HTMLAnchorElement | null) => {
    if (el) navLinksRef.current[index] = el;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        containerRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' }
      );

      gsap.fromTo(
        navLinksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'back.out(1.7)' }
      );
    } else {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'power3.inOut',
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const links = [
    { name: t.nav.work, href: '/work' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 bg-bc-black text-bc-white flex flex-col justify-between px-8 py-12',
        !isOpen && 'pointer-events-none'
      )}
      style={{
        zIndex: Z_INDEX.modal,
        clipPath: 'inset(0 0 100% 0)',
      }}
      aria-hidden={!isOpen}
    >
      {/* Top Bar: Language switcher and Close button */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center bg-bc-white/10 border border-bc-white/20 px-3 py-1 rounded-full text-xs font-mono tracking-widest">
          <button
            type="button"
            onClick={() => setLocale('tr')}
            className={cn(
              'px-2 transition-colors',
              locale === 'tr' ? 'text-bc-white font-bold' : 'text-bc-white/40'
            )}
          >
            TR
          </button>
          <span className="text-bc-white/20 select-none">/</span>
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={cn(
              'px-2 transition-colors',
              locale === 'en' ? 'text-bc-white font-bold' : 'text-bc-white/40'
            )}
          >
            EN
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-3 text-bc-white/70 hover:text-bc-white transition-colors"
          aria-label={t.nav.close}
          tabIndex={isOpen ? 0 : -1}
        >
          <div className="relative w-6 h-6">
            <span className="absolute left-0 top-1/2 w-full h-0.5 bg-current -translate-y-1/2 rotate-45 rounded-full" />
            <span className="absolute left-0 top-1/2 w-full h-0.5 bg-current -translate-y-1/2 -rotate-45 rounded-full" />
          </div>
        </button>
      </div>

      {/* Main Nav Links */}
      <nav className="flex flex-col space-y-6 my-auto">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            ref={setNavLinkRef(i)}
            onClick={onClose}
            className="text-5xl md:text-6xl font-bold tracking-tighter uppercase opacity-0 hover:text-bc-white/60 transition-colors"
            tabIndex={isOpen ? 0 : -1}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Bottom Footer Details */}
      <div className="pt-6 border-t border-bc-white/10 flex items-center justify-between text-xs font-mono text-bc-white/40">
        <p>BAYRAKTAR CREATIVE</p>
        <p>ISTANBUL — WORLDWIDE</p>
      </div>
    </div>
  );
}
