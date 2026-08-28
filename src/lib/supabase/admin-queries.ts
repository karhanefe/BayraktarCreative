import { createClient } from './server';
import type { Database, Project, Category, Media, CompleteProject } from './types';
import { demoCategories, demoProjects, demoSiteSettings } from '../demo-data';

export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;

  const { data, error } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('auth_user_id', userId)
    .eq('is_active', true)
    .single();

  if (error || !data) return false;
  return data.role === 'admin';
}

export async function getAdminStats(): Promise<{
  total: number;
  published: number;
  draft: number;
  categories: number;
  media: number;
}> {
  const supabase = await createClient();
  if (!supabase) {
    return { total: 0, published: 0, draft: 0, categories: 0, media: 0 };
  }

  const [
    { count: totalCount },
    { count: publishedCount },
    { count: draftCount },
    { count: categoryCount },
    { count: mediaCount },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('published', false),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('media').select('*', { count: 'exact', head: true }),
  ]);

  return {
    total: totalCount || 0,
    published: publishedCount || 0,
    draft: draftCount || 0,
    categories: categoryCount || 0,
    media: mediaCount || 0,
  };
}

export async function getAllProjects(filters?: { published?: boolean }): Promise<CompleteProject[]> {
  const supabase = await createClient();
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from('projects')
    .select(`
      *,
      category:categories(*),
      media:media(*)
    `)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (filters && filters.published !== undefined) {
    query = query.eq('published', filters.published);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching admin projects:', error);
    return [];
  }

  return (data as CompleteProject[]).map((project) => ({
    ...project,
    media: (project.media || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
  }));
}

export async function getProjectById(id: string): Promise<CompleteProject | null> {
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      category:categories(*),
      media:media(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error(`Error fetching project by id ${id}:`, error);
    return null;
  }

  const project = data as CompleteProject;
  if (project.media) {
    project.media = project.media.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }
  return project;
}

export async function createProject(projectData: Database['public']['Tables']['projects']['Insert']): Promise<Project> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { data, error } = await supabase
    .from('projects')
    .insert(projectData)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

export async function updateProject(id: string, projectData: Database['public']['Tables']['projects']['Update']): Promise<Project> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { data, error } = await supabase
    .from('projects')
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function duplicateProject(id: string): Promise<Project> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const existingProject = await getProjectById(id);
  if (!existingProject) throw new Error('Project not found');

  const newSlug = await generateUniqueSlug(`${existingProject.title} Copy`);

  const { data, error } = await supabase
    .from('projects')
    .insert({
      title: `${existingProject.title} (Copy)`,
      slug: newSlug,
      description_tr: existingProject.description_tr,
      description_en: existingProject.description_en,
      category_id: existingProject.category_id,
      client: existingProject.client,
      location: existingProject.location,
      year: existingProject.year,
      hero_aspect_ratio: existingProject.hero_aspect_ratio,
      featured: false,
      published: false,
      sort_order: (existingProject.sort_order || 0) + 1,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

export async function updateProjectOrder(items: { id: string; sort_order: number }[]): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  for (const item of items) {
    const { error } = await supabase
      .from('projects')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id);

    if (error) throw error;
  }
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data as Category[];
}

export async function createCategory(categoryData: Database['public']['Tables']['categories']['Insert']): Promise<Category> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { data, error } = await supabase
    .from('categories')
    .insert(categoryData)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function updateCategory(id: string, categoryData: Database['public']['Tables']['categories']['Update']): Promise<Category> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { data, error } = await supabase
    .from('categories')
    .update(categoryData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function updateCategoryOrder(items: { id: string; sort_order: number }[]): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  for (const item of items) {
    const { error } = await supabase
      .from('categories')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id);

    if (error) throw error;
  }
}

export async function getRawSiteSettings(): Promise<Record<string, any>> {
  const supabase = await createClient();
  if (!supabase) return {};

  const { data, error } = await supabase.from('site_settings').select('*');
  if (error || !data) return {};

  const result: Record<string, any> = {};
  for (const row of data) {
    result[row.key] = row.value;
  }
  return result;
}

export async function updateSiteSetting(key: string, value: any): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { error } = await supabase
    .from('site_settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });

  if (error) throw error;
}

export async function getProjectMediaList(projectId: string): Promise<Media[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true });

  if (error || !data) return [];
  return data as Media[];
}

export async function getMediaItem(id: string): Promise<Media | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data as Media;
}

export async function deleteMediaItem(id: string): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { error } = await supabase
    .from('media')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function setHeroMedia(projectId: string, mediaId: string): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  // Reset all to false
  await supabase
    .from('media')
    .update({ is_hero: false })
    .eq('project_id', projectId);

  // Set selected to true
  const { error } = await supabase
    .from('media')
    .update({ is_hero: true })
    .eq('id', mediaId)
    .eq('project_id', projectId);

  if (error) throw error;
}

export async function updateMediaOrder(projectId: string, items: { id: string; sort_order: number }[]): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  for (const item of items) {
    const { error } = await supabase
      .from('media')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id)
      .eq('project_id', projectId);

    if (error) throw error;
  }
}

export async function generateUniqueSlug(title: string, existingSlug?: string): Promise<string> {
  const supabase = await createClient();
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  if (existingSlug === baseSlug) return baseSlug;

  let slug = baseSlug || 'project';
  let counter = 1;
  let isUnique = false;

  if (!supabase) return `${slug}-${Date.now()}`;

  while (!isUnique) {
    const { data } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    if (!data) {
      isUnique = true;
    } else {
      slug = `${baseSlug || 'project'}-${counter}`;
      counter++;
    }
  }

  return slug;
}

export async function importDemoContent(): Promise<{ projects: number; media: number; settings: number }> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');

  const { count, error: countError } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  if (countError) throw countError;
  if ((count || 0) > 0) {
    throw new Error('Example content can only be imported into an empty project library');
  }

  const categoryIds = new Map<string, string>();
  for (const category of demoCategories) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({
        name_tr: category.name_tr,
        name_en: category.name_en,
        slug: category.slug,
        sort_order: category.sort_order,
      }, { onConflict: 'slug' })
      .select('id, slug')
      .single();

    if (error || !data) throw error || new Error(`Failed to import category ${category.slug}`);
    categoryIds.set(data.slug, data.id);
  }

  let importedProjects = 0;
  let importedMedia = 0;

  for (const demoProject of demoProjects) {
    const categorySlug = demoProject.category?.slug;
    const categoryId = categorySlug ? categoryIds.get(categorySlug) : undefined;
    if (!categoryId) throw new Error(`Missing category for ${demoProject.title}`);

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        title: demoProject.title,
        slug: demoProject.slug,
        description_tr: demoProject.description_tr,
        description_en: demoProject.description_en,
        category_id: categoryId,
        client: demoProject.client,
        location: demoProject.location,
        year: demoProject.year,
        hero_aspect_ratio: demoProject.hero_aspect_ratio,
        featured: demoProject.featured,
        published: demoProject.published,
        sort_order: demoProject.sort_order,
      })
      .select('id')
      .single();

    if (projectError || !project) throw projectError || new Error(`Failed to import ${demoProject.title}`);
    importedProjects++;

    const mediaRows: Database['public']['Tables']['media']['Insert'][] = (demoProject.media || []).map((item) => ({
      project_id: project.id,
      type: item.type,
      url: item.url,
      aspect_ratio: item.aspect_ratio,
      width: item.width,
      height: item.height,
      is_hero: item.is_hero,
      sort_order: item.sort_order,
      caption_tr: item.caption_tr,
      caption_en: item.caption_en,
      poster_url: item.poster_url,
    }));

    if (mediaRows.length > 0) {
      const { error: mediaError } = await supabase.from('media').insert(mediaRows);
      if (mediaError) throw mediaError;
      importedMedia += mediaRows.length;
    }
  }

  const settingDefaults: Record<string, unknown> = {
    site_title: demoSiteSettings.site_title,
    tagline: demoSiteSettings.tagline,
    contact_phone: demoSiteSettings.phone,
    contact_email: demoSiteSettings.email,
    social_links: demoSiteSettings.social_links,
    about_text: demoSiteSettings.about_text,
    contact_text: demoSiteSettings.contact_text,
    footer_text: demoSiteSettings.footer_text,
    seo_title: demoSiteSettings.seo_title,
    seo_description: demoSiteSettings.seo_description,
    og_image: demoSiteSettings.og_image,
  };

  const { data: existingSettings, error: settingsError } = await supabase
    .from('site_settings')
    .select('key');
  if (settingsError) throw settingsError;

  const existingKeys = new Set((existingSettings || []).map((row) => row.key));
  const missingSettings = Object.entries(settingDefaults)
    .filter(([key, value]) => !existingKeys.has(key) && value !== undefined)
    .map(([key, value]) => ({ key, value: value as Database['public']['Tables']['site_settings']['Insert']['value'] }));

  if (missingSettings.length > 0) {
    const { error } = await supabase.from('site_settings').insert(missingSettings);
    if (error) throw error;
  }

  return { projects: importedProjects, media: importedMedia, settings: missingSettings.length };
}
