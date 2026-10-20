import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Resume",
  description: "View or request Ismail's engineering resume.",
  alternates: { canonical: "/resume" },
  openGraph: { title: "Resume", description: "Ismail's engineering resume.", url: "/resume" },
  twitter: { card: "summary", title: "Resume", description: "Ismail's engineering resume." }
};

export default async function ResumePage() {
  const profile = await getProfile();
  const isConfigured =
    profile.resumeUrl !== "/resume" &&
    (profile.resumeUrl.startsWith("http") || profile.resumeUrl.startsWith("/"));

  if (isConfigured) {
    redirect(profile.resumeUrl);
  }

  return (
    <main id="main-content">
      <section className="container-shell max-w-3xl pb-24 pt-16 md:pb-32 md:pt-24">
        <p className="eyebrow">Resume / CV</p>
        <h1 className="mt-5 text-5xl font-medium text-copy md:text-6xl">Resume link pending.</h1>
        <p className="mt-6 leading-8 text-muted">
          Add a public resume URL or uploaded file path in the Profile record to enable direct downloads.
        </p>
        <Button asChild className="mt-8">
          <Link href="/contact">
            <Download aria-hidden="true" className="size-4" />
            Request resume
          </Link>
        </Button>
      </section>
    </main>
  );
}
