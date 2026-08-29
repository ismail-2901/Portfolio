"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="container-shell flex items-center justify-between gap-3">
        <Link
          href="/"
          className="focus-ring glass-panel rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-100"
          aria-label="Go to home page"
        >
          Ismail
        </Link>

        <nav
          className="glass-panel hidden rounded-full border border-white/10 px-2 py-2 shadow-[0_18px_48px_rgba(0,0,0,0.22)] md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring center-underline rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:text-white",
                  isActive && "bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="secondary" size="sm">
            <Link href="/resume" aria-label="Download resume">
              <Download aria-hidden="true" className="size-4" />
              Resume
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/admin">Admin</Link>
          </Button>
        </div>

        <Button
          variant="secondary"
          size="icon"
          className="md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Menu aria-hidden="true" className="size-5" />
        </Button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="glass-panel container-shell mt-3 grid gap-1 rounded-2xl p-2 md:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="focus-ring rounded-lg px-4 py-3 text-sm text-zinc-200 hover:bg-white/[0.06]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/resume"
            onClick={() => setIsMenuOpen(false)}
            className="focus-ring rounded-lg px-4 py-3 text-sm text-zinc-200 hover:bg-white/[0.06]"
          >
            Resume
          </Link>
          <Link
            href="/admin"
            onClick={() => setIsMenuOpen(false)}
            className="focus-ring rounded-lg px-4 py-3 text-sm text-cyan-200 hover:bg-white/[0.06]"
          >
            Admin
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
