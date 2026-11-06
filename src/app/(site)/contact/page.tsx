import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { getPublicProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about software engineering internships, collaborations, or full-stack project work.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", description: "Get in touch about software engineering internships and collaborations.", url: "/contact" },
  twitter: { card: "summary", title: "Contact Ismail", description: "Get in touch about software engineering internships and collaborations." }
};

export default async function ContactPage() {
  const profileResult = await getPublicProfile();
  const profile = profileResult.available ? profileResult.data : null;

  return (
    <main id="main-content" tabIndex={-1} className="w-full">
      {/* ── CONTACT ── */}
      <section className="py-16 md:py-24" id="contact-page">
        <div className="container-shell">
          {!profileResult.available ? <DatabaseUnavailableNotice className="mb-8" /> : null}

          {/* Hairline Divider & Giant Title */}
          <div className="hairline-divider mb-8" />
          <h1 className="section-giant-title select-none leading-none mb-10 md:mb-14">
            CONTACT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Info */}
            <div className="flex flex-col gap-6 max-w-md">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-md group">
                {profile?.imageUrl ? (
                  <Image
                    src={profile.imageUrl}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 480px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="size-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/10 shadow-sm">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                    {profile?.availableForHire ? "Available for Hire" : "Engineering Openings"}
                  </span>
                </div>
                <div className="absolute bottom-4 inset-x-4 z-10 select-none">
                  <p className="text-xs font-bold uppercase tracking-wider text-white drop-shadow">
                    Engineering Opportunities
                  </p>
                  <p className="text-[11px] text-neutral-200/90 mt-0.5 leading-relaxed drop-shadow">
                    {profile?.availabilityStatus || "Open to Full-Stack & Software Engineering Internships"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-copy">
                  {profile?.location ? profile.location.toUpperCase() : "DHAKA, BANGLADESH"}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  GET IN TOUCH:
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">
                  EMAIL:
                </p>
                <Link
                  href={`mailto:${profile?.email ?? "ismailsajinabusaleh@gmail.com"}`}
                  className="inline-block text-sm md:text-base font-bold uppercase tracking-wider text-copy underline underline-offset-4 decoration-2 decoration-copy hover:opacity-70 transition-opacity mt-1 min-h-[44px] flex items-center"
                >
                  {(profile?.email ?? "ismailsajinabusaleh@gmail.com").toUpperCase()}
                </Link>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex flex-col gap-1">
                {profile?.linkedinUrl && (
                  <Link
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-copy hover:opacity-75 transition-opacity min-h-[44px] py-1 border-b border-rule/50"
                  >
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                )}
                {profile?.githubUrl && (
                  <Link
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-copy hover:opacity-75 transition-opacity min-h-[44px] py-1 border-b border-rule/50"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                )}
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-copy hover:opacity-75 transition-opacity min-h-[44px] py-1 border-b border-rule/50"
                >
                  <span>RESUME</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="p-6 md:p-8 rounded-3xl bg-surface border border-rule shadow-sm">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-copy mb-2">
                Have a project or opportunity?
              </h2>
              <p className="text-xs md:text-sm text-muted mb-6 leading-relaxed">
                Whether you have an internship opportunity or want to collaborate on a full-stack project, feel free to reach out.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
