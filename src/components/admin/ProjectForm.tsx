'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/admin/Toast';
import { Loader2 } from 'lucide-react';
import { createProjectAction, updateProjectAction } from '@/app/admin/actions';
import type { Category, CompleteProject, Project } from '@/lib/supabase/types';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectFormProps {
  initialData?: Project | CompleteProject | null;
  categories?: Category[];
}

export default function ProjectForm({ initialData, categories = [] }: ProjectFormProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category_id: initialData?.category_id || (categories[0]?.id || ''),
    client: initialData?.client || '',
    location: initialData?.location || '',
    year: initialData?.year || new Date().getFullYear(),
    hero_aspect_ratio: initialData?.hero_aspect_ratio || '16:9',
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? false,
    sort_order: initialData?.sort_order ?? 0,
    description_tr: initialData?.description_tr || '',
    description_en: initialData?.description_en || '',
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || prev.title === '' ? generateSlug(title) : prev.slug,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('slug', formData.slug);
      data.append('category_id', formData.category_id);
      data.append('client', formData.client);
      data.append('location', formData.location);
      data.append('year', String(formData.year));
      data.append('hero_aspect_ratio', formData.hero_aspect_ratio);
      data.append('featured', formData.featured ? 'true' : 'false');
      data.append('published', formData.published ? 'true' : 'false');
      data.append('sort_order', String(formData.sort_order));
      data.append('description_tr', formData.description_tr);
      data.append('description_en', formData.description_en);

      if (initialData?.id) {
        const result = await updateProjectAction(initialData.id, data);
        if (result?.error) {
          throw new Error(result.error);
        }
        success(t.admin.projectForm.updatedSuccess);
        router.refresh();
      } else {
        const result = await createProjectAction(data);
        if (result?.error) {
          throw new Error(result.error);
        }
        success(t.admin.projectForm.createdSuccess);
        if (result?.project?.id) {
          router.push(`/admin/projects/${result.project.id}`);
        } else {
          router.push('/admin/projects');
        }
      }
    } catch (err: any) {
      console.error('ProjectForm submit error:', err);
      error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
        <h2 className="text-base font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
          {t.admin.projectForm.detailsTab}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.titleLabel} *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Urban Residence"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.slugLabel} *
            </label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. urban-residence"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors font-mono text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.categoryLabel} *
            </label>
            <select
              name="category_id"
              required
              value={formData.category_id}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors text-sm"
            >
              <option value="" disabled>
                {t.admin.projectForm.categoryLabel}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {locale === 'tr' ? cat.name_tr || cat.name_en : cat.name_en || cat.name_tr}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.clientLabel}
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="e.g. Architectural Digest"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.locationLabel}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Istanbul, Turkey"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.yearLabel}
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="2000"
              max="2100"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.heroAspectLabel}
            </label>
            <select
              name="hero_aspect_ratio"
              value={formData.hero_aspect_ratio}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors font-mono text-sm"
            >
              <option value="16:9">16:9 (Landscape Standard)</option>
              <option value="9:16">9:16 (Portrait / Reels)</option>
              <option value="21:9">21:9 (Ultrawide Cinematic)</option>
              <option value="1:1">1:1 (Square)</option>
              <option value="4:5">4:5 (Vertical Editorial)</option>
              <option value="3:4">3:4 (Portrait Medium)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.categories.orderLabel}
            </label>
            <input
              type="number"
              name="sort_order"
              value={formData.sort_order}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.descEnLabel}
            </label>
            <textarea
              name="description_en"
              rows={4}
              value={formData.description_en}
              onChange={handleChange}
              placeholder="English description of the project..."
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              {t.admin.projectForm.descTrLabel}
            </label>
            <textarea
              name="description_tr"
              rows={4}
              value={formData.description_tr}
              onChange={handleChange}
              placeholder="Projenin Türkçe açıklaması..."
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors resize-y"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
        <h2 className="text-base font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
          {t.admin.common.status}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 bg-[#0a0a0a] p-4 border border-[#2a2a2a]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-white bg-[#0a0a0a] border-[#2a2a2a]"
              />
              <span className="text-sm font-bold text-[#f5f5f0]">{t.admin.projectForm.featuredLabel}</span>
            </label>
            <p className="text-xs text-neutral-400 pl-7">
              {t.admin.projectForm.featuredDesc}
            </p>
          </div>

          <div className="space-y-2 bg-[#0a0a0a] p-4 border border-[#2a2a2a]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 accent-white bg-[#0a0a0a] border-[#2a2a2a]"
              />
              <span className="text-sm font-bold text-[#f5f5f0]">{t.admin.projectForm.publishedLabel}</span>
            </label>
            <p className="text-xs text-neutral-400 pl-7">
              {t.admin.projectForm.publishedDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-[#2a2a2a] text-xs font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors rounded-sm cursor-pointer"
        >
          {t.admin.common.cancel}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 bg-[#f5f5f0] text-[#0a0a0a] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50 rounded-sm cursor-pointer"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? t.admin.projectForm.saveBtn : t.admin.projectForm.createBtn}
        </button>
      </div>
    </form>
  );
}
