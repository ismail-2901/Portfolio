import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-sm uppercase text-cyan-300">Projects</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Create project</h1>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
