import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/supabase/queries';
import { ContactContent } from '@/components/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Bayraktar Creative for your next visual production project.',
};

export const revalidate = 3600;

export default async function ContactPage() {
  let settings: any = null;

  try {
    const fetchedSettings = await getSiteSettings();
    if (fetchedSettings) settings = fetchedSettings;
  } catch (error) {
    // using demo defaults
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bc-black text-bc-white overflow-x-clip flex flex-col justify-center">
      <ContactContent settings={settings} />
    </div>
  );
}
