'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Copy, Edit, ExternalLink, ImageIcon } from 'lucide-react';
import type { Category, CompleteProject } from '@/lib/supabase/types';
import { deleteProjectAction, duplicateProjectAction } from '@/app/admin/actions';
import { useToast } from '@/components/admin/Toast';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useRouter } from 'next/navigation';

interface ProjectsListClientProps {
  initialProjects: CompleteProject[];
  categories: Category[];
}

export default function ProjectsListClient({ initialProjects, categories }: ProjectsListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { success, error } = useToast();
  const router = useRouter();

  const filteredProjects = initialProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.client && project.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || project.category_id === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'published' && project.published) ||
      (selectedStatus === 'draft' && !project.published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsProcessing(true);
    try {
      const res = await deleteProjectAction(deleteId);
      if (res?.error) {
        throw new Error(res.error);
      }
      success('Project deleted successfully');
      setDeleteId(null);
      router.refresh();
    } catch (err: any) {
      error(err.message || 'Failed to delete project');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    setIsProcessing(true);
    try {
      const res = await duplicateProjectAction(id);
      if (res?.error) {
        throw new Error(res.error);
      }
      success('Project duplicated successfully');
      router.refresh();
    } catch (err: any) {
      error(err.message || 'Failed to duplicate project');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">Projects</h1>
          <p className="text-neutral-400 text-sm">
            Manage your portfolio projects ({initialProjects.length} total).
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-[#f5f5f0] text-[#0a0a0a] px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1a1a] p-4 border border-[#2a2a2a]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search projects by title, client, slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] pl-10 pr-4 py-2 text-sm text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-neutral-300 focus:outline-none focus:border-neutral-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name_en} / {cat.name_tr}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-neutral-300 focus:outline-none focus:border-neutral-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-12 text-center flex flex-col items-center justify-center">
          <p className="text-neutral-400 mb-4 tracking-widest text-sm uppercase">
            {initialProjects.length === 0 ? 'No Projects In Database Yet' : 'No matching projects found'}
          </p>
          <Link
            href="/admin/projects/new"
            className="text-[#f5f5f0] border-b border-[#f5f5f0] pb-0.5 hover:text-neutral-300 transition-colors"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredProjects.map((project) => {
            const heroMedia = project.media?.find((m) => m.is_hero) || project.media?.[0];
            return (
              <div
                key={project.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-neutral-700 transition-colors group"
              >
                <div className="w-full sm:w-48 h-32 bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center overflow-hidden shrink-0 relative">
                  {heroMedia ? (
                    heroMedia.type === 'image' ? (
                      <img src={heroMedia.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <video src={heroMedia.url} poster={heroMedia.poster_url || undefined} className="w-full h-full object-cover" muted />
                    )
                  ) : (
                    <div className="flex flex-col items-center text-neutral-600 text-xs gap-1">
                      <ImageIcon className="w-5 h-5" />
                      <span>No Media</span>
                    </div>
                  )}
                  {project.hero_aspect_ratio && (
                    <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-[10px] text-neutral-300 uppercase tracking-wider">
                      {project.hero_aspect_ratio}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="text-lg font-bold text-[#f5f5f0] truncate">{project.title}</h3>
                    {project.featured && (
                      <span className="text-[10px] uppercase tracking-wider bg-yellow-950/30 text-yellow-500 border border-yellow-900 px-2 py-0.5">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
                    <span className="text-neutral-300 font-medium">
                      {project.category?.name_en || project.category?.name_tr || 'Uncategorized'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span>{project.year || (project.created_at ? new Date(project.created_at).getFullYear() : '')}</span>
                    {project.client && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-neutral-700" />
                        <span className="text-neutral-400">Client: {project.client}</span>
                      </>
                    )}
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span>{project.media?.length || 0} media</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 mt-4 sm:mt-0">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-sm border uppercase tracking-wider ${
                      project.published
                        ? 'bg-green-950/30 text-green-500 border-green-900'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                    }`}
                  >
                    {project.published ? 'published' : 'draft'}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.published && (
                      <a
                        href={`/work/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-[#0a0a0a] border border-[#2a2a2a] text-neutral-400 hover:text-white transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDuplicate(project.id)}
                      disabled={isProcessing}
                      className="p-2 bg-[#0a0a0a] border border-[#2a2a2a] text-neutral-400 hover:text-white transition-colors"
                      title="Duplicate Project"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#2a2a2a] hover:bg-[#333] transition-colors text-[#f5f5f0]"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(project.id)}
                      disabled={isProcessing}
                      className="p-2 bg-red-950/50 text-red-500 hover:bg-red-900/50 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Project"
        description="Are you sure you want to delete this project? All associated media references will also be removed. This action cannot be undone."
        confirmText="Delete"
        isDestructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
