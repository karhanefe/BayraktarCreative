import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/supabase/queries';
import { AboutClient } from './AboutClient';
import { AboutContent } from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Bayraktar Creative, a premium visual production studio.',
};

export const revalidate = 3600;

export default async function AboutPage() {
  let customAboutText: string | null = null;

  try {
    const fetchedSettings = await getSiteSettings();
    if (fetchedSettings?.about_text) {
      customAboutText = fetchedSettings.about_text;
    }
  } catch (error) {
    // using localized demo default
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bc-black text-bc-white overflow-x-clip">
      <AboutClient />
      <AboutContent customAboutText={customAboutText} />
    </div>
  );
}
