'use client';

import { useState } from 'react';
import { Plus, GripVertical, Trash2, Edit2 } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function CategoriesPage() {
  const { success } = useToast();
  const [categories, setCategories] = useState([
    { id: '1', name: 'Commercial', slug: 'commercial', count: 12, isVisible: true },
    { id: '2', name: 'Fashion', slug: 'fashion', count: 8, isVisible: true },
    { id: '3', name: 'Editorial', slug: 'editorial', count: 4, isVisible: false },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: '', slug: '', isVisible: true });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug === prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || prev.name === '' 
        ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : prev.slug
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
      success('Category updated');
    } else {
      setCategories(prev => [...prev, { id: Math.random().toString(), count: 0, ...formData }]);
      success('Category created');
    }
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', slug: '', isVisible: true });
  };

  const openEdit = (cat: any) => {
    setFormData({ name: cat.name, slug: cat.slug, isVisible: cat.isVisible });
    setEditingId(cat.id);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">Categories</h1>
          <p className="text-neutral-400 text-sm">Manage your project categories.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: '', slug: '', isVisible: true });
            setEditingId(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 bg-[#f5f5f0] text-[#0a0a0a] px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" /> New Category
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSave} className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 mb-8 animate-in slide-in-from-top-4">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
            {editingId ? 'Edit Category' : 'New Category'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                className="w-5 h-5 accent-white bg-[#0a0a0a] border-[#2a2a2a]"
              />
              <span className="text-sm font-medium">Visible on site</span>
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 border border-[#2a2a2a] text-sm font-bold uppercase tracking-wider hover:bg-[#2a2a2a]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#f5f5f0] text-[#0a0a0a] text-sm font-bold uppercase tracking-wider hover:bg-white"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] divide-y divide-[#2a2a2a]">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 flex items-center gap-4 hover:bg-[#2a2a2a]/30 transition-colors group">
            <button className="text-neutral-500 cursor-move hover:text-white">
              <GripVertical className="w-5 h-5" />
            </button>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#f5f5f0] flex items-center gap-2">
                {cat.name}
                {!cat.isVisible && (
                  <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 uppercase tracking-wider">Hidden</span>
                )}
              </h3>
              <div className="text-sm text-neutral-400 mt-1 flex items-center gap-3">
                <span>/{cat.slug}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span>{cat.count} projects</span>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => openEdit(cat)}
                className="p-2 text-neutral-400 hover:text-white hover:bg-[#2a2a2a] transition-colors rounded-sm"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setDeleteId(cat.id)}
                className="p-2 text-red-500/70 hover:text-red-500 hover:bg-red-950/50 transition-colors rounded-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="p-8 text-center text-neutral-500 text-sm">No categories found.</div>
        )}
      </div>

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Category?"
        description="Projects in this category will not be deleted, but will lose this categorization. This cannot be undone."
        onConfirm={() => {
          if (deleteId) {
            setCategories(prev => prev.filter(c => c.id !== deleteId));
            success('Category deleted');
          }
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
