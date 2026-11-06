import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Inbox, Layers3, Sparkles, UserCheck, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDashboardStats } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const cards = [
  { label: "Projects", key: "projects", href: "/admin/projects", icon: Layers3 },
  { label: "Articles", key: "articles", href: "/admin/articles", icon: FileText },
  { label: "Experience", key: "experience", href: "/admin/experience", icon: Briefcase },
  { label: "Skills", key: "skills", href: "/admin/skills", icon: Sparkles },
  { label: "Unread Messages", key: "unreadMessages", href: "/admin/messages", icon: Inbox }
] as const;

export default async function AdminDashboardPage() {
  const [stats, profile, recentMessages] = await Promise.all([
    getDashboardStats(),
    prisma.profile.findUnique({ where: { id: "singleton" } }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 4
    })
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-metadata uppercase text-accent">Dashboard</p>
          <h1 className="mt-2 text-heading font-semibold text-copy">Content overview</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href="/admin/profile">Edit Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/projects/new">
              New project
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Availability Banner */}
      {profile && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-panel border border-rule bg-surface-raised">
          <div className="flex items-center gap-3">
            <span
              className={`size-3 rounded-full ${
                profile.availableForHire ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
              }`}
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-copy">
                {profile.availableForHire ? "Open to Work / Available for Hire" : "Not Currently Looking"}
              </p>
              {profile.availabilityStatus && (
                <p className="text-xs text-muted mt-0.5">{profile.availabilityStatus}</p>
              )}
            </div>
          </div>
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline self-start sm:self-auto"
          >
            <UserCheck className="size-3.5" />
            Update Status
          </Link>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              href={card.href}
              key={card.key}
              className="focus-ring rounded-panel border border-rule bg-surface-raised p-5 transition hover:border-accent/50"
            >
              <Icon aria-hidden="true" className="size-5 text-accent" />
              <p className="mt-5 text-heading font-semibold text-copy">{stats[card.key]}</p>
              <p className="mt-1 text-body-small text-muted">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Contact Messages Section */}
      <div className="rounded-panel border border-rule bg-surface-raised p-6">
        <div className="flex items-center justify-between pb-4 border-b border-rule/60">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-accent" />
            <h2 className="text-subheading font-semibold text-copy">Recent Inquiries</h2>
          </div>
          <Link
            href="/admin/messages"
            className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
          >
            View all ({recentMessages.length}) <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="mt-4 divide-y divide-rule/60">
          {recentMessages.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted">No messages received yet.</p>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-copy">{msg.name}</span>
                    {!msg.readAt && <Badge className="border-accent/30 text-accent text-[10px] py-0 px-1.5">New</Badge>}
                    {msg.company && <span className="text-xs text-muted">({msg.company})</span>}
                  </div>
                  <p className="text-xs text-muted line-clamp-1 mt-0.5">{msg.message}</p>
                </div>
                <div className="shrink-0 text-[11px] text-muted sm:text-right">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
