import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowRight, Folder, FileImage, LayoutGrid, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let stats = {
    total: 0,
    published: 0,
    draft: 0,
    categories: 0,
  };
  let recentProjects: any[] = [];
  let errorMsg = null;

  try {
    const supabase = await createClient();
    
    // Mock fetching for now until admin-queries is ready
    // Fallback UI data
    stats = { total: 12, published: 8, draft: 4, categories: 5 };
    recentProjects = [
      { id: '1', title: 'Nike Air Max', category: 'Commercial', status: 'published', date: '2026-08-20' },
      { id: '2', title: 'Summer Collection', category: 'Fashion', status: 'draft', date: '2026-08-22' },
    ];
  } catch (error: any) {
    errorMsg = error.message;
    // Provide safe defaults for UI testing
  }

  const statCards = [
    { label: 'Total Projects', value: stats.total, icon: Folder },
    { label: 'Published', value: stats.published, icon: LayoutGrid },
    { label: 'Drafts', value: stats.draft, icon: FileText },
    { label: 'Categories', value: stats.categories, icon: FileImage },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-wider mb-1">Dashboard</h1>
        <p className="text-neutral-400 text-sm">Overview of your portfolio content.</p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-950/30 border border-red-900 text-red-500 text-sm">
          Warning: Database connection failed. Showing mock data. ({errorMsg})
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-400 text-sm font-medium tracking-wide">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-neutral-500" />
            </div>
            <span className="text-3xl font-light text-[#f5f5f0]">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
        <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-wide">Recent Projects</h2>
          <Link href="/admin/projects" className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {recentProjects.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 text-sm">
            No projects found.
          </div>
        ) : (
          <div className="divide-y divide-[#2a2a2a]">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 px-6 flex items-center justify-between hover:bg-[#2a2a2a]/30 transition-colors">
                <div>
                  <h3 className="font-medium text-[#f5f5f0]">{project.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                    <span>{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span>{project.date}</span>
                  </div>
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-sm border uppercase tracking-wider ${
                    project.status === 'published' 
                      ? 'bg-green-950/30 text-green-500 border-green-900' 
                      : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
