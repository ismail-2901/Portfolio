import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";

const securityHeaders = {
  "X-DNS-Prefetch-Control": "on",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()"
};

function getIpKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const hasSessionCookie = request.cookies
      .getAll()
      .some((cookie) => cookie.name.endsWith("authjs.session-token"));

    if (!hasSessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/admin/login" || pathname === "/contact" || pathname.startsWith("/admin/media")) {
    const result = await rateLimit({
      key: `${pathname}:${getIpKey(request)}`,
      limit: pathname.includes("login") ? 10 : 30,
      windowSeconds: 60
    });

    if (!result.success) {
      return new NextResponse("Too many requests.", { status: 429 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
