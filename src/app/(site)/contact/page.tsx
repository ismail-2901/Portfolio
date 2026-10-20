import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ismail about product engineering, platform work, and security-minded delivery.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", description: "Start a conversation about product and platform engineering.", url: "/contact" },
  twitter: { card: "summary", title: "Contact Ismail", description: "Start a conversation about product and platform engineering." }
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <main id="main-content">
      <section className="container-shell grid gap-14 pb-24 pt-16 md:gap-20 md:pb-32 md:pt-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Contact <span className="px-2 text-muted">/</span> Start a conversation</p>
          <h1 className="mt-5 text-balance text-5xl font-medium leading-[1.04] text-copy md:text-6xl">
            Good engineering starts with a good problem.
          </h1>
          <p className="copy-measure mt-6 text-lg leading-8 text-muted">
            Share what you are trying to make clearer, faster, or more dependable. I work across product engineering,
            platform foundations, and security-minded delivery.
          </p>

          <div className="mt-10 border-t border-rule pt-5">
            <p className="font-mono text-xs text-muted">DIRECT CHANNELS</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <Link href={`mailto:${profile.email}`} className="focus-ring editorial-link inline-flex items-center gap-2 text-sm text-copy">
                <Mail aria-hidden="true" className="size-4 text-accent" />{profile.email}
              </Link>
              <Link href={profile.githubUrl} target="_blank" rel="noreferrer" className="focus-ring editorial-link inline-flex items-center gap-2 text-sm text-copy">
                <Github aria-hidden="true" className="size-4" />GitHub <ArrowUpRight aria-hidden="true" className="size-3" />
              </Link>
              <Link href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="focus-ring editorial-link inline-flex items-center gap-2 text-sm text-copy">
                <Linkedin aria-hidden="true" className="size-4" />LinkedIn <ArrowUpRight aria-hidden="true" className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-rule pt-6 lg:border-t-0 lg:pt-0">
          <h2 className="text-xl font-medium text-copy">Tell me about the work</h2>
          <p className="mt-2 text-sm text-muted">A little context helps me give you a useful response.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
