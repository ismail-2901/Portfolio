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
      <p className="font-mono text-metadata uppercase text-accent">Projects</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Edit {project.title}</h1>
      <div className="mt-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
