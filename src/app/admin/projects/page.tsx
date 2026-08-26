import { getAllProjects, getAllCategories } from '@/lib/supabase/admin-queries';
import ProjectsListClient from './ProjectsListClient';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getAllCategories(),
  ]);

  return <ProjectsListClient initialProjects={projects} categories={categories} />;
}
