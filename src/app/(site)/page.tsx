import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EngineeringObject } from "@/components/site/engineering-object";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { CaseStudyCard } from "@/components/site/case-study-card";
import { SectionIntro } from "@/components/site/section-intro";
import { CapabilityCluster } from "@/components/site/capability-cluster";
import { getFeaturedProjects, getFeaturedSkills, getProfile } from "@/lib/queries";

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getFeaturedSkills()
  ]);

  return (
    <main id="main-content">
      <section className="home-hero border-b border-rule">
        <div className="container-shell grid gap-14 py-16 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <Stagger className="home-hero-copy">
              <StaggerItem>
                <p className="eyebrow">Product engineering <span className="px-2 text-muted">/</span> {profile.location}</p>
              </StaggerItem>
              <StaggerItem>
                <h1 className="mt-7 max-w-3xl text-balance text-5xl font-medium leading-[1.04] text-copy sm:text-6xl lg:text-7xl">
                  I build software that makes complex work feel clear.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="copy-measure mt-6 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  I work across product interfaces, application architecture, and operational foundations,
                  bringing full-stack engineering together with purposeful AI integration.
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
                  <p className="font-mono text-xs text-muted">{profile.role} <span className="px-2">/</span> CORE TOOLKIT</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-copy" aria-label="Featured technical skills">
                    {skills.slice(0, 5).map((skill) => <li key={skill.id}>{skill.name}</li>)}
                  </ul>
                </div>
              </StaggerItem>
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
            title="Systems shaped around real product needs."
            description="A selection of platform, product, and interface work. Each study focuses on the engineering decisions behind the experience."
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
              <CaseStudyCard key={project.id} project={project} index={index + 1} variant={index === 0 ? "featured" : "secondary"} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-rule py-24 md:py-32">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight text-copy md:text-4xl">Engineering is a product discipline.</h2>
            <p className="copy-measure mt-5 leading-7 text-muted">
              Good systems balance user clarity with operational reality. I bring interface craft,
              full-stack implementation, and security-minded decisions into the same conversation.
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
            <h2 className="mt-3 max-w-2xl text-3xl font-medium text-copy">Have a complex product or platform problem?</h2>
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
