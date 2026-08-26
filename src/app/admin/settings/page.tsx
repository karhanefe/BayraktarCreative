'use client';

import { useState } from 'react';
import { useToast } from '@/components/admin/Toast';
import { Loader2, Save } from 'lucide-react';

export default function SettingsPage() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    siteTitle: 'Bayraktar Creative',
    tagline: 'Visual Architecture & Creative Direction',
    email: 'hello@bayraktarcreative.com',
    phone: '+90 555 123 4567',
    instagram: 'https://instagram.com/bayraktarcreative',
    aboutText: 'We build visual experiences for modern brands.',
    seoTitle: 'Bayraktar Creative | Portfolio',
    seoDesc: 'Portfolio of Bayraktar Creative, specializing in visual direction.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      success('Settings updated successfully');
    } catch (err) {
      error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">Settings</h1>
          <p className="text-neutral-400 text-sm">Manage global site configurations.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-[#f5f5f0] text-[#0a0a0a] px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Site Title</label>
              <input
                type="text"
                name="siteTitle"
                value={formData.siteTitle}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">Content</h2>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">About Text</label>
            <textarea
              name="aboutText"
              rows={4}
              value={formData.aboutText}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors resize-y"
            />
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">SEO Defaults</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Default SEO Title</label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Default SEO Description</label>
              <textarea
                name="seoDesc"
                rows={3}
                value={formData.seoDesc}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors resize-y"
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
