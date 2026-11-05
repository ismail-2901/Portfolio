"use client";

import Link from "next/link";
import Image from "next/image";

import type { PublicProfile, PublicSkill } from "@/lib/queries";

export function HeroSection({
  profile,
}: {
  profile: PublicProfile | null;
  skills: PublicSkill[];
}) {
  const name = (profile?.name ?? "MD ISMAIL HOSSAIN").toUpperCase();
  const location = profile?.location ?? "Dhaka, Bangladesh";
  const resumeUrl = profile?.resumeUrl ?? "/resume";
  const imageUrl = profile?.imageUrl;

  return (
    <section className="pt-8 md:pt-16 pb-12 overflow-hidden" id="about">
      <div className="container-shell">
        {/* Massive All-Caps Heading */}
        <h1 className="hero-giant-title text-center select-none whitespace-nowrap">
          {name}
        </h1>

        {/* Hairline Divider */}
        <div className="hairline-divider my-6 md:my-8" />

        {/* 3-Column Sub-Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm font-medium text-copy pb-16 md:pb-24">
          <div className="text-left">
            <p>Software Engineering Student &amp;</p>
            <p>Full-Stack Developer</p>
          </div>
          <div className="text-left md:text-center">
            <p className="text-muted">Based in</p>
            <p>{location}</p>
          </div>
          <div className="text-left md:text-right">
            <p>Working</p>
            <p>Globally</p>
          </div>
        </div>

        {/* Centered Bio Statement */}
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-lg md:text-2xl lg:text-3xl font-medium tracking-tight text-copy leading-relaxed md:leading-snug text-balance">
            A Software Engineering student &amp; Full-Stack Developer from Bangladesh, building high-performance digital experiences where modern design meets scalable technology, clean architecture, and intelligent solutions.
          </p>

          {/* Action Row */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {/* Open to Work Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-copy shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>OPEN TO WORK</span>
            </div>

            {/* Resume Link */}
            <Link
              href={resumeUrl}
              className="text-xs md:text-sm font-bold tracking-wider uppercase underline underline-offset-4 hover:opacity-70 transition-opacity text-copy"
            >
              RESUME
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              className="text-xs md:text-sm font-bold tracking-wider uppercase underline underline-offset-4 hover:opacity-70 transition-opacity text-copy"
            >
              CONTACT
            </Link>
          </div>
        </div>

        {/* Centered Portrait Photo */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <div className="relative w-48 h-56 md:w-56 md:h-64 rounded-2xl overflow-hidden bg-surface-raised border border-rule shadow-sm">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 p-6 text-center">
                <div className="size-20 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-xl font-bold text-neutral-600 dark:text-neutral-300 mb-3">
                  IH
                </div>
                <p className="text-xs font-semibold text-copy uppercase tracking-wider">Ismail Hossain</p>
                <p className="text-[10px] text-muted mt-1">Daffodil Int. University</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
