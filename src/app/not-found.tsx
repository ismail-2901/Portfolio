import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32">
      <section className="container-shell max-w-3xl py-16">
        <p className="font-mono text-sm uppercase text-cyan-300">404</p>
        <h1 className="mt-3 text-5xl font-semibold text-zinc-50">This page slipped out of scope.</h1>
        <p className="mt-6 leading-8 text-zinc-300">
          The route does not exist or the content is not published.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Home
          </Link>
        </Button>
      </section>
    </main>
  );
}
