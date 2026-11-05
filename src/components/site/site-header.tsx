import { MobileNavigation } from "@/components/site/mobile-navigation";
import { navItems } from "@/components/site/site-navigation";
import { SiteNavigationLink } from "@/components/site/site-navigation-link";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-canvas/85 backdrop-blur-md border-b border-rule/50 transition-colors duration-200">
      <div className="container-shell relative flex min-h-header-public items-center justify-between gap-4">
        <SiteNavigationLink
          href="/"
          aria-label="Home"
          className="text-xs lg:text-sm font-medium text-muted hover:text-copy transition-colors min-h-[44px] inline-flex items-center tracking-wider"
        >
          IH
        </SiteNavigationLink>

        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Primary navigation"
        >
          {navItems
            .filter((item) => item.href !== "/" && item.href !== "/contact")
            .map((item) => (
              <SiteNavigationLink
                key={item.href}
                href={item.href}
                className="text-xs lg:text-sm font-medium text-muted hover:text-copy transition-colors aria-[current=page]:text-copy aria-[current=page]:font-bold min-h-[44px] inline-flex items-center"
              >
                {item.label}
              </SiteNavigationLink>
            ))}
          <SiteNavigationLink
            href="/contact"
            className="text-xs lg:text-sm font-medium text-muted hover:text-copy transition-colors aria-[current=page]:text-copy aria-[current=page]:font-bold min-h-[44px] inline-flex items-center"
          >
            Contact
          </SiteNavigationLink>
        </nav>

        <div className="flex items-center gap-2 pr-12 md:pr-0">
          <ThemeToggle />
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
