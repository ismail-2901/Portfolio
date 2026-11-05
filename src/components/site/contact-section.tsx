"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-16 md:py-24" id="contact">
      <div className="container-shell">
        {/* Giant Section Title — Centered */}
        <h2 className="section-giant-title text-center select-none mb-10 md:mb-14">
          CONTACT
        </h2>

        {/* Centered Showcase Card */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-6 sm:p-8 md:p-10 rounded-3xl bg-surface border border-rule shadow-sm">
          {/* Left Column: Visual Container */}
          <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-surface-raised border border-rule shadow-xs flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-tr from-neutral-300 via-neutral-200 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 p-6 flex flex-col justify-end">
              <span className="text-xs font-bold uppercase tracking-wider text-copy/90">
                Engineering Collaboration
              </span>
              <span className="text-[11px] text-muted mt-1 leading-relaxed">
                Open to Full-Stack &amp; Software Engineering Internships
              </span>
            </div>
          </div>

          {/* Right Column: Location, Email & Social Links */}
          <div className="flex flex-col gap-5">
            {/* Location */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-copy">
                DHAKA, BANGLADESH
              </p>
            </div>

            {/* Get In Touch */}
            <div className="pt-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                GET IN TOUCH:
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">
                EMAIL:
              </p>
              <Link
                href="mailto:ismailsajinabusaleh@gmail.com"
                className="inline-block text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-copy underline underline-offset-4 decoration-2 decoration-copy hover:opacity-70 transition-opacity mt-1 break-all"
              >
                ISMAILSAJINABUSALEH@GMAIL.COM
              </Link>
            </div>

            {/* Social Links List */}
            <div className="pt-2 flex flex-col gap-1">
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
