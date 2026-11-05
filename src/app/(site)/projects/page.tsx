import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { ProjectCard } from "@/components/site/project-grid";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full-stack projects built for real users — FixMyCampus, ELARIS, and more.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects", description: "Full-stack projects built for real users.", url: "/projects" },
  twitter: { card: "summary", title: "Projects", description: "Full-stack projects built for real users." }
};

export default async function ProjectsPage() {
  const projectsResult = await getPublishedProjects();
  const projects = projectsResult.available ? projectsResult.data : [];

  return (
    <main id="main-content" tabIndex={-1} className="w-full">
      <section className="container-shell pb-24 pt-16 md:pb-32 md:pt-24">
        {/* Hairline Divider & Giant Title */}
        <div className="hairline-divider mb-8" />
        <h1 className="section-giant-title select-none leading-none mb-6">
          SELECTED WORK
        </h1>

        {/* Sub-bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-rule/60 mb-12">
          <p className="text-xs md:text-sm text-muted max-w-xl leading-relaxed">
            A closer look at full-stack applications and engineering projects: architecture, technical decisions, and implementation details.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-copy underline underline-offset-4 hover:opacity-75 transition-opacity self-start md:self-auto"
          >
            Discuss a project <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {!projectsResult.available ? <DatabaseUnavailableNotice className="mb-8" /> : null}

        {projects.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : null}

        {projectsResult.available && !projects.length ? (
          <p className="border-t border-rule py-8 text-muted">Project studies are being prepared.</p>
        ) : null}
      </section>
    </main>
  );
}
