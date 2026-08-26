import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/motion";
import { TechStack } from "@/components/site/tech-stack";
import { getExperienceTimeline, getFeaturedSkills, getProfile } from "@/lib/queries";
import { toDateLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Experience timeline, engineering philosophy, and technical capabilities."
};

export default async function AboutPage() {
  const [profile, experience, skills] = await Promise.all([
    getProfile(),
    getExperienceTimeline(),
    getFeaturedSkills()
  ]);

  return (
    <main className="pt-32">
      <section className="container-shell grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <Badge className="border-emerald-300/30 bg-emerald-300/10 text-emerald-200">{profile.location}</Badge>
          <h1 className="mt-7 text-balance text-5xl font-semibold leading-[1.05] text-zinc-50 md:text-7xl">
            {profile.name}, {profile.role.toLowerCase()}.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">{profile.shortBio}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,250,250,0.07)_1px,transparent_1px),linear-gradient(rgba(250,250,250,0.04)_1px,transparent_1px)] bg-[length:18px_18px]" />
            <div className="absolute inset-8 rounded-lg border border-cyan-300/20 bg-zinc-950/70" />
            <div className="absolute inset-x-10 bottom-12 top-20 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(79,70,229,0.18),rgba(34,211,238,0.08),rgba(9,9,11,0.4))]" />
            <div className="absolute inset-x-0 top-1/3 flex justify-center">
              <div className="flex size-36 items-center justify-center rounded-full border border-cyan-300/30 bg-zinc-950 font-mono text-4xl font-semibold text-cyan-200">
                {profile.name
                  .replace(/\[[^\]]+\]/g, "YN")
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-white/10 bg-zinc-950/50 py-20">
        <div className="container-shell">
          <Reveal>
            <p className="font-mono text-sm uppercase text-cyan-300">Experience</p>
            <h2 className="mt-3 text-4xl font-semibold text-zinc-50">A timeline built around ownership.</h2>
          </Reveal>

          <div className="mt-10 space-y-4">
            {experience.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.04}>
                <article className="grid gap-5 rounded-lg border border-white/10 bg-zinc-900/60 p-6 md:grid-cols-[220px_1fr]">
                  <div className="font-mono text-sm text-zinc-400">
                    {toDateLabel(item.startDate)} - {item.current ? "Present" : toDateLabel(item.endDate)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-zinc-50">{item.role}</h3>
                    <p className="mt-1 text-zinc-300">{item.company}{item.location ? `, ${item.location}` : ""}</p>
                    <p className="mt-4 leading-8 text-zinc-400">{item.summary}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <Reveal>
          <p className="font-mono text-sm uppercase text-emerald-300">Capabilities</p>
          <h2 className="mt-3 text-4xl font-semibold text-zinc-50">Tools chosen for production leverage.</h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <TechStack skills={skills} />
        </Reveal>
      </section>
    </main>
  );
}
