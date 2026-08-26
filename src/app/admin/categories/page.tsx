import { getAllCategories } from '@/lib/supabase/admin-queries';
import CategoriesClient from './CategoriesClient';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return <CategoriesClient initialCategories={categories} />;
}
