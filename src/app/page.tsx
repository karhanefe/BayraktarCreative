import { getFeaturedProjects, getVisibleCategories, getSiteSettings, getPublishedProjects } from '@/lib/supabase/queries';
import { demoSiteSettings } from '@/lib/demo-data';
import { Hero } from '@/components/home/Hero';
import { Statement } from '@/components/home/Statement';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { HorizontalPortfolio } from '@/components/home/HorizontalPortfolio';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ContactCTA } from '@/components/home/ContactCTA';

export const revalidate = 3600;

export default async function Home() {
  const [featuredProjects, allProjects, categories, settings] = await Promise.all([
    getFeaturedProjects(),
    getPublishedProjects(),
    getVisibleCategories(),
    getSiteSettings(),
  ]);
  let customAboutText: string | null = null;

  if (settings?.about_text && settings.about_text !== demoSiteSettings.about_text) {
    customAboutText = settings.about_text;
  }

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <Hero projects={featuredProjects} tagline={settings?.tagline} />
      <Statement text={customAboutText} />
      <FeaturedWork projects={featuredProjects} />
      <HorizontalPortfolio projects={allProjects} />
      <CategoryShowcase categories={categories} />
      <AboutPreview text={customAboutText} />
      <ContactCTA email={settings?.email} contactText={settings?.contact_text} />
    </div>
  );
}
