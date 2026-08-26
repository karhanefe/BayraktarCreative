import { getFeaturedProjects, getVisibleCategories, getSiteSettings, getPublishedProjects } from '@/lib/supabase/queries';
import { demoProjects, demoCategories, demoSiteSettings } from '@/lib/demo-data';
import { Hero } from '@/components/home/Hero';
import { Statement } from '@/components/home/Statement';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { HorizontalPortfolio } from '@/components/home/HorizontalPortfolio';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ContactCTA } from '@/components/home/ContactCTA';

export const revalidate = 3600;

export default async function Home() {
  let featuredProjects = demoProjects.filter((p) => p.featured);
  let allProjects = demoProjects;
  let categories = demoCategories;
  let customAboutText: string | null = null;

  try {
    const [fetchedFeatured, fetchedAll, fetchedCategories, fetchedSettings] = await Promise.all([
      getFeaturedProjects(),
      getPublishedProjects(),
      getVisibleCategories(),
      getSiteSettings(),
    ]);

    if (fetchedFeatured && fetchedFeatured.length > 0) featuredProjects = fetchedFeatured;
    if (fetchedAll && fetchedAll.length > 0) allProjects = fetchedAll;
    if (fetchedCategories && fetchedCategories.length > 0) categories = fetchedCategories;
    if (fetchedSettings?.about_text && fetchedSettings.about_text !== demoSiteSettings.about_text) {
      customAboutText = fetchedSettings.about_text;
    }
  } catch (error) {
    // using dynamic bilingual defaults
  }

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <Hero projects={featuredProjects} />
      <Statement text={customAboutText} />
      <FeaturedWork projects={featuredProjects} />
      <HorizontalPortfolio projects={allProjects} />
      <CategoryShowcase categories={categories} />
      <AboutPreview text={customAboutText} />
      <ContactCTA />
    </div>
  );
}
