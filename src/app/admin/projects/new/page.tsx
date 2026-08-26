import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-wider mb-1">New Project</h1>
        <p className="text-neutral-400 text-sm">Create a new portfolio project.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
