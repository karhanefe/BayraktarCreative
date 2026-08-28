'use client';

import Link from 'next/link';
import { ArrowRight, Folder, LayoutGrid, FileText, Tags, Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { CompleteProject } from '@/lib/supabase/types';
import DemoContentImporter from '@/components/admin/DemoContentImporter';

interface DashboardClientProps {
  stats: {
    total: number;
    published: number;
    draft: number;
    categories: number;
    media: number;
  };
  recentProjects: CompleteProject[];
}

export default function DashboardClient({ stats, recentProjects }: DashboardClientProps) {
  const { t, locale } = useLanguage();

  const statCards = [
    { label: t.admin.dashboard.totalProjects, value: stats.total, icon: Folder },
    { label: t.admin.dashboard.publishedProjects, value: stats.published, icon: LayoutGrid },
    { label: t.admin.dashboard.draftProjects, value: stats.draft, icon: FileText },
    { label: t.admin.dashboard.categories, value: stats.categories, icon: Tags },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">{t.admin.dashboard.title}</h1>
          <p className="text-neutral-400 text-sm">{t.admin.dashboard.subtitle}</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-[#f5f5f0] text-[#0a0a0a] px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors self-start sm:self-auto rounded-sm"
        >
          <Plus className="w-4 h-4" />
          {t.admin.dashboard.createNewProject}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-400 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-neutral-500" />
            </div>
            <span className="text-3xl font-light text-[#f5f5f0] font-mono">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
        <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
          <h2 className="text-base font-bold tracking-wide">{t.admin.dashboard.recentProjects}</h2>
          <Link href="/admin/projects" className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors">
            {t.admin.common.all} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        {recentProjects.length === 0 ? (
          <div className="p-10 text-center text-neutral-500 text-sm flex flex-col items-center justify-center gap-3">
            <p>{t.admin.dashboard.noProjects}</p>
            <p className="max-w-xl text-xs leading-relaxed text-neutral-400">
              {locale === 'tr'
                ? 'Ziyaretçi tarafında gördüğünüz örnek projeler henüz veritabanında değil. Bir kez aktararak admin panelinden düzenlenebilir hale getirebilirsiniz.'
                : 'The example projects shown on the public site are not in the database yet. Import them once to make them editable from the CMS.'}
            </p>
            <DemoContentImporter />
            <Link
              href="/admin/projects/new"
              className="text-xs uppercase tracking-wider font-mono text-[#f5f5f0] border border-[#2a2a2a] px-4 py-2 hover:bg-[#2a2a2a] transition-colors"
            >
              + {t.admin.dashboard.createNewProject}
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#2a2a2a]">
            {recentProjects.map((project) => {
              const catName =
                locale === 'tr'
                  ? project.category?.name_tr || project.category?.name_en
                  : project.category?.name_en || project.category?.name_tr;
              return (
                <Link 
                  key={project.id} 
                  href={`/admin/projects/${project.id}`}
                  className="p-4 px-6 flex items-center justify-between hover:bg-[#2a2a2a]/30 transition-colors block group"
                >
                  <div>
                    <h3 className="font-medium text-[#f5f5f0] group-hover:text-white transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                      <span>{catName || '—'}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span>{project.year || (project.created_at ? new Date(project.created_at).getFullYear() : '')}</span>
                      {project.featured && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-neutral-700" />
                          <span className="text-amber-400 font-medium">{t.admin.projectForm.featuredLabel}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-sm border uppercase tracking-wider ${
                      project.published 
                        ? 'bg-green-950/30 text-green-400 border-green-900/50' 
                        : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                    }`}>
                      {project.published ? t.admin.common.published : t.admin.common.draft}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
