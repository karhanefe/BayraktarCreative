import { createPublicClient } from './public';
import type { Category, Project, Media, SiteSettings, CompleteProject, ProjectWithCategory, ProjectWithMedia } from './types';
import { demoProjects, demoCategories, demoSiteSettings } from '../demo-data';

export type { Category, Project, Media, SiteSettings, CompleteProject, ProjectWithCategory, ProjectWithMedia };

function isDemoMode() {
  return process.env.DEMO_MODE === 'true' || (
    process.env.NODE_ENV !== 'production' &&
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export async function getPublishedProjects(categorySlug?: string): Promise<CompleteProject[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      if (isDemoMode() && categorySlug) {
        return demoProjects.filter((p) => p.category?.slug === categorySlug);
      }
      return isDemoMode() ? demoProjects : [];
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

    return (data as CompleteProject[]).map((project) => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    }));
  } catch (err) {
    console.warn('Supabase getPublishedProjects fallback to demo data:', err);
    if (isDemoMode() && categorySlug) {
      return demoProjects.filter((p) => p.category?.slug === categorySlug);
    }
    return isDemoMode() ? demoProjects : [];
  }
}

export async function getFeaturedProjects(): Promise<CompleteProject[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return isDemoMode() ? demoProjects.filter((p) => p.featured) : [];
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

    return (data as CompleteProject[]).map((project) => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    }));
  } catch (err) {
    console.warn('Supabase getFeaturedProjects fallback to demo data:', err);
    return isDemoMode() ? demoProjects.filter((p) => p.featured) : [];
  }
}

export async function getProjectBySlug(slug: string): Promise<CompleteProject | null> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return isDemoMode() ? demoProjects.find((p) => p.slug === slug) || null : null;
    }

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:media(*)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
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
    return isDemoMode() ? demoProjects.find((p) => p.slug === slug) || null : null;
  }
}

export async function getProjectMedia(projectId: string): Promise<Media[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      const proj = isDemoMode() ? demoProjects.find((p) => p.id === projectId) : null;
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
    const proj = isDemoMode() ? demoProjects.find((p) => p.id === projectId) : null;
    return proj?.media || [];
  }
}

export async function getVisibleCategories(): Promise<Category[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return isDemoMode() ? demoCategories : [];
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data) throw error;
    return data as Category[];
  } catch (err) {
    console.warn('Supabase getVisibleCategories fallback to demo data:', err);
    return isDemoMode() ? demoCategories : [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return isDemoMode() ? demoCategories.find((c) => c.slug === slug) || null : null;
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    return data as Category;
  } catch (err) {
    console.warn(`Supabase getCategoryBySlug(${slug}) fallback to demo data:`, err);
    return isDemoMode() ? demoCategories.find((c) => c.slug === slug) || null : null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createPublicClient();
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
    const supabase = createPublicClient();
    if (!supabase) {
      return isDemoMode() ? demoProjects.filter((p) => p.id !== currentProjectId).slice(0, limit) : [];
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

    return (data as CompleteProject[]).map((project) => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    }));
  } catch (err) {
    console.warn('Supabase getRelatedProjects fallback to demo data:', err);
    return isDemoMode() ? demoProjects.filter((p) => p.id !== currentProjectId).slice(0, limit) : [];
  }
}
