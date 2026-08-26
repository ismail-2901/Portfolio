import Link from "next/link";
import { ArrowRight, FileText, Inbox, Layers3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDashboardStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

const cards = [
  { label: "Projects", key: "projects", href: "/admin/projects", icon: Layers3 },
  { label: "Articles", key: "articles", href: "/admin/articles", icon: FileText },
  { label: "Skills", key: "skills", href: "/admin/skills", icon: Sparkles },
  { label: "Unread Messages", key: "unreadMessages", href: "/admin/messages", icon: Inbox }
] as const;

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-sm uppercase text-cyan-300">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Content overview</h1>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            New project
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              href={card.href}
              key={card.key}
              className="focus-ring rounded-lg border border-white/10 bg-zinc-900/60 p-5 transition hover:border-cyan-300/50"
            >
              <Icon aria-hidden="true" className="size-5 text-cyan-300" />
              <p className="mt-5 text-3xl font-semibold text-zinc-50">{stats[card.key]}</p>
              <p className="mt-1 text-sm text-zinc-400">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
