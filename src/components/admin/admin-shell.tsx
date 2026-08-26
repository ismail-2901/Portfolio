import Link from "next/link";
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

export function AdminShell({
  children,
  userName
}: {
  children: React.ReactNode;
  userName?: string | null;
}) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-zinc-950/90 p-5 lg:block">
        <Link href="/admin" className="font-mono text-sm font-semibold uppercase text-zinc-50">
          Portfolio Admin
        </Link>
        <nav className="mt-8 grid gap-1" aria-label="Admin navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-50"
              >
                <Icon aria-hidden="true" className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-5">
            <div>
              <p className="text-sm font-medium text-zinc-100">{userName ?? "Admin"}</p>
              <p className="text-xs text-zinc-500">Session protected</p>
            </div>
            <div className="flex items-center gap-2">
              <Link className="center-underline text-sm text-zinc-400 hover:text-zinc-100" href="/">
                View site
              </Link>
              <LogoutButton />
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-white/10 p-2 lg:hidden" aria-label="Admin navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-400"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="px-5 py-8">{children}</main>
      </div>
    </div>
  );
}
