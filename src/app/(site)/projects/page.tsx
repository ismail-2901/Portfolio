import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CaseStudyCard } from "@/components/site/case-study-card";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { SectionIntro } from "@/components/site/section-intro";
import { Button } from "@/components/ui/button";
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
    <main id="main-content" tabIndex={-1}>
      <section className="container-shell pb-24 pt-16 md:pb-32 md:pt-24">
        <header className="mb-16 max-w-4xl md:mb-24">
          <p className="eyebrow">Selected work / case studies</p>
          <h1 className="mt-5 text-balance text-display font-medium text-copy md:text-display-xl">
            Projects built for real users.
          </h1>
          <p className="copy-measure mt-6 text-body-large text-muted">
            A closer look at full-stack projects I have designed and built: the problems, technical decisions, and
            implementation details behind each one.
          </p>
          <Button asChild variant="ghost" className="mt-5 px-0">
            <Link href="/contact">Discuss a project <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </Button>
        </header>

        {!projectsResult.available ? <DatabaseUnavailableNotice className="mb-8" /> : null}

        {leadProject ? (
          <div>
            <SectionIntro eyebrow="Featured project / 01" title="Start with the project that shows the most." />
            <div className="mt-4">
              <CaseStudyCard project={leadProject} index={1} variant="featured" priority />
            </div>
          </div>
        ) : null}

        {remainingProjects.length ? (
          <div className="mt-20 md:mt-28">
            <SectionIntro eyebrow="More projects" title="Other full-stack work." />
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
