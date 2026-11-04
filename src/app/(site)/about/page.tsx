import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CapabilityCluster } from "@/components/site/capability-cluster";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { ExperienceTimeline } from "@/components/site/experience-timeline";
import { SectionIntro } from "@/components/site/section-intro";
import { Button } from "@/components/ui/button";
import { getExperienceTimeline, getFeaturedSkills, getPublicProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About",
  description: "Software Engineering student at Daffodil International University — building full-stack web applications and preparing for internships.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About", description: "Software Engineering student at DIU — full-stack development, React, Node.js, and modern web technologies.", url: "/about" },
  twitter: { card: "summary", title: "About Ismail", description: "Software Engineering student at DIU — full-stack development." }
};

export default async function AboutPage() {
  const [profileResult, experienceResult, skillsResult] = await Promise.all([
    getPublicProfile(),
    getExperienceTimeline(),
    getFeaturedSkills()
  ]);
  const profile = profileResult.available ? profileResult.data : null;
  const experience = experienceResult.available ? experienceResult.data : [];
  const skills = skillsResult.available ? skillsResult.data : [];
  const hasUnavailableData = !profileResult.available || !experienceResult.available || !skillsResult.available;

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="container-shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.62fr] lg:items-center">
        {hasUnavailableData ? (
          <div className="lg:col-span-2">
            <DatabaseUnavailableNotice />
          </div>
        ) : null}
        <div>
          <p className="eyebrow">
            About{profile ? <><span className="px-2 text-muted">/</span>{profile.location}</> : null}
          </p>
          <h1 className="mt-5 text-balance text-display font-medium text-copy md:text-display-large">
            {profile?.name ?? "Profile details temporarily unavailable."}
          </h1>
          {profile ? <p className="mt-3 text-subheading text-muted md:text-heading-small">{profile.role}</p> : null}
          {profile ? <p className="copy-measure mt-7 text-body-large text-muted">{profile.shortBio}</p> : null}
          <p className="mt-8 max-w-2xl border-l border-accent pl-4 text-body-small leading-7 text-copy">
            Building production-ready applications while still at university — combining academic foundations with real-world engineering practice.
          </p>
          <Button asChild variant="ghost" className="mt-7 px-0">
            <Link href="/projects">Explore selected work <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </Button>
        </div>

        {profile?.imageUrl ? (
          <div className="relative aspect-4/5 max-h-130 overflow-hidden border-rule bg-surface">
            <Image
              src={profile.imageUrl}
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 38vw"
              className="object-cover object-center"
            />
          </div>
        ) : null}
      </section>

      <section className="border-y border-rule py-20 md:py-28">
        <div className="container-shell grid gap-10 lg:grid-cols-[220px_1fr]">
          <SectionIntro eyebrow="Experience" title="The work, over time." className="block border-0 pb-0" />
          {experienceResult.available ? <ExperienceTimeline experience={experience} /> : null}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <SectionIntro eyebrow="Capabilities" title="Tools in service of the work." description="Skills are grouped by the kind of problem they help solve. Groups appear when there is relevant profile data." />
        <div className="mt-8">
          {skillsResult.available ? <CapabilityCluster skills={skills} /> : null}
        </div>
      </section>
    </main>
  );
}
