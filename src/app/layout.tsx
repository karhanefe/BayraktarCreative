import type { Metadata } from 'next';
import { bodyFont, displayFont } from '@/lib/fonts';
import { LanguageProvider } from '@/context/LanguageContext';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PageTransition } from '@/components/ui/PageTransition';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BAYRAKTAR CREATIVE | Visual Production Studio',
    template: '%s | BAYRAKTAR CREATIVE',
  },
  description: 'Premium visual production studio focused on capturing exceptional spaces, motion, and products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="bg-bc-black text-bc-white font-body antialiased">
        <LanguageProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <PageTransition>
              <main className="flex-1 min-h-screen flex flex-col">{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
