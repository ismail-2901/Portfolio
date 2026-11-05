import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
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
  const hasUnavailableData = !profileResult.available || !experienceResult.available || !skillsResult.available;

  return (
    <main id="main-content" tabIndex={-1} className="w-full">
      {hasUnavailableData ? (
        <div className="container-shell pt-6">
          <DatabaseUnavailableNotice />
        </div>
      ) : null}

      {/* ── HERO ── */}
      <section className="py-16 md:py-24" id="about-hero">
        <div className="container-shell">
          <div className="hairline-divider mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Identity */}
            <div>
              <h1 className="section-giant-title select-none leading-none">
                ABOUT
              </h1>
              <p className="mt-8 text-sm md:text-base text-muted leading-relaxed max-w-lg">
                {profile?.shortBio ?? "Software Engineering student at Daffodil International University, building full-stack web applications with React, Node.js, and modern web technologies."}
              </p>
              <p className="mt-5 max-w-lg border-l-2 border-copy pl-4 text-sm text-copy leading-relaxed">
                Building production-ready applications while still at university — combining academic foundations with real-world engineering practice.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-copy underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity"
                >
                  Explore Work <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-copy underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity"
                >
                  Get In Touch <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Portrait */}
            {profile?.imageUrl ? (
              <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-2xl bg-surface-raised border border-rule shadow-sm">
                <Image
                  src={profile.imageUrl}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 44vw"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-2xl bg-surface-raised border border-rule flex items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  {profile?.name ?? "Md Ismail Hossain"}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ── */}
      {experience.length > 0 && (
        <section className="py-16 md:py-24 border-t border-rule" id="about-experience">
          <div className="container-shell">
            <h2 className="section-giant-title select-none mb-10 md:mb-14">
              EXPERIENCE
            </h2>
            <div className="flex flex-col gap-8 max-w-4xl">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-6 md:p-8 rounded-3xl bg-surface border border-rule transition-shadow hover:shadow-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="size-3 rounded-full bg-emerald-500" />
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-copy">
                        {item.role}
                      </h3>
                    </div>
                    <p className="text-sm font-semibold text-copy mt-2">
                      {item.company}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    <p className="text-xs md:text-sm text-muted mt-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="shrink-0 md:text-right">
                    <span className="inline-block rounded-full bg-surface-raised px-3 py-1 text-xs font-semibold text-copy border border-rule">
                      {new Date(item.startDate).getFullYear()} —{" "}
                      {item.current
                        ? "Present"
                        : item.endDate
                          ? new Date(item.endDate).getFullYear()
                          : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EDUCATION ── */}
      <section className="py-16 md:py-24 border-t border-rule" id="about-education">
        <div className="container-shell">
          <h2 className="section-giant-title select-none mb-10 md:mb-14">
            EDUCATION
          </h2>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-6 md:p-8 rounded-3xl bg-surface border border-rule max-w-4xl">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-blue-500" />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-copy">
                  B.Sc. in Software Engineering
                </h3>
              </div>
              <p className="text-sm font-semibold text-copy mt-2">
                Daffodil International University · Dhaka, Bangladesh
              </p>
              <p className="text-xs md:text-sm text-muted mt-3 leading-relaxed">
                Full-time undergraduate focusing on software architecture, web engineering, algorithms, and database systems.
              </p>
            </div>
            <div className="shrink-0 md:text-right">
              <span className="inline-block rounded-full bg-surface-raised px-3 py-1 text-xs font-semibold text-copy border border-rule">
                2023 — Present
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
