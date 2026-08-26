import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tags: true,
      images: {
        orderBy: [{ isCover: "desc" }, { order: "asc" }]
      }
    }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-sm uppercase text-cyan-300">Projects</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Edit {project.title}</h1>
      <div className="mt-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
