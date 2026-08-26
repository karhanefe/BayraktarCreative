import { getSiteSettings } from '@/lib/supabase/queries';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return <SettingsClient initialSettings={settings} />;
}
