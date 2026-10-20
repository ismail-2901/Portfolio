import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import { getProfile } from "@/lib/queries";
import { getSiteUrl } from "@/lib/utils";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#0B0D0E",
  colorScheme: "dark"
};

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} | ${profile.role}`,
      template: `%s | ${profile.name}`
    },
    description: profile.shortBio,
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: `${profile.name} | ${profile.role}`,
      description: profile.shortBio,
      url: siteUrl,
      siteName: `${profile.name} Portfolio`,
      type: "website",
      images: profile.imageUrl ? [{ url: profile.imageUrl, alt: profile.name }] : undefined
    },
    twitter: {
      card: profile.imageUrl ? "summary_large_image" : "summary",
      title: `${profile.name} | ${profile.role}`,
      description: profile.shortBio,
      images: profile.imageUrl ? [profile.imageUrl] : undefined
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
