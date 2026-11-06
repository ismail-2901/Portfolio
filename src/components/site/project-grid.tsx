"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Globe } from "lucide-react";

import type { PublicProject } from "@/lib/queries";

export function ProjectCard({ project, index }: { project: PublicProject; index: number }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = (project.images && project.images.length > 0)
    ? [...project.images].sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0) || a.order - b.order)
    : [];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div
      key={project.id}
      className="group flex flex-col rounded-3xl bg-surface border border-rule overflow-hidden p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-muted/50"
    >
      {/* Mockup / Preview Area — Sleek dark aesthetic */}
      <Link
        href={`/projects/${project.slug}`}
        className="group/preview relative aspect-[16/10] w-full rounded-2xl bg-neutral-950 text-white border border-neutral-800/80 overflow-hidden flex flex-col justify-between p-6 mb-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-700"
      >
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-900 to-neutral-800 opacity-90 transition-opacity duration-300 group-hover/preview:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Wireframe Architectural Accent Mark in Background */}
        <div
          aria-hidden="true"
          className="absolute -right-6 -bottom-6 size-40 rounded-2xl border border-white/10 rotate-12 pointer-events-none"
        />

        {images.length > 0 ? (
          <div className="relative size-full">
            {images.map((img, imgIdx) => (
              <div
                key={img.id || imgIdx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  imgIdx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/preview:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}

            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                {images.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentSlide ? "w-4 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Top Bar: Project index + tag badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                PROJECT / {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-md bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/15 backdrop-blur-sm">
                {project.techTags[0] ?? "PROJECT"}
              </span>
            </div>

            {/* Center: Punchy Title & Summary Graphic */}
            <div className="relative z-10 my-auto text-center px-4 select-none">
              <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-2">
                {project.title}
              </h4>
              <p className="text-xs md:text-sm text-neutral-300/85 line-clamp-2 max-w-sm mx-auto leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Bottom: Tech tags */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>{project.techTags.slice(0, 3).join(" / ")}</span>
              <span className="text-[10px] tracking-wider text-neutral-500 uppercase">CASE STUDY</span>
            </div>
          </>
        )}
      </Link>

      {/* Bottom Info Bar */}
      <div className="flex items-start justify-between gap-4 mt-auto pt-2">
        <div className="min-w-0 flex-1">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-copy truncate">
              {project.title}
            </h3>
          </Link>
          <p className="text-xs md:text-sm text-muted mt-1 max-w-sm line-clamp-1">
            {project.summary}
          </p>

          {/* 3 Action Icons: GitHub | Live Site | Details Page */}
          <div className="flex items-center gap-1 mt-3">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-copy transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-surface-raised"
                aria-label={`GitHub repository for ${project.title}`}
                title="GitHub Repository"
              >
                <Github className="size-4" />
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-copy transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-surface-raised"
                aria-label={`Live site for ${project.title}`}
                title="Live Site"
              >
                <Globe className="size-4" />
              </Link>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="text-muted hover:text-copy transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-surface-raised"
              aria-label={`View details for ${project.title}`}
              title="View Details"
            >
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <span className="shrink-0 rounded-md bg-surface-raised px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-copy border border-rule mt-1">
          {project.techTags[0] ?? "PROJECT"}
        </span>
      </div>
    </div>
  );
}

export function ProjectGrid({ projects }: { projects: PublicProject[] }) {
  return (
    <div className="w-full">
      {/* Huge Section Title — Centered */}
      <h2 className="section-giant-title text-center select-none">
        PROJECTS
      </h2>

      {/* Hairline Divider */}
      <div className="hairline-divider mt-6 md:mt-8 mb-10 md:mb-14" />

      {/* Unified Project Grid — Sleek dark photo cards matching FixMyCampus aesthetic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>

      {/* View More Projects Button */}
      <div className="mt-12 md:mt-16 text-center">
        <Link
          href="/projects"
          className="inline-block text-xs md:text-sm font-bold uppercase tracking-wider text-copy underline underline-offset-8 decoration-2 decoration-copy hover:opacity-70 transition-opacity"
        >
          VIEW MORE PROJECTS
        </Link>
      </div>
    </div>
  );
}
