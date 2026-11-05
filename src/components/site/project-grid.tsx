"use client";

import Link from "next/link";
import { ArrowRight, Github, Globe } from "lucide-react";

import type { PublicProject } from "@/lib/queries";

export function ProjectGrid({ projects }: { projects: PublicProject[] }) {
  return (
    <div className="w-full">
      {/* Huge Section Title — Centered */}
      <h2 className="section-giant-title text-center select-none">
        PROJECTS
      </h2>

      {/* Hairline Divider */}
      <div className="hairline-divider mt-6 md:mt-8 mb-10 md:mb-14" />

      {/* Unified Project Grid — Every card has identical consistent design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col rounded-3xl bg-surface border border-rule overflow-hidden p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-muted/50"
          >
            {/* Mockup / Preview Area */}
            <Link
              href={`/projects/${project.slug}`}
              className="relative aspect-[16/10] w-full rounded-2xl bg-surface-raised border border-rule/60 overflow-hidden flex items-center justify-center p-6 mb-5 group-hover:opacity-95 transition-opacity"
            >
              <div className="text-center p-4">
                <p className="text-sm md:text-base font-semibold text-copy/90 max-w-xs leading-snug">
                  {project.summary}
                </p>
              </div>
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
                      rel="noreferrer"
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
                      rel="noreferrer"
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
