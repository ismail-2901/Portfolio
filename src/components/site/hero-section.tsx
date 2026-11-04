"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileDown, Github } from "lucide-react";

import type { PublicProfile, PublicSkill } from "@/lib/queries";

// ── Per-word animated heading ─────────────────────────────────────────────────
function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="hero-h1" aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="hero-word"
          style={{ animationDelay: `${0.08 + i * 0.065}s` }}
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h1>
  );
}

// ── Count-up stat ─────────────────────────────────────────────────────────────
function StatCounter({
  value,
  label,
  suffix = "+"
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 40;
          const step = value / steps;
          let current = 0;
          const id = setInterval(() => {
            current = Math.min(current + step, value);
            setCount(Math.round(current));
            if (current >= value) clearInterval(id);
          }, 1200 / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="hero-stat">
      <span className="hero-stat-value">
        {count}
        {suffix}
      </span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

// ── Hero section (client) ─────────────────────────────────────────────────────
export function HeroSection({
  profile,
  skills
}: {
  profile: PublicProfile | null;
  skills: PublicSkill[];
}) {
  return (
    <section className="hero-section" id="hero">
      <div className="container-shell hero-grid">
        {/* Left: copy */}
        <div className="hero-copy">
          <AnimatedHeading text="I build full-stack web applications that solve real problems." />

          {/* Stats row */}
          <div className="hero-stats-row" aria-label="Quick stats">
            <StatCounter value={2} label="Projects shipped" suffix="+" />
            <StatCounter value={13} label="Technologies" suffix="+" />
            <StatCounter value={2} label="Years coding" suffix="+" />
          </div>

          {/* Bio */}
          <p className="hero-bio">
            Undergraduate Software Engineering student at{" "}
            <span className="text-accent">Daffodil International University</span>,
            building production-ready platforms with React, Node.js, and modern web technologies.
          </p>

          {/* Availability badge + buttons */}
          <div className="hero-cta-row">
            <div className="availability-badge">
              <span className="availability-dot" aria-hidden="true" />
              Open to internships
            </div>
            <div className="hero-buttons">
              <a
                href={profile?.githubUrl ?? "https://github.com/ismail-2901"}
                target="_blank"
                rel="noreferrer"
                className="hero-btn hero-btn-primary"
              >
                <Github className="size-4" aria-hidden="true" />
                GitHub
              </a>
              <Link href="/resume" className="hero-btn hero-btn-secondary">
                <FileDown className="size-4" aria-hidden="true" />
                Resume
              </Link>
            </div>
          </div>

          {/* Skills strip */}
          {skills.length > 0 ? (
            <div className="hero-skills-strip">
              <span className="hero-skills-label">Core toolkit</span>
              <ul className="hero-skills-list" aria-label="Featured skills">
                {skills.slice(0, 6).map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Right: identity card */}
        <div className="hero-identity motion-reveal" style={{ animationDelay: "0.5s" }}>
          <div className="hero-avatar">
            <div className="hero-avatar-inner">
              <span className="hero-avatar-initials">MIH</span>
            </div>
            <div className="hero-avatar-ring" aria-hidden="true" />
          </div>
          <p className="hero-identity-name">{profile?.name ?? "Md Ismail Hossain"}</p>
          <p className="hero-identity-role">{profile?.role ?? "Full-Stack Software Engineering Student"}</p>
          <p className="hero-identity-location">{profile?.location ?? "Dhaka, Bangladesh"}</p>
          <div className="hero-identity-links">
            <a
              href={profile?.githubUrl ?? "https://github.com/ismail-2901"}
              target="_blank"
              rel="noreferrer"
              className="hero-identity-link"
            >
              <Github className="size-3.5" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={profile?.linkedinUrl ?? "https://www.linkedin.com/in/md-ismail-hossain-2001"}
              target="_blank"
              rel="noreferrer"
              className="hero-identity-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
