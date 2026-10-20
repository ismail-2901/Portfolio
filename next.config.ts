import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb"
    }
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    const headers = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "object-src 'none'",
          "img-src 'self' data: blob: https://images.unsplash.com https://*.public.blob.vercel-storage.com",
          "font-src 'self' data:",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "connect-src 'self'"
        ].join("; ")
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff"
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin"
      },
      {
        key: "X-Frame-Options",
        value: "DENY"
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
      }
    ];

    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=31536000"
    });

    return [{ source: "/:path*", headers }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com"
      }
    ]
  },
  poweredByHeader: false,
  reactStrictMode: true
};

export default nextConfig;
