"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-16 md:py-24" id="contact">
      <div className="container-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Giant CONTACT Heading */}
          <div>
            <h2 className="section-giant-title text-left select-none leading-none">
              CONTACT
            </h2>
          </div>

          {/* Right Column: Workplace Image, Email & Social Links */}
          <div className="flex flex-col gap-6 max-w-md">
            {/* Workplace Illustration / Photo Container */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-surface-raised border border-rule shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-tr from-neutral-300 via-neutral-200 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 p-6 flex flex-col justify-end">
                <span className="text-xs font-bold uppercase tracking-wider text-copy/80">
                  Engineering Collaboration
                </span>
                <span className="text-[11px] text-muted">
                  Open to Full-Stack &amp; Software Engineering Internships
                </span>
              </div>
            </div>

            {/* Location */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-copy">
                DHAKA, BANGLADESH
              </p>
            </div>

            {/* Get In Touch */}
            <div className="pt-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                GET IN TOUCH:
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">
                EMAIL:
              </p>
              <Link
                href="mailto:ismailsajinabusaleh@gmail.com"
                className="inline-block text-sm md:text-base font-bold uppercase tracking-wider text-copy underline underline-offset-4 decoration-2 decoration-copy hover:opacity-70 transition-opacity mt-1"
              >
                ISMAILSAJINABUSALEH@GMAIL.COM
              </Link>
            </div>

            {/* Social Links List */}
            <div className="pt-4 flex flex-col gap-1">
              <Link
                href="https://www.linkedin.com/in/md-ismail-hossain-2001"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-copy hover:opacity-75 transition-opacity min-h-[44px] py-1 border-b border-rule/50"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href="https://github.com/ismail-2901"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-copy hover:opacity-75 transition-opacity min-h-[44px] py-1 border-b border-rule/50"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-copy hover:opacity-75 transition-opacity min-h-[44px] py-1 border-b border-rule/50"
              >
                <span>RESUME</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

