import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/queries";

export async function SiteFooter() {
  const profile = await getProfile();

  return (
    <footer className="border-t border-white/10 bg-zinc-950/40 py-12">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-zinc-100">{profile.name}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">{profile.role} in {profile.location}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label="Email">
            <Link href={`mailto:${profile.email}`}>
              <Mail aria-hidden="true" className="size-4" />
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
          <Link className="center-underline text-sm text-zinc-400 hover:text-zinc-100" href="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
