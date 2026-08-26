import { Metadata } from 'next';
import { getPublishedProjects, getVisibleCategories } from '@/lib/supabase/queries';
import { demoProjects, demoCategories } from '@/lib/demo-data';
import { ProjectGrid } from '@/components/portfolio/ProjectGrid';
import { WorkHeader } from '@/components/portfolio/WorkHeader';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore our selected portfolio of visual production projects.',
};

export const revalidate = 3600;

export default async function WorkPage() {
  let projects = demoProjects;
  let categories = demoCategories;

  try {
    const [fetchedProjects, fetchedCategories] = await Promise.all([
      getPublishedProjects(),
      getVisibleCategories(),
    ]);

    if (fetchedProjects && fetchedProjects.length > 0) projects = fetchedProjects;
    if (fetchedCategories && fetchedCategories.length > 0) categories = fetchedCategories;
  } catch (error) {
    console.warn('Supabase fetch failed, using demo data', error);
  }

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 lg:px-12 max-w-[2000px] mx-auto min-h-screen overflow-x-clip">
      <WorkHeader />
      <ProjectGrid projects={projects} categories={categories} />
    </div>
  );
}
