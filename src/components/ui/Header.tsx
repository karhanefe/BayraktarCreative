'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { MobileNav } from './MobileNav';
import type { SiteSettings } from '@/lib/supabase/types';

export function Header({ siteTitle }: { siteTitle?: SiteSettings['site_title'] }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const localizedTitle = typeof siteTitle === 'object'
    ? siteTitle?.[locale] || siteTitle?.tr || siteTitle?.en
    : siteTitle;
  const brandTitle = localizedTitle?.split(/—|\|/)[0].trim() || 'BAYRAKTAR CREATIVE';

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 50);

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ease-in-out',
          'px-5 py-4 md:px-8 lg:px-12 md:py-5',
          isScrolled
            ? 'bg-bc-black/80 backdrop-blur-md py-3 md:py-3 border-b border-bc-white/10'
            : 'bg-transparent',
          isHidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-bc-white font-bold text-sm md:text-base tracking-[0.15em] uppercase z-50 hover:opacity-80 transition-opacity"
          >
            {brandTitle}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link
              href="/work"
              className="text-bc-white text-[0.8125rem] uppercase tracking-[0.12em] hover:text-bc-white/60 transition-colors duration-300 font-medium"
            >
              {t.nav.work}
            </Link>
            <Link
              href="/about"
              className="text-bc-white text-[0.8125rem] uppercase tracking-[0.12em] hover:text-bc-white/60 transition-colors duration-300 font-medium"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              className="text-bc-white text-[0.8125rem] uppercase tracking-[0.12em] hover:text-bc-white/60 transition-colors duration-300 font-medium"
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Desktop Actions: Language Switcher & Contact Button */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language Switcher */}
            <div className="flex items-center bg-bc-white/5 border border-bc-white/15 px-2.5 py-1 rounded-full text-xs font-mono tracking-widest">
              <button
                type="button"
                onClick={() => setLocale('tr')}
                className={cn(
                  'px-1.5 transition-colors cursor-pointer',
                  locale === 'tr' ? 'text-bc-white font-bold' : 'text-bc-white/40 hover:text-bc-white/70'
                )}
                aria-label="Türkçe"
              >
                TR
              </button>
              <span className="text-bc-white/20 select-none">/</span>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={cn(
                  'px-1.5 transition-colors cursor-pointer',
                  locale === 'en' ? 'text-bc-white font-bold' : 'text-bc-white/40 hover:text-bc-white/70'
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className={cn(
                'px-5 py-2 text-[0.8125rem] uppercase tracking-[0.08em] font-medium transition-all duration-300',
                isScrolled
                  ? 'bg-bc-white text-bc-black hover:bg-bc-pure-white'
                  : 'border border-bc-white/30 text-bc-white hover:bg-bc-white hover:text-bc-black'
              )}
            >
              {t.nav.startProject}
            </Link>
          </div>

          {/* Mobile Right Controls: Language Switcher & Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden z-50">
            {/* Mobile Language Switcher */}
            <div className="flex items-center bg-bc-white/5 border border-bc-white/15 px-2 py-0.5 rounded-full text-[11px] font-mono tracking-wider">
              <button
                type="button"
                onClick={() => setLocale('tr')}
                className={cn(
                  'px-1 transition-colors',
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
                  'px-1 transition-colors',
                  locale === 'en' ? 'text-bc-white font-bold' : 'text-bc-white/40'
                )}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 -mr-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-bc-white text-xs tracking-[0.2em] uppercase font-mono font-medium">
                {t.nav.menu}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
