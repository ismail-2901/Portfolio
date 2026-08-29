import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PublicProject } from "@/lib/queries";

export function ProjectCard({ project }: { project: PublicProject }) {
  const cover = project.images.find((image) => image.isCover) ?? project.images[0];

  return (
    <article className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/70 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_28px_80px_rgba(34,211,238,0.12)]">
      <Link href={`/projects/${project.slug}`} className="focus-ring block h-full" aria-label={`View ${project.title}`}>
        <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-zinc-950">
          {cover ? (
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-95"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(79,70,229,0.25),transparent_42%),linear-gradient(45deg,rgba(34,211,238,0.16),transparent_48%)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-200 backdrop-blur-sm">
            Case study
          </div>
        </div>

        <div className="flex min-h-[230px] flex-1 flex-col justify-between gap-6 p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold text-zinc-50">{project.title}</h3>
              <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-cyan-300 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">{project.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techTags.slice(0, 5).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </Link>

      {(project.githubUrl || project.liveUrl) && (
        <div className="flex gap-2 border-t border-white/10 px-6 py-4">
          {project.githubUrl ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" className="size-4" />
                Source
              </Link>
            </Button>
          ) : null}
          {project.liveUrl ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                <ArrowUpRight aria-hidden="true" className="size-4" />
                Live
              </Link>
            </Button>
          ) : null}
        </div>
      )}
    </article>
  );
}
