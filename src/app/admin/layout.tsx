import { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';
import { ToastProvider } from '@/components/admin/Toast';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Admin - Bayraktar Creative',
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  let isAuthenticated = false;
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user && !error) {
        isAuthenticated = true;
      }
    }
  } catch (err) {
    console.error("Supabase not fully connected yet", err);
  }

  return (
    <ToastProvider>
      <ClientLayout isAuthenticated={isAuthenticated}>
        {children}
      </ClientLayout>
    </ToastProvider>
  );
}
