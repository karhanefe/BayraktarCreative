'use client';

import { Menu } from 'lucide-react';

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title?: string;
}

export default function AdminHeader({ onMenuToggle, title }: AdminHeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-between px-4 h-16 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="text-[#f5f5f0] hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-sm tracking-wider text-[#f5f5f0]">BAYRAKTAR CREATIVE</span>
      </div>
      {title && (
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{title}</span>
      )}
    </header>
  );
}
