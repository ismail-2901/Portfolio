import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";

import type { PublicProject } from "@/lib/queries";
import { ProjectMediaFrame } from "@/components/site/project-media-frame";

type CaseStudyCardProps = {
  project: PublicProject;
  index: number;
  variant: "featured" | "secondary";
  priority?: boolean;
};

export function CaseStudyCard({ project, index, variant, priority = false }: CaseStudyCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article className={isFeatured ? "case-study-featured" : "case-study-secondary"}>
      <Link
        href={`/projects/${project.slug}`}
        className="focus-ring group block"
      >
        <ProjectMediaFrame
          project={project}
          index={index}
          priority={priority}
          sizes={isFeatured ? "(max-width: 767px) calc(100vw - 32px), 58vw" : "(max-width: 767px) calc(100vw - 32px), 28vw"}
          className={isFeatured ? "aspect-16/10" : "aspect-5/3 md:aspect-4/3"}
        />
      </Link>

      {!isFeatured ? <span className="case-study-secondary-index font-mono text-xs text-accent">{String(index).padStart(2, "0")}</span> : null}

      <div className={isFeatured ? "case-study-featured-copy" : "case-study-secondary-copy"}>
        <p className="eyebrow">
          {isFeatured ? `CASE STUDY / ${String(index).padStart(2, "0")}` : project.tags.map((tag) => tag.name).join(" / ") || "Project study"}
        </p>
        <h3 className={isFeatured ? "mt-3 text-3xl font-medium leading-tight md:text-4xl" : "mt-2 text-xl font-medium leading-snug md:text-2xl"}>
          <Link href={`/projects/${project.slug}`} className="focus-ring editorial-link">{project.title}</Link>
        </h3>
        <p className="mt-4 max-w-xl leading-7 text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-copy" aria-label={`${project.title} technologies`}>
          {project.techTags.slice(0, 5).map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="case-study-actions">
          <Link href={`/projects/${project.slug}`} className="focus-ring inline-flex items-center gap-2 text-sm text-copy transition-colors hover:text-accent">
            Read {project.title} case study <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          {project.liveUrl ? (
            <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="focus-ring ml-5 inline-flex items-center gap-1 text-sm text-muted hover:text-copy">
              Live <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
          {project.githubUrl ? (
            <Link href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source on GitHub`} className="focus-ring ml-3 inline-flex text-muted hover:text-copy">
              <Github aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}