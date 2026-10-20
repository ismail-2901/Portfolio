import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { getProfile } from "@/lib/queries";

export async function SiteFooter() {
  const profile = await getProfile();

  return (
    <footer className="border-t border-rule py-8 md:py-10">
      <div className="container-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="focus-ring font-medium text-copy">{profile.name}</Link>
          <p className="mt-2 font-mono text-xs text-muted">{profile.role} <span className="px-2">/</span> {profile.location}</p>
        </div>
        <nav aria-label="Footer links" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/projects" className="focus-ring editorial-link text-muted">Projects</Link>
          <Link href="/about" className="focus-ring editorial-link text-muted">About</Link>
          <Link href="/resume" className="focus-ring editorial-link text-muted">Resume</Link>
          <Link href="/privacy" className="focus-ring editorial-link text-muted">Privacy</Link>
          <Link href="/admin" className="focus-ring editorial-link text-muted">Admin</Link>
        </nav>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-5 text-sm md:col-span-2 md:justify-between">
          <p className="font-mono text-[10px] text-muted">© {new Date().getFullYear()} {profile.name}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <Link href={`mailto:${profile.email}`} className="focus-ring editorial-link inline-flex items-center gap-2 text-muted">
              <Mail aria-hidden="true" className="size-4" />Email
            </Link>
            <Link href={profile.githubUrl} target="_blank" rel="noreferrer" className="focus-ring editorial-link inline-flex items-center gap-2 text-muted">
              <Github aria-hidden="true" className="size-4" />GitHub <ArrowUpRight aria-hidden="true" className="size-3" />
            </Link>
            <Link href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="focus-ring editorial-link inline-flex items-center gap-2 text-muted">
              <Linkedin aria-hidden="true" className="size-4" />LinkedIn <ArrowUpRight aria-hidden="true" className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
