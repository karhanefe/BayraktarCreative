import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  // Mock data for UI
  const projects = [
    { id: '1', title: 'Nike Air Max', category: 'Commercial', status: 'published', featured: true, date: '2026-08-20' },
    { id: '2', title: 'Summer Collection', category: 'Fashion', status: 'draft', featured: false, date: '2026-08-22' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">Projects</h1>
          <p className="text-neutral-400 text-sm">Manage your portfolio projects.</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-[#f5f5f0] text-[#0a0a0a] px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1a1a] p-4 border border-[#2a2a2a]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] pl-10 pr-4 py-2 text-sm text-[#f5f5f0] focus:outline-none focus:border-neutral-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-neutral-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" /> Category
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-neutral-400 hover:text-white transition-colors">
            Status
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-12 text-center flex flex-col items-center justify-center">
          <p className="text-neutral-400 mb-4 tracking-widest text-sm uppercase">No Projects Yet</p>
          <Link 
            href="/admin/projects/new"
            className="text-[#f5f5f0] border-b border-[#f5f5f0] pb-0.5 hover:text-neutral-300 transition-colors"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#1a1a1a] border border-[#2a2a2a] p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-neutral-700 transition-colors group">
              <div className="w-full sm:w-48 h-32 bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center text-neutral-600 text-xs uppercase tracking-widest shrink-0">
                Media
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold truncate text-[#f5f5f0]">{project.title}</h3>
                  {project.featured && (
                    <span className="text-[10px] uppercase tracking-wider bg-yellow-950/30 text-yellow-500 border border-yellow-900 px-2 py-0.5">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-neutral-400">
                  <span>{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-700" />
                  <span>{project.date}</span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 mt-4 sm:mt-0">
                <span className={`text-xs px-2 py-1 rounded-sm border uppercase tracking-wider ${
                  project.status === 'published' 
                    ? 'bg-green-950/30 text-green-500 border-green-900' 
                    : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                }`}>
                  {project.status}
                </span>
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/admin/projects/${project.id}`}
                    className="px-3 py-1.5 text-sm bg-[#2a2a2a] hover:bg-[#333] transition-colors"
                  >
                    Edit
                  </Link>
                  <button className="px-3 py-1.5 text-sm bg-red-950/50 text-red-500 hover:bg-red-900/50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
