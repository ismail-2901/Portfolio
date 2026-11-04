import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EngineeringObject } from "@/components/site/engineering-object";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { CaseStudyCard } from "@/components/site/case-study-card";
import { SectionIntro } from "@/components/site/section-intro";
import { CapabilityCluster } from "@/components/site/capability-cluster";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { getFeaturedProjects, getFeaturedSkills, getPublicProfile } from "@/lib/queries";

export default async function HomePage() {
  const [profileResult, projectsResult, skillsResult] = await Promise.all([
    getPublicProfile(),
    getFeaturedProjects(),
    getFeaturedSkills()
  ]);
  const profile = profileResult.available ? profileResult.data : null;
  const projects = projectsResult.available ? projectsResult.data : [];
  const skills = skillsResult.available ? skillsResult.data : [];
  const hasUnavailableData = !profileResult.available || !projectsResult.available || !skillsResult.available;

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero border-b border-rule">
        <div className="container-shell grid gap-14 py-16 lg:min-h-[calc(100svh-var(--spacing-header-public))] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <Stagger className="home-hero-copy">
              <StaggerItem>
                <div className="flex flex-wrap items-center gap-4">
                  <p className="eyebrow">
                    Software Engineering Student
                    {profile ? <><span className="px-2 text-muted">/</span>{profile.location}</> : null}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-2.5 py-1 font-mono text-[10px] text-muted">
                    <span className="size-1.5 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
                    Open to internships
                  </span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <h1 className="mt-7 max-w-3xl text-balance text-display font-medium text-copy sm:text-display-large lg:text-display-xl">
                  I build full-stack web applications that solve real problems.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="copy-measure mt-6 text-body text-muted sm:text-body-large">
                  Undergraduate Software Engineering student at Daffodil International University,
                  building production-ready platforms with React, Node.js, and modern web technologies.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button asChild>
                    <Link href="/projects">Explore selected work <ArrowRight aria-hidden="true" className="size-4" /></Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/contact" prefetch={false}>Start a conversation</Link>
                  </Button>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-10 border-t border-rule pt-5">
                  <p className="font-mono text-metadata text-muted">
                    {profile ? <>{profile.role} <span className="px-2">/</span> </> : null}CORE TOOLKIT
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-body-small text-copy" aria-label="Featured technical skills">
                    {skills.slice(0, 5).map((skill) => <li key={skill.id}>{skill.name}</li>)}
                  </ul>
                </div>
              </StaggerItem>
              {hasUnavailableData ? (
                <StaggerItem>
                  <DatabaseUnavailableNotice className="mt-6" />
                </StaggerItem>
              ) : null}
            </Stagger>

          </div>
          <Reveal className="w-full max-w-140 justify-self-center lg:justify-self-end">
            <EngineeringObject />
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Selected work / 01"
            title="Projects built to solve real problems."
            description="A selection of full-stack platforms and applications I've built. Each project reflects engineering decisions made around real user needs."
            action={
            <Button asChild variant="secondary">
              <Link href="/projects">
                All projects <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            }
          />

          <div className="mt-8">
            {projects.map((project, index) => (
              <CaseStudyCard key={project.id} project={project} index={index + 1} variant={index === 0 ? "featured" : "secondary"} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-rule py-24 md:py-32">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2 className="mt-4 max-w-lg text-heading font-medium text-copy md:text-heading-large">Full-stack development with purpose.</h2>
            <p className="copy-measure mt-5 text-body text-muted">
              I approach each project by understanding the problem first. Good code serves real users —
              I build full-stack systems with clean architecture, clear UX, and reliable delivery.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <CapabilityCluster skills={skills} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-rule py-20 md:py-24">
        <div className="container-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 className="mt-3 max-w-2xl text-heading font-medium text-copy">Looking for a software engineering internship.</h2>
          </div>
          <Button asChild>
            <Link href="/contact" prefetch={false}>
              <Mail aria-hidden="true" className="size-4" />
              Start a conversation
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
