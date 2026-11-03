import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { getPublicProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Resume",
  description: "View or request Ismail's engineering resume.",
  alternates: { canonical: "/resume" },
  openGraph: { title: "Resume", description: "Ismail's engineering resume.", url: "/resume" },
  twitter: { card: "summary", title: "Resume", description: "Ismail's engineering resume." }
};

export default async function ResumePage() {
  const profileResult = await getPublicProfile();
  const profile = profileResult.available ? profileResult.data : null;
  const isConfigured =
    profile?.resumeUrl !== undefined &&
    profile.resumeUrl !== "/resume" &&
    (profile.resumeUrl.startsWith("http") || profile.resumeUrl.startsWith("/"));

  if (profile && isConfigured) {
    redirect(profile.resumeUrl);
  }

  return (
    <main id="main-content">
      <section className="container-shell max-w-3xl pb-24 pt-16 md:pb-32 md:pt-24">
        <p className="eyebrow">Resume / CV</p>
        <h1 className="mt-5 text-display font-medium text-copy md:text-display-large">
          {profile ? "Resume link pending." : "Resume details temporarily unavailable."}
        </h1>
        {profile ? (
          <p className="mt-6 text-body text-muted">
            Add a public resume URL or uploaded file path in the Profile record to enable direct downloads.
          </p>
        ) : (
          <DatabaseUnavailableNotice className="mt-6" />
        )}
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
