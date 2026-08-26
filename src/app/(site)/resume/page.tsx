import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume download."
};

export default async function ResumePage() {
  const profile = await getProfile();
  const isConfigured = profile.resumeUrl.startsWith("http") || profile.resumeUrl.startsWith("/");

  if (isConfigured) {
    redirect(profile.resumeUrl);
  }

  return (
    <main className="pt-32">
      <section className="container-shell max-w-3xl py-16">
        <p className="font-mono text-sm uppercase text-cyan-300">Resume</p>
        <h1 className="mt-3 text-5xl font-semibold text-zinc-50">Resume link pending.</h1>
        <p className="mt-6 leading-8 text-zinc-300">
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
