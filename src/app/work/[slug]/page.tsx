import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPublishedProjects, getRelatedProjects } from '@/lib/supabase/queries';
import { ProjectDetailClient } from './ProjectDetailClient';
import { ProjectDetailContent } from '@/components/portfolio/ProjectDetailContent';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const coverUrl = project.media?.find((item) => item.is_hero)?.url || project.media?.[0]?.url || '';

  return {
    title: project.title,
    description: project.description_en || project.description_tr || `View the ${project.title} project by Bayraktar Creative.`,
    openGraph: {
      images: coverUrl ? [coverUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(project.id, project.category_id || undefined, 3);

  const media: any[] = project.media || [];

  return (
    <div className="bg-bc-black min-h-screen text-bc-white overflow-x-clip pb-32">
      <ProjectDetailClient media={media} />
      <ProjectDetailContent project={project} related={related} />
    </div>
  );
}
