"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navItems } from "@/components/site/site-navigation";

export function MobileNavigation() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  return (
    <details ref={menuRef} className="mobile-navigation md:hidden">
      <summary className="mobile-navigation-toggle focus-ring flex size-10 cursor-pointer items-center justify-center rounded-[6px] border border-rule bg-surface text-copy">
        <span className="sr-only">Navigation menu</span>
        <Menu aria-hidden="true" className="mobile-navigation-open size-5" />
        <X aria-hidden="true" className="mobile-navigation-close size-5" />
      </summary>
      <nav
        id="mobile-navigation"
        className="mobile-navigation-panel absolute left-0 right-0 top-full grid gap-1 border-t border-rule bg-canvas py-3"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={item.href === "/contact" ? false : undefined}
            className="focus-ring px-3 py-3 text-sm text-copy hover:text-accent"
          >
            {item.label}
          </Link>
        ))}
        <Link href="/resume" className="focus-ring px-3 py-3 text-sm text-copy hover:text-accent">
          Resume
        </Link>
        <Link href="/admin" className="focus-ring px-3 py-3 text-sm text-muted hover:text-accent">
          Admin
        </Link>
      </nav>
    </details>
  );
}
