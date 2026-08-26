import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getRelatedProjects } from '@/lib/supabase/queries';
import { demoProjects } from '@/lib/demo-data';
import { ProjectDetailClient } from './ProjectDetailClient';
import { ProjectDetailContent } from '@/components/portfolio/ProjectDetailContent';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return demoProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  let project: any = demoProjects.find((p) => p.slug === resolvedParams.slug);

  try {
    const fetchedProject = await getProjectBySlug(resolvedParams.slug);
    if (fetchedProject) project = fetchedProject;
  } catch (error) {
    // using demo data
  }

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const coverUrl = project.media?.[0]?.url || project.cover_image || '';

  return {
    title: project.title,
    description: project.description || `View the ${project.title} project by Bayraktar Creative.`,
    openGraph: {
      images: coverUrl ? [coverUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  let project: any = demoProjects.find((p) => p.slug === resolvedParams.slug);
  let related: any[] = demoProjects.filter((p) => p.slug !== resolvedParams.slug).slice(0, 3);

  try {
    const fetchedProject = await getProjectBySlug(resolvedParams.slug);
    if (fetchedProject) {
      project = fetchedProject;
      const fetchedRelated = await getRelatedProjects(fetchedProject.id, fetchedProject.category_id || undefined, 3);
      if (fetchedRelated && fetchedRelated.length > 0) related = fetchedRelated;
    }
  } catch (error) {
    console.warn('Supabase fetch failed, using demo data', error);
  }

  if (!project) {
    notFound();
  }

  const media: any[] = project.media || [];

  return (
    <div className="bg-bc-black min-h-screen text-bc-white overflow-x-clip pb-32">
      <ProjectDetailClient media={media} />
      <ProjectDetailContent project={project} related={related} />
    </div>
  );
}
