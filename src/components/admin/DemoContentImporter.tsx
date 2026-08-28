'use client';

import { useState } from 'react';
import { Database, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { importDemoContentAction } from '@/app/admin/actions';
import { useToast } from '@/components/admin/Toast';
import { useLanguage } from '@/context/LanguageContext';

export default function DemoContentImporter() {
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const { locale } = useLanguage();
  const router = useRouter();

  const handleImport = async () => {
    setLoading(true);
    try {
      const response = await importDemoContentAction();
      if (response?.error) throw new Error(response.error);
      success(locale === 'tr' ? 'Mevcut örnek içerikler admin paneline aktarıldı.' : 'Current example content was imported into the CMS.');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '';
      error(message || (locale === 'tr' ? 'İçerik aktarımı başarısız.' : 'Content import failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleImport}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 border border-amber-700/60 bg-amber-950/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-200 transition-colors hover:bg-amber-900/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
      {locale === 'tr' ? 'Sitedeki örnek içerikleri admin paneline aktar' : 'Import current site examples into CMS'}
    </button>
  );
}
