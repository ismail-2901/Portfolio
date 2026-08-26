import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact form for project, consulting, and engineering leadership inquiries."
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <main className="pt-32">
      <section className="container-shell grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="font-mono text-sm uppercase text-cyan-300">Contact</p>
          <h1 className="mt-3 text-balance text-5xl font-semibold leading-[1.05] text-zinc-50 md:text-7xl">
            Let&apos;s build something resilient and sharp.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            For product engineering, platform modernization, security hardening, and technical leadership work.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" className="size-4" />
                Email
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <Link href={profile.githubUrl} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
              <Link href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                <Linkedin aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </section>
    </main>
  );
}
