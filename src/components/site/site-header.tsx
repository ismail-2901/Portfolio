import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MobileNavigation } from "@/components/site/mobile-navigation";
import { navItems } from "@/components/site/site-navigation";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-rule">
      <div className="container-shell relative flex min-h-18 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-ring flex items-baseline gap-2 font-medium text-copy"
        >
          <span className="text-lg">Ismail</span>
          <span className="hidden font-mono text-[10px] text-muted sm:inline">/ ENGINEER</span>
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.filter((item) => item.href !== "/" && item.href !== "/contact").map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring nav-link py-2 text-sm"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/resume" className="focus-ring nav-link text-sm">Resume</Link>
          <Link href="/admin" className="focus-ring nav-link text-sm">Admin</Link>
          <Button asChild size="sm">
            <Link href="/contact" prefetch={false}>Contact <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </Button>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
