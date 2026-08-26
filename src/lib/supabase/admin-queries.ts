import { createClient } from './server';
import type { Database, Project, Category, SiteSettings } from './types';
import { demoProjects, demoCategories, demoSiteSettings } from '../demo-data';

export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('auth_user_id', userId)
    .eq('is_active', true)
    .single();

  if (error || !data) return false;
  return data.role === 'admin';
}

export async function getAllProjects(filters?: { is_published?: boolean }): Promise<Project[]> {
  const supabase = await createClient();
  if (!supabase) {
    if (filters && filters.is_published !== undefined) {
      return demoProjects.filter((p) => p.is_published === filters.is_published);
    }
    return demoProjects;
  }

  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters && filters.is_published !== undefined) {
    query = query.eq('is_published', filters.is_published);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Project[];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  if (!supabase) {
    return demoProjects.find((p) => p.id === id) || null;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Project;
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
    .update(projectData)
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
  if (!existingProject) throw new Error("Project not found");

  const newSlug = await generateUniqueSlug(`${existingProject.title} Copy`);
  
  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...existingProject,
      id: undefined,
      title: `${existingProject.title} (Copy)`,
      slug: newSlug,
      is_published: false,
      is_featured: false,
      created_at: undefined,
      updated_at: undefined,
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
  if (!supabase) return demoCategories;

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
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

export async function updateSiteSettings(settingsData: Database['public']['Tables']['site_settings']['Update']): Promise<SiteSettings> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Database not configured');
  
  const { data: existing } = await supabase.from('site_settings').select('id').single();
  
  if (!existing) throw new Error("Site settings not found");

  const { data, error } = await supabase
    .from('site_settings')
    .update(settingsData)
    .eq('id', existing.id)
    .select()
    .single();

  if (error) throw error;
  return data as SiteSettings;
}

export async function generateUniqueSlug(title: string, existingSlug?: string): Promise<string> {
  const supabase = await createClient();
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
    
  if (existingSlug === baseSlug) return baseSlug;

  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;

  if (!supabase) return `${baseSlug}-${Date.now()}`;

  while (!isUnique) {
    const { data } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    if (!data) {
      isUnique = true;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return slug;
}
