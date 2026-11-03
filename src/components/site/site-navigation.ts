export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

export function isActiveSiteRoute(pathname: string | null, href: string) {
  if (!pathname) {
    return false;
  }

  const currentPath = normalizePathname(pathname);
  const targetPath = normalizePathname(href);

  if (currentPath === targetPath) {
    return true;
  }

  return targetPath !== "/" && currentPath.startsWith(`${targetPath}/`);
}
