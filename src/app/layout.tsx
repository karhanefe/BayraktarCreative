import type { Metadata } from 'next';
import { bodyFont, displayFont } from '@/lib/fonts';
import { LanguageProvider } from '@/context/LanguageContext';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PageTransition } from '@/components/ui/PageTransition';
import { getSiteSettings } from '@/lib/supabase/queries';
import './globals.css';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seo_title || 'BAYRAKTAR CREATIVE | Visual Production Studio';
  return {
    title: {
      default: title,
      template: `%s | ${title.split('|')[0].trim()}`,
    },
    description: settings.seo_description || 'Premium visual production studio focused on capturing exceptional spaces, motion, and products.',
    openGraph: settings.og_image ? { images: [settings.og_image] } : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="tr" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="bg-bc-black text-bc-white font-body antialiased">
        <LanguageProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header siteTitle={settings.site_title} />
            <PageTransition>
              <main className="flex-1 min-h-screen flex flex-col">{children}</main>
            </PageTransition>
            <Footer settings={settings} />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
