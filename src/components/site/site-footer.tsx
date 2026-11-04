import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { SiteNavigationLink } from "@/components/site/site-navigation-link";
import { getPublicProfile } from "@/lib/queries";

export async function SiteFooter() {
  const profileResult = await getPublicProfile();
  const profile = profileResult.available ? profileResult.data : null;

  return (
    <footer className="border-t border-rule/60 py-12 md:py-16 text-copy bg-canvas">
      <div className="container-shell">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-rule/50">
          <div>
            <SiteNavigationLink href="/" className="font-bold text-base md:text-lg text-copy">
              {profile?.name ?? "Md Ismail Hossain"}
            </SiteNavigationLink>
            <p className="text-xs text-muted mt-1">
              Software Engineering Student · Dhaka, Bangladesh
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold tracking-wider uppercase">
            <SiteNavigationLink href="/projects" className="text-muted hover:text-copy transition-colors">
              Projects
            </SiteNavigationLink>
            <SiteNavigationLink href="/about" className="text-muted hover:text-copy transition-colors">
              About
            </SiteNavigationLink>
            <SiteNavigationLink href="/resume" className="text-muted hover:text-copy transition-colors">
              Resume
            </SiteNavigationLink>
            <SiteNavigationLink href="/contact" className="text-muted hover:text-copy transition-colors">
              Contact
            </SiteNavigationLink>
            <SiteNavigationLink href="/admin" className="text-muted hover:text-copy transition-colors">
              Admin
            </SiteNavigationLink>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-muted">
          <p>© {new Date().getFullYear()} {profile?.name ?? "Md Ismail Hossain"}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link
              href="mailto:ismailsajinabusaleh@gmail.com"
              className="hover:text-copy transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="size-3.5" /> Email
            </Link>
            <Link
              href="https://github.com/ismail-2901"
              target="_blank"
              rel="noreferrer"
              className="hover:text-copy transition-colors inline-flex items-center gap-1.5"
              aria-label="GitHub"
            >
              <Github className="size-3.5" /> GitHub <ArrowUpRight className="size-3" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/md-ismail-hossain-2001"
              target="_blank"
              rel="noreferrer"
              className="hover:text-copy transition-colors inline-flex items-center gap-1.5"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-3.5" /> LinkedIn <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
