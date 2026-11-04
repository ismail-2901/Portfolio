"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

import type { PublicProject } from "@/lib/queries";

const FILTERS = ["All", "Full-stack", "Frontend", "Backend"] as const;
type Filter = (typeof FILTERS)[number];

function ProjectCard({ project }: { project: PublicProject }) {
  return (
    <article className="project-card group">
      <div className="project-card-image">
        <div className="project-card-placeholder">
          <span className="project-card-initials">
            {project.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="project-card-overlay">
          <div className="project-card-tech">{project.techTags.slice(0, 3).join(" · ")}</div>
        </div>
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-summary">{project.summary}</p>
        <div className="project-card-actions">
          <Link href={`/projects/${project.slug}`} className="project-card-link">
            View project <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} source on GitHub`} className="project-card-icon-link">
              <Github className="size-4" aria-hidden="true" />
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`} className="project-card-icon-link">
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: PublicProject[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.tags.some((t) => t.name.toLowerCase().includes(activeFilter.toLowerCase())) ||
            p.techTags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <div className="filter-bar" role="group" aria-label="Filter projects by category">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn${activeFilter === filter ? " filter-btn-active" : ""}`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filtered.length === 0 ? (
          <p className="projects-empty">No projects match this filter yet.</p>
        ) : null}
      </div>

      <div className="projects-footer">
        <Link href="/projects" className="see-more-btn">
          See all projects <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

