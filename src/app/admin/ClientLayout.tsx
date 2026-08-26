'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function ClientLayout({ children, isAuthenticated }: { children: ReactNode, isAuthenticated: boolean }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  // For development without Supabase, we skip strict enforce
  // useEffect(() => {
  //   if (!isAuthenticated && !isLoginPage) {
  //     router.push('/admin/login');
  //   }
  // }, [isAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} title="Admin" />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
