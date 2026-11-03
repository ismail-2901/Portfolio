import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      images: true
    },
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }]
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-metadata uppercase text-accent">Projects</p>
          <h1 className="mt-2 text-heading font-semibold text-copy">Project library</h1>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus aria-hidden="true" className="size-4" />
            New project
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/admin/projects/${project.id}`}
            className="focus-ring group grid gap-4 rounded-panel border border-rule bg-surface-raised p-5 transition hover:border-accent/50 md:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{project.status}</Badge>
                {project.featured ? <Badge className="border-accent/30 text-accent">Featured</Badge> : null}
                <Badge>{project.images.length} images</Badge>
              </div>
              <h2 className="mt-4 text-heading-small font-semibold text-copy">{project.title}</h2>
              <p className="mt-2 max-w-3xl text-body-small text-muted">{project.summary}</p>
            </div>
            <ArrowRight aria-hidden="true" className="size-5 text-accent transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
