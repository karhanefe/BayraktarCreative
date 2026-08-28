'use client';

import { Menu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title?: string;
}

export default function AdminHeader({ onMenuToggle, title }: AdminHeaderProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <header className="md:hidden flex items-center justify-between px-4 h-16 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="text-[#f5f5f0] hover:text-white transition-colors p-1"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-sm tracking-wider text-[#f5f5f0]">BAYRAKTAR</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <div className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded p-0.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setLocale('tr')}
            className={cn(
              'px-1.5 py-0.5 rounded transition-colors text-[11px]',
              locale === 'tr' ? 'bg-[#f5f5f0] text-[#0a0a0a] font-bold' : 'text-neutral-400 hover:text-white'
            )}
            title="Türkçe"
          >
            TR
          </button>
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={cn(
              'px-1.5 py-0.5 rounded transition-colors text-[11px]',
              locale === 'en' ? 'bg-[#f5f5f0] text-[#0a0a0a] font-bold' : 'text-neutral-400 hover:text-white'
            )}
            title="English"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
