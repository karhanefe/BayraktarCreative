'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/admin/Toast';
import { Loader2 } from 'lucide-react';

interface ProjectFormProps {
  initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category_id: initialData?.category_id || '',
    client: initialData?.client || '',
    location: initialData?.location || '',
    project_date: initialData?.project_date || '',
    description: initialData?.description || '',
    presentation_style: initialData?.presentation_style || 'Auto',
    featured: initialData?.featured || false,
    status: initialData?.status || 'draft',
    tags: initialData?.tags?.join(', ') || '',
    external_url: initialData?.external_url || '',
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || prev.title === '' ? generateSlug(title) : prev.slug,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock submit
      await new Promise((resolve) => setTimeout(resolve, 1000));
      success(initialData ? 'Project updated successfully' : 'Project created successfully');
      
      if (!initialData) {
        // Redirect to edit mode for media upload on new project
        router.push('/admin/projects/mock-id-123');
      } else {
        router.refresh();
      }
    } catch (err: any) {
      error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
        <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">Basic Info</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Slug *</label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            >
              <option value="">Select Category</option>
              <option value="1">Commercial</option>
              <option value="2">Fashion</option>
              <option value="3">Editorial</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Date</label>
            <input
              type="date"
              name="project_date"
              value={formData.project_date}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Description</label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors resize-y"
          />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
        <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">Settings & Meta</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 accent-white bg-[#0a0a0a] border-[#2a2a2a]"
              />
              <span className="text-sm font-medium">Featured Project</span>
            </label>
            <p className="text-xs text-neutral-500 ml-8">Show on homepage featured section</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. nike, shoes, commercial"
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-[#2a2a2a] text-sm font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-[#f5f5f0] text-[#0a0a0a] text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}
