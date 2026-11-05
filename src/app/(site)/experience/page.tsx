import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { getExperienceTimeline } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history, engineering experience, and technical leadership roles by Md Ismail Hossain.",
  alternates: { canonical: "/experience" },
  openGraph: { title: "Experience", description: "Work history and engineering experience by Md Ismail Hossain.", url: "/experience" },
  twitter: { card: "summary", title: "Experience — Md Ismail Hossain", description: "Work history and engineering experience." }
};

export default async function ExperiencePage() {
  const experienceResult = await getExperienceTimeline();
  const experience = experienceResult.available ? experienceResult.data : [];
  const hasUnavailableData = !experienceResult.available;

  return (
    <main id="main-content" tabIndex={-1} className="w-full">
      {hasUnavailableData ? (
        <div className="container-shell pt-6">
          <DatabaseUnavailableNotice />
        </div>
      ) : null}

      <section className="py-16 md:py-24" id="experience">
        <div className="container-shell">
          <h1 className="section-giant-title text-center select-none mb-10 md:mb-14">
            EXPERIENCE
          </h1>
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {experience.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-6 md:p-8 rounded-3xl bg-surface border border-rule transition-shadow hover:shadow-md"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="size-3 rounded-full bg-emerald-500" />
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-copy">
                      {item.role}
                    </h2>
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

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-copy underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity"
            >
              Get in Touch <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
