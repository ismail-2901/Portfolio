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
          <p className="font-mono text-sm uppercase text-cyan-300">Projects</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Project library</h1>
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
            className="focus-ring group grid gap-4 rounded-lg border border-white/10 bg-zinc-900/60 p-5 transition hover:border-cyan-300/50 md:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{project.status}</Badge>
                {project.featured ? <Badge className="border-cyan-300/30 text-cyan-200">Featured</Badge> : null}
                <Badge>{project.images.length} images</Badge>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-zinc-50">{project.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{project.summary}</p>
            </div>
            <ArrowRight aria-hidden="true" className="size-5 text-cyan-300 transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
