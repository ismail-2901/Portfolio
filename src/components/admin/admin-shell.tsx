"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BarChart3, FileText, Images, Inbox, Layers3, Settings, Sparkles } from "lucide-react";

import { LogoutButton } from "@/components/admin/logout-button";

const navItems = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/profile", label: "Profile", icon: Settings },
  { href: "/admin/projects", label: "Projects", icon: Layers3 },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/media", label: "Media", icon: Images },
  { href: "/admin/messages", label: "Messages", icon: Inbox }
];

function AdminNavLink({
  href,
  label,
  icon: Icon,
  compact = false
}: {
  href: string;
  label: string;
  icon: typeof BarChart3;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = href === "/admin" ? pathname === href : pathname.startsWith(`${href}/`) || pathname === href;
  const layoutClasses = compact ? "gap-2 text-metadata" : "gap-3 text-body-small";

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`focus-ring relative flex items-center ${layoutClasses} rounded-panel px-3 py-2 transition ${
        isActive
          ? "bg-accent/10 text-copy before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-accent"
          : "text-muted hover:bg-copy/5 hover:text-copy"
      }`}
    >
      <Icon aria-hidden="true" className={`size-4 ${isActive ? "text-accent" : ""}`} />
      {label}
    </Link>
  );
}

const notices = {
  saved: "Changes saved successfully.",
  created: "Created successfully.",
  deleted: "Deleted successfully.",
  uploaded: "Image uploaded successfully.",
  read: "Message marked as read.",
  archived: "Message archived successfully."
} as const;

function AdminNotice() {
  const searchParams = useSearchParams();
  const noticeKey = searchParams.get("notice") as keyof typeof notices | null;
  const notice = noticeKey ? notices[noticeKey] : undefined;

  if (!notice) {
    return null;
  }

  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-50 rounded-panel border border-success-border/30 bg-surface-raised px-4 py-3 text-body-small text-success shadow-xl"
    >
      {notice}
    </div>
  );
}

export function AdminShell({
  children,
  userName
}: {
  children: React.ReactNode;
  userName?: string | null;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <AdminNotice />
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-rule bg-canvas/90 p-5 lg:block">
        <Link href="/admin" className="font-mono text-body-small font-semibold uppercase text-copy">
          Portfolio Admin
        </Link>
        <nav className="mt-8 grid gap-1" aria-label="Admin navigation">
          {navItems.map((item) => {
            return <AdminNavLink key={item.href} {...item} />;
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-rule bg-canvas/80 backdrop-blur">
          <div className="flex min-h-header-admin items-center justify-between gap-4 px-5">
            <div>
              <p className="text-body-small font-medium text-copy">{userName ?? "Admin"}</p>
              <p className="text-metadata text-muted">Session protected</p>
            </div>
            <div className="flex items-center gap-2">
              <Link className="center-underline text-body-small text-muted hover:text-copy" href="/">
                View site
              </Link>
              <LogoutButton />
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-rule p-2 lg:hidden" aria-label="Admin navigation">
            {navItems.map((item) => {
              return <AdminNavLink key={item.href} compact {...item} />;
            })}
          </nav>
        </header>
        <main className="px-5 py-8">{children}</main>
      </div>
    </div>
  );
}
