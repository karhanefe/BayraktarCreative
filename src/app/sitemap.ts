import { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/lib/supabase/queries';
import { demoProjects } from '@/lib/demo-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bayraktarcreative.com';

  let projects = demoProjects;
  try {
    const fetchedProjects = await getPublishedProjects();
    if (fetchedProjects && fetchedProjects.length > 0) projects = fetchedProjects;
  } catch (error) {
    console.error('Supabase fetch failed for sitemap, using demo data', error);
  }

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(project.updated_at || project.created_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = ['', '/work', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.9,
  }));

  return [...routes, ...projectUrls];
}
