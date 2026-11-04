import Link from "next/link";
import { Mail } from "lucide-react";

import { getFeaturedProjects, getFeaturedSkills, getPublicProfile, getExperienceTimeline } from "@/lib/queries";
import { HeroSection } from "@/components/site/hero-section";
import { ProjectGrid } from "@/components/site/project-grid";
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
    <main id="main-content" tabIndex={-1}>
      {hasUnavailable ? (
        <div className="container-shell pt-6">
          <DatabaseUnavailableNotice />
        </div>
      ) : null}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroSection profile={profile} skills={skills} />

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section className="projects-section motion-reveal" id="projects" style={{ animationDelay: "0.1s" }}>
        <div className="container-shell">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────── */}
      <section className="experience-section motion-reveal" id="experience" style={{ animationDelay: "0.15s" }}>
        <div className="container-shell">
          <div className="section-header">
            <h2 className="section-title">Education &amp; Experience</h2>
          </div>
          <div className="experience-timeline-new">
            {experience.map((item) => (
              <div key={item.id} className="exp-entry">
                <div className="exp-entry-left">
                  <div className="exp-logo-block">
                    <span className="exp-logo-initials">
                      {item.company
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 3)
                        .toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="exp-entry-right">
                  <div className="exp-entry-header">
                    <h3 className="exp-role">{item.role}</h3>
                    <span className="exp-dates">
                      {new Date(item.startDate).getFullYear()} —{" "}
                      {item.current
                        ? "Present"
                        : item.endDate
                          ? new Date(item.endDate).getFullYear()
                          : ""}
                    </span>
                  </div>
                  <p className="exp-company">
                    {item.company}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  <p className="exp-summary">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cta-section motion-reveal" style={{ animationDelay: "0.2s" }}>
        <div className="container-shell cta-inner">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="cta-heading">Looking for a software engineering internship.</h2>
          </div>
          <Link href="/contact" className="hero-btn hero-btn-primary" prefetch={false}>
            <Mail className="size-4" aria-hidden="true" />
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
