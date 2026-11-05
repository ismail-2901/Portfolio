import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { SkillsSection } from "@/components/site/skills-section";
import { getFeaturedSkills } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills, programming languages, libraries, frameworks, and developer toolset of Md Ismail Hossain.",
  alternates: { canonical: "/skills" },
  openGraph: { title: "Skills", description: "Technical skills, frameworks, and tools used by Md Ismail Hossain.", url: "/skills" },
  twitter: { card: "summary", title: "Skills — Md Ismail Hossain", description: "Technical skills, frameworks, and tools." }
};

export default async function SkillsPage() {
  const skillsResult = await getFeaturedSkills();
  const skills = skillsResult.available ? skillsResult.data : [];
  const hasUnavailableData = !skillsResult.available;

  return (
    <main id="main-content" tabIndex={-1} className="w-full">
      {hasUnavailableData ? (
        <div className="container-shell pt-6">
          <DatabaseUnavailableNotice />
        </div>
      ) : null}

      <SkillsSection skills={skills} />

      <div className="container-shell pb-16 text-center">
        <Link
          href="/projects"
          className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-copy underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity"
        >
          View Projects Using These Skills <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </main>
  );
}
