'use client';

import { useState } from 'react';
import { useToast } from '@/components/admin/Toast';
import { Loader2, Save } from 'lucide-react';
import { updateSettingsAction } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';
import type { SiteSettings } from '@/lib/supabase/types';

interface SettingsClientProps {
  initialSettings: SiteSettings;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const { success, error } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    siteTitleTr: typeof initialSettings.site_title === 'object' ? initialSettings.site_title?.tr || '' : initialSettings.site_title || '',
    siteTitleEn: typeof initialSettings.site_title === 'object' ? initialSettings.site_title?.en || '' : initialSettings.site_title || '',
    tagline: initialSettings.tagline || '',
    contact_email: initialSettings.email || '',
    contact_phone: initialSettings.phone || '',
    instagram: initialSettings.instagram || (initialSettings.social_links as any)?.instagram || '',
    youtube: (initialSettings.social_links as any)?.youtube || '',
    vimeo: (initialSettings.social_links as any)?.vimeo || '',
    about_text: initialSettings.about_text || '',
    contact_text: initialSettings.contact_text || '',
    footer_text: initialSettings.footer_text || '',
    seo_title: initialSettings.seo_title || '',
    seo_description: initialSettings.seo_description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: Record<string, any> = {
        site_title: {
          tr: formData.siteTitleTr,
          en: formData.siteTitleEn,
        },
        tagline: formData.tagline,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        social_links: {
          instagram: formData.instagram,
          youtube: formData.youtube,
          vimeo: formData.vimeo,
        },
        about_text: formData.about_text,
        contact_text: formData.contact_text,
        footer_text: formData.footer_text,
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
      };

      const res = await updateSettingsAction(payload);
      if (res?.error) throw new Error(res.error);

      success('Settings updated successfully in database');
      router.refresh();
    } catch (err: any) {
      console.error('Save settings error:', err);
      error(err.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">Settings</h1>
          <p className="text-neutral-400 text-sm">Manage global studio configurations.</p>
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
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
            Studio Identity & Title
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Site Title (English)
              </label>
              <input
                type="text"
                name="siteTitleEn"
                value={formData.siteTitleEn}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Site Title (Turkish)
              </label>
              <input
                type="text"
                name="siteTitleTr"
                value={formData.siteTitleTr}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Tagline
              </label>
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
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
            Contact & Social Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Phone / WhatsApp
              </label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                YouTube URL
              </label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
            Studio Content & Bio
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                About Text (Editorial Statement)
              </label>
              <textarea
                name="about_text"
                rows={4}
                value={formData.about_text}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors resize-y"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Contact Page Lead Text
              </label>
              <textarea
                name="contact_text"
                rows={3}
                value={formData.contact_text}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors resize-y"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-6">
          <h2 className="text-lg font-bold tracking-wider mb-4 border-b border-[#2a2a2a] pb-4">
            SEO & Metadata
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Default SEO Title
              </label>
              <input
                type="text"
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-3 text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Default SEO Description
              </label>
              <textarea
                name="seo_description"
                rows={3}
                value={formData.seo_description}
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
