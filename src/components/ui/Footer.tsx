'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteSettings } from '@/lib/supabase/types';

export function Footer({ settings }: { settings?: SiteSettings }) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const { t, locale } = useLanguage();
  const localizedTitle = typeof settings?.site_title === 'object'
    ? settings.site_title?.[locale] || settings.site_title?.tr || settings.site_title?.en
    : settings?.site_title;
  const brandTitle = localizedTitle?.split(/—|\|/)[0].trim() || 'BAYRAKTAR CREATIVE';
  const brandParts = brandTitle.split(/\s+/);
  const brandLead = brandParts[0] || 'BAYRAKTAR';
  const brandTail = brandParts.slice(1).join(' ') || 'CREATIVE';
  const email = settings?.email || 'hello@bayraktarcreative.com';
  const instagram = settings?.social_links?.instagram || settings?.instagram || 'https://instagram.com/bayraktarcreative';

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-bc-black text-bc-white py-20 md:py-28 px-6 md:px-12 w-full border-t border-bc-white/10">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <Link href="/" className="font-bold text-2xl tracking-tighter block mb-4 uppercase">
            {brandLead}<br />
            <span className="text-xs tracking-[0.2em] font-medium text-bc-white/60">{brandTail}</span>
          </Link>
          <p className="text-sm text-bc-white/60 max-w-sm leading-relaxed">
            {settings?.tagline || t.footer.tagline}
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] mb-3 text-bc-white/40">
            {t.footer.nav}
          </h4>
          <Link href="/work" className="text-sm uppercase tracking-wider hover:text-bc-white/60 transition-colors w-fit font-mono">
            {t.nav.work}
          </Link>
          <Link href="/about" className="text-sm uppercase tracking-wider hover:text-bc-white/60 transition-colors w-fit font-mono">
            {t.nav.about}
          </Link>
          <Link href="/contact" className="text-sm uppercase tracking-wider hover:text-bc-white/60 transition-colors w-fit font-mono">
            {t.nav.contact}
          </Link>
        </div>

        <div className="md:col-span-4 flex flex-col space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] mb-3 text-bc-white/40">
            {t.footer.connect}
          </h4>
          <a href={`mailto:${email}`} className="text-sm hover:text-bc-white/60 transition-colors w-fit font-mono">
            {email}
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-bc-white/60 transition-colors w-fit font-mono">
            Instagram [↗]
          </a>
          <p className="text-xs font-mono text-bc-white/40 pt-2">{t.footer.location}</p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-bc-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-bc-white/40">
        <p>&copy; {currentYear} {brandTitle}. {t.footer.copyright}</p>
        <div className="flex space-x-6">
          <span className="tracking-widest uppercase text-[0.6875rem]">{settings?.footer_text || t.footer.subtitle}</span>
        </div>
      </div>
    </footer>
  );
}
