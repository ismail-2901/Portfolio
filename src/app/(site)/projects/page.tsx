import type { Metadata } from "next";

import { Reveal } from "@/components/site/motion";
import { ProjectCard } from "@/components/site/project-card";
import { getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected full-stack engineering, security, and platform projects."
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="pt-32">
      <section className="container-shell py-16">
        <Reveal>
          <p className="font-mono text-sm uppercase text-cyan-300">Projects</p>
          <h1 className="mt-3 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] text-zinc-50 md:text-7xl">
            Bento-selected systems, product surfaces, and platform work.
          </h1>
        </Reveal>

        <div className="bento-grid mt-12">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04} className="bento-item">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
