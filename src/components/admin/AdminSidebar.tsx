'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Tags, Settings, LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/admin/actions';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
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
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0a0a0a] border-r border-[#2a2a2a] flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#2a2a2a]">
          <span className="font-bold text-sm tracking-widest text-[#f5f5f0]">BAYRAKTAR</span>
          <button onClick={onClose} className="md:hidden text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all group",
                  isActive 
                    ? "text-[#f5f5f0] bg-[#1a1a1a]" 
                    : "text-neutral-500 hover:text-[#f5f5f0] hover:bg-[#1a1a1a]"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-[#f5f5f0]" : "text-neutral-500 group-hover:text-[#f5f5f0]"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2a2a2a]">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-neutral-500 hover:text-[#f5f5f0] hover:bg-[#1a1a1a] transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
