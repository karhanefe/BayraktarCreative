import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ProjectForm from '@/components/admin/ProjectForm';
import { getProjectById, getAllCategories } from '@/lib/supabase/admin-queries';
import ProjectMediaManager from './ProjectMediaManager';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;

  const [project, categories] = await Promise.all([
    getProjectById(id),
    getAllCategories(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/projects"
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
            </Link>
          </div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">{project.title}</h1>
          <p className="text-neutral-400 text-sm">
            Slug: <span className="text-neutral-300 font-mono">/work/{project.slug}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {project.published && (
            <a
              href={`/work/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs uppercase tracking-widest font-bold border border-[#2a2a2a] text-neutral-300 hover:text-white hover:bg-[#1a1a1a] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Public Page
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6">
            <h2 className="text-lg font-bold tracking-wider mb-6 pb-4 border-b border-[#2a2a2a]">
              Media Assets & Uploader
            </h2>
            <ProjectMediaManager projectId={project.id} initialMedia={project.media || []} />
          </section>
        </div>

        <div className="lg:col-span-5">
          <ProjectForm initialData={project} categories={categories} />
        </div>
      </div>
    </div>
  );
}
