import { getAdminStats, getAllProjects } from '@/lib/supabase/admin-queries';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [stats, projects] = await Promise.all([
    getAdminStats(),
    getAllProjects(),
  ]);

  return <DashboardClient stats={stats} recentProjects={projects.slice(0, 5)} />;
}
