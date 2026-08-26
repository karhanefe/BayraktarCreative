'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, Loader2, Folder } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';
import type { Category } from '@/lib/supabase/types';

interface CategoriesClientProps {
  initialCategories: Category[];
}

export default function CategoriesClient({ initialCategories }: CategoriesClientProps) {
  const { success, error } = useToast();
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name_tr: '',
    name_en: '',
    slug: '',
    sort_order: 0,
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleEnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name_en = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name_en,
      slug: prev.slug === generateSlug(prev.name_en) || prev.name_en === '' ? generateSlug(name_en) : prev.slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const res = await updateCategoryAction(editingId, {
          name_tr: formData.name_tr,
          name_en: formData.name_en,
          slug: formData.slug,
          sort_order: formData.sort_order,
        });
        if (res?.error) throw new Error(res.error);
        success('Category updated successfully');
      } else {
        const res = await createCategoryAction({
          name_tr: formData.name_tr,
          name_en: formData.name_en,
          slug: formData.slug,
          sort_order: formData.sort_order,
        });
        if (res?.error) throw new Error(res.error);
        success('Category created successfully');
      }

      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name_tr: '', name_en: '', slug: '', sort_order: 0 });
      router.refresh();
    } catch (err: any) {
      error(err.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (cat: Category) => {
    setFormData({
      name_tr: cat.name_tr,
      name_en: cat.name_en,
      slug: cat.slug,
      sort_order: cat.sort_order || 0,
    });
    setEditingId(cat.id);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await deleteCategoryAction(deleteId);
      if (res?.error) throw new Error(res.error);
      success('Category deleted successfully');
      setDeleteId(null);
      router.refresh();
    } catch (err: any) {
      error(err.message || 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">Categories</h1>
          <p className="text-neutral-400 text-sm">
            Manage your project categories ({initialCategories.length} categories).
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name_tr: '',
              name_en: '',
              slug: '',
              sort_order: initialCategories.length,
            });
            setEditingId(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 bg-[#f5f5f0] text-[#0a0a0a] px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" /> New Category
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSave} className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 mb-8 animate-in slide-in-from-top-4 space-y-4">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
            {editingId ? 'Edit Category' : 'New Category'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                English Name *
              </label>
              <input
                type="text"
                required
                value={formData.name_en}
                onChange={handleEnNameChange}
                placeholder="e.g. Architecture & Real Estate"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Turkish Name *
              </label>
              <input
                type="text"
                required
                value={formData.name_tr}
                onChange={(e) => setFormData((prev) => ({ ...prev, name_tr: e.target.value }))}
                placeholder="Örn. Mimari & Gayrimenkul"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. architecture"
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value, 10) || 0 }))}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 border border-[#2a2a2a] text-sm font-bold uppercase tracking-wider hover:bg-[#2a2a2a]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#f5f5f0] text-[#0a0a0a] text-sm font-bold uppercase tracking-wider hover:bg-white flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Category
            </button>
          </div>
        </form>
      )}

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] divide-y divide-[#2a2a2a]">
        {initialCategories.map((cat) => (
          <div key={cat.id} className="p-4 flex items-center gap-4 hover:bg-[#2a2a2a]/30 transition-colors group">
            <div className="w-8 h-8 rounded-sm bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center text-neutral-500 shrink-0">
              <Folder className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#f5f5f0] flex items-center gap-2">
                <span>{cat.name_en}</span>
                <span className="text-neutral-500 font-normal text-xs">/ {cat.name_tr}</span>
              </h3>
              <div className="text-xs text-neutral-400 mt-1 flex items-center gap-3">
                <span className="font-mono text-neutral-500">slug: {cat.slug}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span>order: {cat.sort_order ?? 0}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(cat)}
                className="p-2 text-neutral-400 hover:text-white hover:bg-[#2a2a2a] transition-colors rounded-sm"
                title="Edit Category"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteId(cat.id)}
                className="p-2 text-red-500/70 hover:text-red-500 hover:bg-red-950/50 transition-colors rounded-sm"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {initialCategories.length === 0 && (
          <div className="p-8 text-center text-neutral-500 text-sm">No categories found in database.</div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Category?"
        description="Projects assigned to this category may need to be updated. Are you sure you want to delete it?"
        isDestructive
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
