"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { isActiveSiteRoute } from "@/components/site/site-navigation";

type SiteNavigationLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function SiteNavigationLink({ href, ...props }: SiteNavigationLinkProps) {
  const pathname = usePathname();
  const isCurrent = isActiveSiteRoute(pathname, href);

  return <Link href={href} aria-current={isCurrent ? "page" : undefined} {...props} />;
}
