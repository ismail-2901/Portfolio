import type { Metadata, Viewport } from "next";

import { getProfile } from "@/lib/queries";
import { getSiteUrl } from "@/lib/utils";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#09090B",
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
      type: "website"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
