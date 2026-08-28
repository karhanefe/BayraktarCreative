'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Tags, Settings, LogOut, ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/admin/actions';
import { useLanguage } from '@/context/LanguageContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();

  const navItems = [
    { name: t.admin.nav.dashboard, href: '/admin', icon: LayoutDashboard },
    { name: t.admin.nav.projects, href: '/admin/projects', icon: FolderKanban },
    { name: t.admin.nav.categories, href: '/admin/categories', icon: Tags },
    { name: t.admin.nav.settings, href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0a0a0a] border-r border-[#2a2a2a] flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 shrink-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header with Title & Language Switcher */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#2a2a2a]">
          <Link href="/admin" className="font-bold text-sm tracking-widest text-[#f5f5f0] hover:opacity-80 transition-opacity">
            BAYRAKTAR <span className="text-xs text-neutral-500 font-mono">CMS</span>
          </Link>
          <div className="flex items-center gap-2">
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
            <button onClick={onClose} className="md:hidden text-neutral-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all rounded-sm group",
                  isActive 
                    ? "text-[#f5f5f0] bg-[#1a1a1a] border-l-2 border-[#f5f5f0]"
                    : "text-neutral-400 hover:text-[#f5f5f0] hover:bg-[#1a1a1a]/50"
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-[#f5f5f0]" : "text-neutral-500 group-hover:text-[#f5f5f0]"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#2a2a2a] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-[#f5f5f0] hover:bg-[#1a1a1a] transition-all rounded-sm"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              {t.admin.nav.viewSite}
            </span>
            <span className="text-[10px] font-mono text-neutral-600">↗</span>
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs font-medium text-red-400/80 hover:text-red-400 hover:bg-red-950/20 transition-all rounded-sm cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              {t.admin.nav.logout}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
