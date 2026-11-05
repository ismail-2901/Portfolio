import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CaseStudyCard } from "@/components/site/case-study-card";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
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
  const leadProject = projects.find((project) => project.featured) ?? projects[0];
  const remainingProjects = projects.filter((project) => project.id !== leadProject?.id);

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

        {leadProject ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="size-2.5 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-copy">
                Featured Case Study / 01
              </p>
            </div>
            <div className="mt-2">
              <CaseStudyCard project={leadProject} index={1} variant="featured" priority />
            </div>
          </div>
        ) : null}

        {remainingProjects.length ? (
          <div className="mt-20 md:mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="size-2.5 rounded-full bg-neutral-400" />
              <p className="text-xs font-bold uppercase tracking-wider text-copy">
                Additional Projects
              </p>
            </div>
            <div className="mt-4">
              {remainingProjects.map((project, index) => (
                <CaseStudyCard key={project.id} project={project} index={index + 2} variant="secondary" />
              ))}
            </div>
          </div>
        ) : null}

        {projectsResult.available && !projects.length ? (
          <p className="border-t border-rule py-8 text-muted">Project studies are being prepared.</p>
        ) : null}
      </section>
    </main>
  );
}
