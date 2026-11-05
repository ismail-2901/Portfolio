import {
  getFeaturedProjects,
  getFeaturedSkills,
  getPublicProfile,
  getExperienceTimeline
} from "@/lib/queries";
import { HeroSection } from "@/components/site/hero-section";
import { ProjectGrid } from "@/components/site/project-grid";
import { SkillsSection } from "@/components/site/skills-section";
import { GithubSection } from "@/components/site/github-section";
import { ContactSection } from "@/components/site/contact-section";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";

export default async function HomePage() {
  const [profileResult, projectsResult, skillsResult, experienceResult] = await Promise.all([
    getPublicProfile(),
    getFeaturedProjects(),
    getFeaturedSkills(),
    getExperienceTimeline()
  ]);

  const profile = profileResult.available ? profileResult.data : null;
  const projects = projectsResult.available ? projectsResult.data : [];
  const skills = skillsResult.available ? skillsResult.data : [];
  const experience = experienceResult.available ? experienceResult.data : [];
  const hasUnavailable = !profileResult.available || !projectsResult.available || !skillsResult.available;

  return (
    <main id="main-content" tabIndex={-1} className="w-full">
      {hasUnavailable ? (
        <div className="container-shell pt-6">
          <DatabaseUnavailableNotice />
        </div>
      ) : null}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroSection profile={profile} skills={skills} />

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 motion-reveal" id="projects">
        <div className="container-shell">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 motion-reveal" id="experience">
        <div className="container-shell">
          <h2 className="section-giant-title text-center md:text-left select-none mb-10 md:mb-14">
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

      {/* ── SKILLS ───────────────────────────────────────────── */}
      <SkillsSection skills={skills} />

      {/* ── GITHUB ───────────────────────────────────────────── */}
      <GithubSection />

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <ContactSection />

      <div className="container-shell pointer-events-none" aria-hidden="true">
        <div className="engineering-object-stage h-[1px] opacity-0" />
      </div>
    </main>
  );
}
