"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import type { PublicProject } from "@/lib/queries";

export function ProjectGrid({ projects }: { projects: PublicProject[] }) {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "ALL" },
    { id: "full-stack", label: "[Full-Stack]" },
    { id: "frontend", label: "[Frontend]" },
    { id: "backend", label: "[Backend]" }
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    const lowerTags = project.techTags.map((t) => t.toLowerCase());
    if (filter === "full-stack") {
      return (
        lowerTags.includes("full stack") ||
        lowerTags.includes("node.js") ||
        lowerTags.includes("next.js") ||
        lowerTags.includes("express.js")
      );
    }
    if (filter === "frontend") {
      return lowerTags.includes("react") || lowerTags.includes("tailwind css");
    }
    if (filter === "backend") {
      return (
        lowerTags.includes("node.js") ||
        lowerTags.includes("express.js") ||
        lowerTags.includes("mysql") ||
        lowerTags.includes("postgresql")
      );
    }
    return true;
  });

  const featuredProject = filteredProjects[0];
  const gridProjects = filteredProjects.slice(1);

  return (
    <div className="w-full">
      {/* Huge Section Title */}
      <h2 className="section-giant-title text-center select-none">
        PROJECTS
      </h2>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-6 mt-6 md:mt-8 text-xs font-semibold tracking-wider">
        {categories.map((cat) => {
          const isActive = filter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`transition-colors cursor-pointer py-1 ${
                isActive
                  ? "text-copy underline underline-offset-8 decoration-2 decoration-copy"
                  : "text-muted hover:text-copy"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Hairline Divider */}
      <div className="hairline-divider mt-4 mb-10 md:mb-14" />

      {/* Featured Big Project Card */}
      {featuredProject && (
        <div className="mb-8 md:mb-12">
          <div className="group relative rounded-3xl bg-neutral-900 text-white overflow-hidden min-h-[380px] md:min-h-[460px] p-6 md:p-12 flex flex-col justify-between shadow-md transition-transform duration-300 hover:scale-[1.01]">
            {/* Background Subtle Gradient & Mockup Graphic */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-900 to-neutral-800 opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center select-none pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
              <p className="text-xl md:text-3xl font-medium tracking-tight text-neutral-300 max-w-xl">
                {featuredProject.summary}
              </p>
            </div>

            {/* Top row / empty for spacing */}
            <div className="relative z-10" />

            {/* Bottom info */}
            <div className="relative z-10 pt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
                    {featuredProject.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
                      WEBSITE
                    </span>
                    {featuredProject.githubUrl && (
                      <Link
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                        aria-label={`GitHub for ${featuredProject.title}`}
                      >
                        <Github className="size-4" />
                      </Link>
                    )}
                    <Link
                      href={`/projects/${featuredProject.slug}`}
                      className="text-neutral-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                      aria-label={`View ${featuredProject.title}`}
                    >
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {gridProjects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col rounded-3xl bg-surface border border-rule overflow-hidden p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-muted/50"
          >
            {/* Mockup Preview Area */}
            <Link
              href={`/projects/${project.slug}`}
              className="relative aspect-[16/10] w-full rounded-2xl bg-surface-raised border border-rule/60 overflow-hidden flex items-center justify-center p-6 mb-5 group-hover:opacity-95 transition-opacity"
            >
              <div className="text-center p-4">
                <p className="text-sm md:text-base font-semibold text-copy/90 max-w-xs">
                  {project.summary}
                </p>
              </div>
            </Link>

            {/* Bottom Info Bar */}
            <div className="flex items-start justify-between gap-4 mt-auto">
              <div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-copy">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-muted mt-1 max-w-sm line-clamp-1">
                  {project.summary}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted hover:text-copy transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                      aria-label={`GitHub for ${project.title}`}
                    >
                      <Github className="size-4" />
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-muted hover:text-copy transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                    aria-label={`View ${project.title}`}
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>

              <span className="shrink-0 rounded-md bg-surface-raised px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-copy border border-rule">
                WEBSITE
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
