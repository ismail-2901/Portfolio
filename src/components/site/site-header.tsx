"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { MobileNavigation } from "@/components/site/mobile-navigation";
import { navItems } from "@/components/site/site-navigation";
import { SiteNavigationLink } from "@/components/site/site-navigation-link";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const checkHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "experience" || hash === "skills") {
        setActiveSection(hash);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);

    const sectionIds = ["experience", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("hashchange", checkHash);
      observer.disconnect();
    };
  }, [pathname]);

  const isExperienceActive = pathname === "/" && activeSection === "experience";
  const isSkillsActive = pathname === "/" && activeSection === "skills";

  return (
    <header className="sticky top-0 z-50 w-full bg-canvas/85 backdrop-blur-md border-b border-rule/50 transition-colors duration-200">
      <div className="container-shell relative flex min-h-header-public items-center justify-between gap-4">
        <SiteNavigationLink
          href="/"
          className="font-medium text-sm md:text-base text-copy hover:opacity-75 transition-opacity tracking-tight"
        >
          Md Ismail Hossain
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
          <Link
            href="/#experience"
            onClick={() => setActiveSection("experience")}
            aria-current={isExperienceActive ? "page" : undefined}
            className="text-xs lg:text-sm font-medium text-muted hover:text-copy transition-colors aria-[current=page]:text-copy aria-[current=page]:font-bold min-h-[44px] inline-flex items-center"
          >
            Experience
          </Link>
          <Link
            href="/#skills"
            onClick={() => setActiveSection("skills")}
            aria-current={isSkillsActive ? "page" : undefined}
            className="text-xs lg:text-sm font-medium text-muted hover:text-copy transition-colors aria-[current=page]:text-copy aria-[current=page]:font-bold min-h-[44px] inline-flex items-center"
          >
            Skills
          </Link>
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
