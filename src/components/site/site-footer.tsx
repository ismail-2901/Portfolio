import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { SiteNavigationLink } from "@/components/site/site-navigation-link";
import { getPublicProfile } from "@/lib/queries";

export async function SiteFooter() {
  const profileResult = await getPublicProfile();
  const profile = profileResult.available ? profileResult.data : null;

  return (
    <footer className="site-footer border-t border-rule py-8 md:py-10">
      <div className="container-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <SiteNavigationLink href="/" className="focus-ring inline-flex min-h-11 items-center font-medium text-copy">{profile?.name ?? "Portfolio"}</SiteNavigationLink>
          {profile ? <p className="mt-2 font-mono text-metadata text-muted">{profile.role} <span className="px-2">/</span> {profile.location}</p> : null}
        </div>
        <nav aria-label="Footer links" className="flex flex-wrap gap-x-6 gap-y-3 text-body-small">
          <SiteNavigationLink href="/projects" className="focus-ring editorial-link inline-flex min-h-11 items-center text-muted">Projects</SiteNavigationLink>
          <SiteNavigationLink href="/about" className="focus-ring editorial-link inline-flex min-h-11 items-center text-muted">About</SiteNavigationLink>
          <SiteNavigationLink href="/resume" className="focus-ring editorial-link inline-flex min-h-11 items-center text-muted">Resume</SiteNavigationLink>
          <SiteNavigationLink href="/privacy" className="focus-ring editorial-link inline-flex min-h-11 items-center text-muted">Privacy</SiteNavigationLink>
          <SiteNavigationLink href="/admin" className="focus-ring editorial-link inline-flex min-h-11 items-center text-muted">Admin</SiteNavigationLink>
        </nav>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-5 text-body-small md:col-span-2 md:justify-between">
          <p className="font-mono text-[10px] text-muted">© {new Date().getFullYear()} {profile?.name ?? "Portfolio"}</p>
          {profile ? (
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              <Link href={`mailto:${profile.email}`} className="focus-ring editorial-link inline-flex min-h-11 items-center gap-2 text-muted">
                <Mail aria-hidden="true" className="size-4" />Email
              </Link>
              <Link href={profile.githubUrl} target="_blank" rel="noreferrer" className="focus-ring editorial-link inline-flex min-h-11 items-center gap-2 text-muted">
                <Github aria-hidden="true" className="size-4" />GitHub <ArrowUpRight aria-hidden="true" className="size-3" />
              </Link>
              <Link href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="focus-ring editorial-link inline-flex min-h-11 items-center gap-2 text-muted">
                <Linkedin aria-hidden="true" className="size-4" />LinkedIn <ArrowUpRight aria-hidden="true" className="size-3" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
