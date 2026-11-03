import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-metadata uppercase text-accent">Projects</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Create project</h1>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
