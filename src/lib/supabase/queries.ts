import { createClient } from './server';
import type { Category, Project, Media, SiteSettings, CompleteProject, ProjectWithCategory, ProjectWithMedia } from './types';
import { demoProjects, demoCategories, demoSiteSettings } from '../demo-data';

export type { Category, Project, Media, SiteSettings, CompleteProject, ProjectWithCategory, ProjectWithMedia };

export async function getPublishedProjects(categorySlug?: string): Promise<CompleteProject[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      if (categorySlug) {
        return demoProjects.filter((p) => p.category?.slug === categorySlug);
      }
      return demoProjects;
    }

    let query = supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:media(*)
      `)
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (categorySlug) {
      const category = await getCategoryBySlug(categorySlug);
      if (category) {
        query = query.eq('category_id', category.id);
      } else {
        return [];
      }
    }

    const { data, error } = await query;
    if (error || !data) throw error;

    if (data.length === 0) {
      // Fallback to demo projects if database is empty so visual layout continues working
      if (categorySlug) {
        return demoProjects.filter((p) => p.category?.slug === categorySlug);
      }
      return demoProjects;
    }

    return (data as CompleteProject[]).map((project) => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    }));
  } catch (err) {
    console.warn('Supabase getPublishedProjects fallback to demo data:', err);
    if (categorySlug) {
      return demoProjects.filter((p) => p.category?.slug === categorySlug);
    }
    return demoProjects;
  }
}

export async function getFeaturedProjects(): Promise<CompleteProject[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoProjects.filter((p) => p.featured);
    }

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:media(*)
      `)
      .eq('published', true)
      .eq('featured', true)
      .order('sort_order', { ascending: true });

    if (error || !data) throw error;

    if (data.length === 0) {
      return demoProjects.filter((p) => p.featured);
    }

    return (data as CompleteProject[]).map((project) => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    }));
  } catch (err) {
    console.warn('Supabase getFeaturedProjects fallback to demo data:', err);
    return demoProjects.filter((p) => p.featured);
  }
}

export async function getProjectBySlug(slug: string): Promise<CompleteProject | null> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoProjects.find((p) => p.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:media(*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return demoProjects.find((p) => p.slug === slug) || null;
      }
      throw error;
    }

    const project = data as CompleteProject;
    if (project.media) {
      project.media = project.media.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    }

    return project;
  } catch (err) {
    console.warn(`Supabase getProjectBySlug(${slug}) fallback to demo data:`, err);
    return demoProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getProjectMedia(projectId: string): Promise<Media[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      const proj = demoProjects.find((p) => p.id === projectId);
      return proj?.media || [];
    }

    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order', { ascending: true });

    if (error || !data) throw error;
    return data as Media[];
  } catch (err) {
    console.warn(`Supabase getProjectMedia(${projectId}) fallback to demo data:`, err);
    const proj = demoProjects.find((p) => p.id === projectId);
    return proj?.media || [];
  }
}

export async function getVisibleCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoCategories;
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data) throw error;
    if (data.length === 0) return demoCategories;
    return data as Category[];
  } catch (err) {
    console.warn('Supabase getVisibleCategories fallback to demo data:', err);
    return demoCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoCategories.find((c) => c.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return demoCategories.find((c) => c.slug === slug) || null;
      }
      throw error;
    }
    return data as Category;
  } catch (err) {
    console.warn(`Supabase getCategoryBySlug(${slug}) fallback to demo data:`, err);
    return demoCategories.find((c) => c.slug === slug) || null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoSiteSettings;
    }

    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error || !data || data.length === 0) {
      return demoSiteSettings;
    }

    const settingsObj: Record<string, any> = { ...demoSiteSettings };
    for (const row of data) {
      settingsObj[row.key] = row.value;
    }

    return {
      site_title: settingsObj.site_title || demoSiteSettings.site_title,
      tagline: settingsObj.tagline || demoSiteSettings.tagline,
      phone: settingsObj.contact_phone || settingsObj.phone || demoSiteSettings.phone,
      email: settingsObj.contact_email || settingsObj.email || demoSiteSettings.email,
      instagram: settingsObj.social_links?.instagram || settingsObj.instagram || demoSiteSettings.instagram,
      whatsapp: settingsObj.social_links?.whatsapp || settingsObj.whatsapp || demoSiteSettings.whatsapp,
      about_text: settingsObj.about_text || demoSiteSettings.about_text,
      contact_text: settingsObj.contact_text || demoSiteSettings.contact_text,
      footer_text: settingsObj.footer_text || demoSiteSettings.footer_text,
      seo_title: settingsObj.seo_title || demoSiteSettings.seo_title,
      seo_description: settingsObj.seo_description || demoSiteSettings.seo_description,
      og_image: settingsObj.og_image || demoSiteSettings.og_image,
      social_links: settingsObj.social_links || demoSiteSettings.social_links,
      updated_at: data[0]?.updated_at || new Date().toISOString(),
    };
  } catch (err) {
    console.warn('Supabase getSiteSettings fallback to demo data:', err);
    return demoSiteSettings;
  }
}

export async function getRelatedProjects(currentProjectId: string, categoryId?: string, limit: number = 4): Promise<CompleteProject[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoProjects.filter((p) => p.id !== currentProjectId).slice(0, limit);
    }

    let query = supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:media(*)
      `)
      .eq('published', true)
      .neq('id', currentProjectId)
      .limit(limit);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    if (error || !data) throw error;

    if (data.length === 0) {
      return demoProjects.filter((p) => p.id !== currentProjectId).slice(0, limit);
    }

    return (data as CompleteProject[]).map((project) => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    }));
  } catch (err) {
    console.warn('Supabase getRelatedProjects fallback to demo data:', err);
    return demoProjects.filter((p) => p.id !== currentProjectId).slice(0, limit);
  }
}
