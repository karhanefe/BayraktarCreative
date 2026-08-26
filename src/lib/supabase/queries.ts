import { createClient } from './server';
import type { Category, ProjectWithCategory, ProjectMedia, SiteSettings, CompleteProject, ProjectWithMedia } from './types';
import { demoProjects, demoCategories, demoSiteSettings } from '../demo-data';

export type { Category, ProjectWithCategory, ProjectMedia, SiteSettings, CompleteProject, ProjectWithMedia };

export async function getPublishedProjects(categorySlug?: string): Promise<CompleteProject[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      if (categorySlug) {
        return demoProjects.filter(p => p.category?.slug === categorySlug);
      }
      return demoProjects;
    }

    let query = supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:project_media(*)
      `)
      .eq('is_published', true)
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
    
    return (data as CompleteProject[]).map(project => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    }));
  } catch (err) {
    console.warn('Supabase getPublishedProjects fallback to demo data');
    if (categorySlug) {
      return demoProjects.filter(p => p.category?.slug === categorySlug);
    }
    return demoProjects;
  }
}

export async function getFeaturedProjects(): Promise<CompleteProject[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoProjects.filter(p => p.is_featured);
    }

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:project_media(*)
      `)
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('featured_order', { ascending: true });

    if (error || !data) throw error;
    
    return (data as CompleteProject[]).map(project => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    }));
  } catch (err) {
    console.warn('Supabase getFeaturedProjects fallback to demo data');
    return demoProjects.filter(p => p.is_featured);
  }
}

export async function getProjectBySlug(slug: string): Promise<CompleteProject | null> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoProjects.find(p => p.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:project_media(*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    const project = data as CompleteProject;
    if (project.media) {
      project.media = project.media.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    }
    
    return project;
  } catch (err) {
    console.warn(`Supabase getProjectBySlug(${slug}) fallback to demo data`);
    return demoProjects.find(p => p.slug === slug) || null;
  }
}

export async function getProjectMedia(projectId: string): Promise<ProjectMedia[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      const proj = demoProjects.find(p => p.id === projectId);
      return proj?.media || [];
    }

    const { data, error } = await supabase
      .from('project_media')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order', { ascending: true });

    if (error || !data) throw error;
    return data as ProjectMedia[];
  } catch (err) {
    console.warn(`Supabase getProjectMedia(${projectId}) fallback to demo data`);
    const proj = demoProjects.find(p => p.id === projectId);
    return proj?.media || [];
  }
}

export async function getVisibleCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoCategories.filter(c => c.is_visible);
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (error || !data) throw error;
    return data as Category[];
  } catch (err) {
    console.warn('Supabase getVisibleCategories fallback to demo data');
    return demoCategories.filter(c => c.is_visible);
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoCategories.find(c => c.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Category;
  } catch (err) {
    console.warn(`Supabase getCategoryBySlug(${slug}) fallback to demo data`);
    return demoCategories.find(c => c.slug === slug) || null;
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
      .select('*')
      .single();

    if (error) {
      return demoSiteSettings;
    }
    
    return data as SiteSettings;
  } catch (err) {
    console.warn('Supabase getSiteSettings fallback to demo data');
    return demoSiteSettings;
  }
}

export async function getRelatedProjects(currentProjectId: string, categoryId?: string, limit: number = 4): Promise<CompleteProject[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return demoProjects.filter(p => p.id !== currentProjectId).slice(0, limit);
    }

    let query = supabase
      .from('projects')
      .select(`
        *,
        category:categories(*),
        media:project_media(*)
      `)
      .eq('is_published', true)
      .neq('id', currentProjectId)
      .limit(limit);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    if (error || !data) throw error;
    
    return (data as CompleteProject[]).map(project => ({
      ...project,
      media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    }));
  } catch (err) {
    console.warn('Supabase getRelatedProjects fallback to demo data');
    return demoProjects.filter(p => p.id !== currentProjectId).slice(0, limit);
  }
}
