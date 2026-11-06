"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PublicProfile } from "@/lib/queries";

export function ContactSection({ profile }: { profile?: PublicProfile | null } = {}) {
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
          <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-md group flex items-center justify-center">
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
                Engineering Collaboration
              </p>
              <p className="text-[11px] text-neutral-200/90 mt-0.5 leading-relaxed drop-shadow">
                {profile?.availabilityStatus || "Open to Full-Stack & Software Engineering Internships"}
              </p>
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
                href="https://www.linkedin.com/in/md-ismail-hossain-b10073263"
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
                rel="noopener noreferrer"
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
