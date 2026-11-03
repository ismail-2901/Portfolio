import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import { getPublicProfile } from "@/lib/queries";
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
  const profileResult = await getPublicProfile();
  const profile = profileResult.available ? profileResult.data : null;
  const siteUrl = getSiteUrl();
  const ownerName = profile?.name ?? "Portfolio";
  const siteName = profile ? `${profile.name} Portfolio` : "Portfolio";
  const title = profile ? `${profile.name} | ${profile.role}` : "Portfolio";
  const description = profile?.shortBio ?? "Portfolio website";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${ownerName}`
    },
    description,
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      type: "website",
      images: profile?.imageUrl ? [{ url: profile.imageUrl, alt: profile.name }] : undefined
    },
    twitter: {
      card: profile?.imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: profile?.imageUrl ? [profile.imageUrl] : undefined
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
