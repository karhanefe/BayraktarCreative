import ProjectForm from '@/components/admin/ProjectForm';
import MediaUploader from '@/components/admin/MediaUploader';
import MediaGrid from '@/components/admin/MediaGrid';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  // Mock data for initial render
  const mockProject = {
    id: params.id,
    title: 'Nike Air Max Campaign',
    slug: 'nike-air-max-campaign',
    status: 'published',
    category_id: '1',
    description: 'A global campaign for Nike Air Max.',
  };

  const mockMedia = [
    { id: 'm1', url: 'https://placehold.co/600x400/1a1a1a/f5f5f0?text=Cover', type: 'image' as const, width: 1920, height: 1080, size: 1024500, isCover: true },
    { id: 'm2', url: 'https://placehold.co/400x600/1a1a1a/f5f5f0?text=Portrait', type: 'image' as const, width: 1080, height: 1920, size: 824500, isCover: false },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">Edit Project</h1>
          <p className="text-neutral-400 text-sm">Update details and manage media.</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={`/projects/${mockProject.slug}`} 
            target="_blank"
            className="px-4 py-2 text-sm border border-[#2a2a2a] text-neutral-300 hover:text-white hover:bg-[#1a1a1a] transition-colors uppercase tracking-widest font-medium"
          >
            Preview
          </a>
          <button className="px-4 py-2 text-sm bg-red-950/50 text-red-500 hover:bg-red-900/50 transition-colors uppercase tracking-widest font-medium">
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold tracking-wider mb-4">Media Management</h2>
            <div className="space-y-6 bg-[#0a0a0a] p-1">
              <MediaUploader projectId={mockProject.id} />
              
              <div className="pt-4 border-t border-[#2a2a2a]">
                <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-medium mb-4">Project Gallery</h3>
                {/* We pass empty handlers as this is server rendered, client interactions handled in client component wrapper if needed, or by rewriting MediaGrid as client component with its own state. 
                Wait, MediaGrid is a client component, we should ideally wrap this section in a client component to handle state properly. 
                For now, passing dummy handlers to satisfy props. */}
                <MediaGrid 
                  items={mockMedia} 
                  onUpdateOrder={() => {}} 
                  onSetCover={() => {}} 
                  onDelete={() => {}} 
                />
              </div>
            </div>
          </section>
        </div>
        
        <div className="xl:col-span-1">
          <ProjectForm initialData={mockProject} />
        </div>
      </div>
    </div>
  );
}
