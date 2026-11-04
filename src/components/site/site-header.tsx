import { ArrowUpRight } from "lucide-react";

import { MobileNavigation } from "@/components/site/mobile-navigation";
import { navItems } from "@/components/site/site-navigation";
import { SiteNavigationLink } from "@/components/site/site-navigation-link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-rule">
      <div className="container-shell relative flex min-h-header-public items-center justify-between gap-4">
        <SiteNavigationLink
          href="/"
          className="site-brand focus-ring inline-flex min-h-11 items-baseline gap-2 font-medium text-copy"
        >
          <span className="text-body-large">Ismail</span>
          <span className="hidden font-mono text-metadata text-muted sm:inline">/ STUDENT</span>
        </SiteNavigationLink>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.filter((item) => item.href !== "/" && item.href !== "/contact").map((item) => {
            return (
              <SiteNavigationLink
                key={item.href}
                href={item.href}
                className="focus-ring nav-link inline-flex min-h-11 items-center py-2 text-body-small"
              >
                {item.label}
              </SiteNavigationLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <SiteNavigationLink href="/resume" className="focus-ring nav-link inline-flex min-h-11 items-center text-body-small">Resume</SiteNavigationLink>
          <SiteNavigationLink href="/admin" className="focus-ring nav-link inline-flex min-h-11 items-center text-body-small">Admin</SiteNavigationLink>
          <Button asChild size="sm">
            <SiteNavigationLink
              href="/contact"
              prefetch={false}
              className="aria-[current=page]:ring-2 aria-[current=page]:ring-accent aria-[current=page]:ring-offset-2 aria-[current=page]:ring-offset-canvas"
            >
              Contact <ArrowUpRight aria-hidden="true" className="size-4" />
            </SiteNavigationLink>
          </Button>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
