import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroParticles } from "@/components/site/hero-particles";
import { MagneticLink } from "@/components/site/magnetic-link";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { ProjectCard } from "@/components/site/project-card";
import { TechStack } from "@/components/site/tech-stack";
import { getFeaturedProjects, getFeaturedSkills, getProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getFeaturedSkills()
  ]);

  return (
    <main>
      <section className="hero-height relative isolate overflow-hidden pt-32">
        <HeroParticles />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.45),rgba(9,9,11,0.82)_72%,#09090b)]" />

        <div className="container-shell relative z-10 flex min-h-[calc(85vh-7rem)] flex-col justify-center pb-20">
          <Stagger className="max-w-5xl">
            <StaggerItem>
              <Badge className="border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                {profile.location}
              </Badge>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-8 max-w-5xl text-balance text-5xl font-semibold leading-[1.02] text-zinc-50 sm:text-7xl lg:text-8xl">
                I build secure, scalable, and beautiful digital experiences.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
                {profile.name} is a {profile.role.toLowerCase()} focused on reliable architecture,
                elegant interfaces, and production systems that hold up under real-world pressure.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticLink href="/projects">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  View work
                </MagneticLink>
                <MagneticLink href="/contact" variant="secondary">
                  <Mail aria-hidden="true" className="size-4" />
                  Contact
                </MagneticLink>
                <Button asChild variant="ghost" size="icon" aria-label="GitHub">
                  <Link href={profile.githubUrl} target="_blank" rel="noreferrer">
                    <Github aria-hidden="true" className="size-5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                  <Link href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                    <Linkedin aria-hidden="true" className="size-5" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-sm uppercase text-cyan-300">Featured Projects</p>
              <h2 className="mt-3 text-4xl font-semibold text-zinc-50">Selected systems with real product weight.</h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/projects">
                All projects
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <div className="bento-grid mt-10">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.04} className="bento-item">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950/50 py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="font-mono text-sm uppercase text-emerald-300">Technical Range</p>
            <h2 className="mt-3 text-4xl font-semibold text-zinc-50">Full-stack depth with a security engineer&apos;s instincts.</h2>
            <p className="mt-5 max-w-xl leading-8 text-zinc-400">
              The stack is intentionally modern but not ornamental: typed boundaries, server-first data flow,
              measured animation, and operational discipline from local Docker to Vercel deployment.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <TechStack skills={skills} />
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell flex flex-col gap-6 rounded-lg border border-white/10 bg-zinc-900/60 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-mono text-sm uppercase text-indigo-300">Contact CTA</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-zinc-50">Have a complex product or platform problem?</h2>
          </div>
          <MagneticLink href="/contact">
            <Mail aria-hidden="true" className="size-4" />
            Start a conversation
          </MagneticLink>
        </div>
      </section>
    </main>
  );
}
