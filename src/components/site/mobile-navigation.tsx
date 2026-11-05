"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navItems } from "@/components/site/site-navigation";
import { SiteNavigationLink } from "@/components/site/site-navigation-link";

export function MobileNavigation() {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    if (document.activeElement instanceof HTMLElement && document.activeElement.closest("#mobile-navigation")) {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mobile-navigation pointer-events-none absolute inset-x-0 top-0 z-10 h-full md:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="mobile-navigation-toggle focus-ring pointer-events-auto absolute right-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-small border border-control-border bg-surface text-copy"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Menu aria-hidden="true" className="mobile-navigation-open size-5" />
        <X aria-hidden="true" className="mobile-navigation-close size-5" />
      </button>
      <nav
        id="mobile-navigation"
        hidden={!isOpen}
        className="mobile-navigation-panel pointer-events-auto absolute left-0 right-0 top-full grid gap-1 overflow-y-auto overscroll-contain border-t border-rule bg-canvas px-2 py-3"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <SiteNavigationLink
            key={item.href}
            href={item.href}
            prefetch={item.href === "/contact" ? false : undefined}
            className="focus-ring mobile-navigation-link flex min-h-11 items-center px-3 py-3 text-body-small text-copy hover:text-accent"
          >
            {item.label}
          </SiteNavigationLink>
        ))}
        <SiteNavigationLink
          href="/#experience"
          className="focus-ring mobile-navigation-link flex min-h-11 items-center px-3 py-3 text-body-small text-copy hover:text-accent"
        >
          Experience
        </SiteNavigationLink>
        <SiteNavigationLink
          href="/#skills"
          className="focus-ring mobile-navigation-link flex min-h-11 items-center px-3 py-3 text-body-small text-copy hover:text-accent"
        >
          Skills
        </SiteNavigationLink>
        <SiteNavigationLink
          href="/resume"
          className="focus-ring mobile-navigation-link flex min-h-11 items-center px-3 py-3 text-body-small text-copy hover:text-accent"
        >
          Resume
        </SiteNavigationLink>
      </nav>
    </div>
  );
}
