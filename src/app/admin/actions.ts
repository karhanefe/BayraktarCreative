'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Mock functions until admin-queries is properly hooked up
async function isAdmin() {
  try {
    const supabase = await createClient();
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // Minimal check, you would expand this based on your profiles table
    return true;
  } catch (error) {
    return false; // Fail safe
  }
}

export async function logoutAction() {
  try {
    const supabase = await createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (e) {
    // ignore
  }
  redirect('/admin/login');
}

// These would normally call functions from admin-queries.ts
export async function createProjectAction(formData: FormData) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    // Process form data and create project
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to create project' };
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/${id}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to update project' };
  }
}

export async function deleteProjectAction(id: string) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to delete project' };
  }
}

export async function duplicateProjectAction(id: string) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to duplicate project' };
  }
}

export async function updateProjectOrderAction(items: { id: string, sort_order: number }[]) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to update order' };
  }
}

export async function createCategoryAction(formData: FormData) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to create category' };
  }
}

export async function updateCategoryAction(id: string, formData: FormData) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to update category' };
  }
}

export async function deleteCategoryAction(id: string) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to delete category' };
  }
}

export async function updateCategoryOrderAction(items: { id: string, sort_order: number }[]) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to update category order' };
  }
}

export async function updateSettingsAction(formData: FormData) {
  if (!(await isAdmin())) return { error: 'Unauthorized' };
  try {
    revalidatePath('/admin/settings');
    revalidatePath('/'); // Revalidate main site too
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to update settings' };
  }
}
