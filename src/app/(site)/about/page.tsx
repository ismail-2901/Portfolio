import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CapabilityCluster } from "@/components/site/capability-cluster";
import { ExperienceTimeline } from "@/components/site/experience-timeline";
import { SectionIntro } from "@/components/site/section-intro";
import { Button } from "@/components/ui/button";
import { getExperienceTimeline, getFeaturedSkills, getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About",
  description: "A concise overview of Ismail's engineering practice, experience, and capabilities.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About", description: "Engineering practice, experience, and capabilities.", url: "/about" },
  twitter: { card: "summary", title: "About Ismail", description: "Engineering practice, experience, and capabilities." }
};

export default async function AboutPage() {
  const [profile, experience, skills] = await Promise.all([
    getProfile(),
    getExperienceTimeline(),
    getFeaturedSkills()
  ]);

  return (
    <main id="main-content">
      <section className="container-shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.62fr] lg:items-center">
        <div>
          <p className="eyebrow">About <span className="px-2 text-muted">/</span> {profile.location}</p>
          <h1 className="mt-5 text-balance text-5xl font-medium leading-[1.04] text-copy md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl text-muted md:text-2xl">{profile.role}</p>
          <p className="copy-measure mt-7 text-lg leading-8 text-muted">{profile.shortBio}</p>
          <p className="mt-8 max-w-2xl border-l border-accent pl-4 text-sm leading-7 text-copy">
            Product thinking, interface craft, and operational discipline belong in the same engineering practice.
          </p>
          <Button asChild variant="ghost" className="mt-7 px-0">
            <Link href="/projects">Explore selected work <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </Button>
        </div>

        {profile.imageUrl ? (
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
          <ExperienceTimeline experience={experience} />
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <SectionIntro eyebrow="Capabilities" title="Tools in service of the work." description="Skills are grouped by the kind of problem they help solve. Groups appear when there is relevant profile data." />
        <div className="mt-8">
          <CapabilityCluster skills={skills} />
        </div>
      </section>
    </main>
  );
}
