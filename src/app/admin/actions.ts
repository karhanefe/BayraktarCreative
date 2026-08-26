'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  isUserAdmin,
  createProject,
  updateProject,
  deleteProject,
  duplicateProject,
  updateProjectOrder,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryOrder,
  updateSiteSetting,
  deleteMediaItem,
  setHeroMedia,
  updateMediaOrder,
  generateUniqueSlug,
  getProjectById,
} from '@/lib/supabase/admin-queries';

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) {
    throw new Error('Database not configured');
  }
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Unauthorized');
  }

  const isAdmin = await isUserAdmin(user.id);
  if (!isAdmin) {
    throw new Error('Forbidden: Admin role required');
  }

  return { supabase, user };
}

export async function logoutAction() {
  try {
    const supabase = await createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (e) {
    // Ignore sign out errors
  }
  redirect('/admin/login');
}

export async function createProjectAction(formData: FormData) {
  try {
    await requireAdmin();

    const title = (formData.get('title') as string) || '';
    let slug = (formData.get('slug') as string) || '';
    const category_id = (formData.get('category_id') as string) || '';
    const client = (formData.get('client') as string) || null;
    const location = (formData.get('location') as string) || null;
    const yearStr = formData.get('year') as string;
    const year = yearStr ? parseInt(yearStr, 10) : new Date().getFullYear();
    const hero_aspect_ratio = (formData.get('hero_aspect_ratio') as string) || '16:9';
    const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';
    const published = formData.get('published') === 'true' || formData.get('published') === 'on';
    const sort_orderStr = formData.get('sort_order') as string;
    const sort_order = sort_orderStr ? parseInt(sort_orderStr, 10) : 0;
    const description_tr = (formData.get('description_tr') as string) || null;
    const description_en = (formData.get('description_en') as string) || null;

    if (!title || !category_id) {
      return { error: 'Title and Category are required' };
    }

    slug = await generateUniqueSlug(slug || title);

    const project = await createProject({
      title,
      slug,
      category_id,
      client,
      location,
      year,
      hero_aspect_ratio,
      featured,
      published,
      sort_order,
      description_tr,
      description_en,
    });

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true, project };
  } catch (error: any) {
    console.error('createProjectAction error:', error);
    return { error: error.message || 'Failed to create project' };
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const title = (formData.get('title') as string) || '';
    const slug = (formData.get('slug') as string) || '';
    const category_id = (formData.get('category_id') as string) || '';
    const client = (formData.get('client') as string) || null;
    const location = (formData.get('location') as string) || null;
    const yearStr = formData.get('year') as string;
    const year = yearStr ? parseInt(yearStr, 10) : new Date().getFullYear();
    const hero_aspect_ratio = (formData.get('hero_aspect_ratio') as string) || '16:9';
    const featured = formData.get('featured') === 'true' || formData.get('featured') === 'on';
    const published = formData.get('published') === 'true' || formData.get('published') === 'on';
    const sort_orderStr = formData.get('sort_order') as string;
    const sort_order = sort_orderStr ? parseInt(sort_orderStr, 10) : 0;
    const description_tr = (formData.get('description_tr') as string) || null;
    const description_en = (formData.get('description_en') as string) || null;

    if (!title || !category_id) {
      return { error: 'Title and Category are required' };
    }

    const project = await updateProject(id, {
      title,
      slug: slug || undefined,
      category_id,
      client,
      location,
      year,
      hero_aspect_ratio,
      featured,
      published,
      sort_order,
      description_tr,
      description_en,
    });

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath('/');
    revalidatePath('/work');
    if (project.slug) {
      revalidatePath(`/work/${project.slug}`);
    }

    return { success: true, project };
  } catch (error: any) {
    console.error('updateProjectAction error:', error);
    return { error: error.message || 'Failed to update project' };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await requireAdmin();

    const existing = await getProjectById(id);
    await deleteProject(id);

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/work');
    if (existing?.slug) {
      revalidatePath(`/work/${existing.slug}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('deleteProjectAction error:', error);
    return { error: error.message || 'Failed to delete project' };
  }
}

export async function duplicateProjectAction(id: string) {
  try {
    await requireAdmin();

    const project = await duplicateProject(id);

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true, project };
  } catch (error: any) {
    console.error('duplicateProjectAction error:', error);
    return { error: error.message || 'Failed to duplicate project' };
  }
}

export async function updateProjectOrderAction(items: { id: string; sort_order: number }[]) {
  try {
    await requireAdmin();

    await updateProjectOrder(items);

    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true };
  } catch (error: any) {
    console.error('updateProjectOrderAction error:', error);
    return { error: error.message || 'Failed to update project order' };
  }
}

export async function createCategoryAction(data: { name_tr: string; name_en: string; slug: string; sort_order?: number }) {
  try {
    await requireAdmin();

    if (!data.name_tr || !data.name_en || !data.slug) {
      return { error: 'Turkish Name, English Name, and Slug are required' };
    }

    const category = await createCategory({
      name_tr: data.name_tr,
      name_en: data.name_en,
      slug: data.slug,
      sort_order: data.sort_order || 0,
    });

    revalidatePath('/admin/categories');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true, category };
  } catch (error: any) {
    console.error('createCategoryAction error:', error);
    return { error: error.message || 'Failed to create category' };
  }
}

export async function updateCategoryAction(id: string, data: { name_tr?: string; name_en?: string; slug?: string; sort_order?: number }) {
  try {
    await requireAdmin();

    const category = await updateCategory(id, data);

    revalidatePath('/admin/categories');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true, category };
  } catch (error: any) {
    console.error('updateCategoryAction error:', error);
    return { error: error.message || 'Failed to update category' };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await requireAdmin();

    await deleteCategory(id);

    revalidatePath('/admin/categories');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true };
  } catch (error: any) {
    console.error('deleteCategoryAction error:', error);
    return { error: error.message || 'Failed to delete category' };
  }
}

export async function updateCategoryOrderAction(items: { id: string; sort_order: number }[]) {
  try {
    await requireAdmin();

    await updateCategoryOrder(items);

    revalidatePath('/admin/categories');
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true };
  } catch (error: any) {
    console.error('updateCategoryOrderAction error:', error);
    return { error: error.message || 'Failed to update category order' };
  }
}

export async function updateSettingsAction(settings: Record<string, any>) {
  try {
    await requireAdmin();

    for (const [key, value] of Object.entries(settings)) {
      await updateSiteSetting(key, value);
    }

    revalidatePath('/admin/settings');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');

    return { success: true };
  } catch (error: any) {
    console.error('updateSettingsAction error:', error);
    return { error: error.message || 'Failed to update settings' };
  }
}

export async function deleteMediaAction(mediaId: string, projectId: string) {
  try {
    await requireAdmin();

    await deleteMediaItem(mediaId);

    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true };
  } catch (error: any) {
    console.error('deleteMediaAction error:', error);
    return { error: error.message || 'Failed to delete media' };
  }
}

export async function setHeroMediaAction(projectId: string, mediaId: string) {
  try {
    await requireAdmin();

    await setHeroMedia(projectId, mediaId);

    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true };
  } catch (error: any) {
    console.error('setHeroMediaAction error:', error);
    return { error: error.message || 'Failed to set hero media' };
  }
}

export async function updateMediaOrderAction(projectId: string, items: { id: string; sort_order: number }[]) {
  try {
    await requireAdmin();

    await updateMediaOrder(projectId, items);

    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath('/');
    revalidatePath('/work');

    return { success: true };
  } catch (error: any) {
    console.error('updateMediaOrderAction error:', error);
    return { error: error.message || 'Failed to update media order' };
  }
}
