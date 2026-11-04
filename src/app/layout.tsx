import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { getPublicProfile } from "@/lib/queries";
import { getSiteUrl } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export const viewport: Viewport = {
  themeColor: "#f7f7f8",
  colorScheme: "light dark"
};

export async function generateMetadata(): Promise<Metadata> {
  const profileResult = await getPublicProfile();
  const profile = profileResult.available ? profileResult.data : null;
  const siteUrl = getSiteUrl();
  const ownerName = profile?.name ?? "Md Ismail Hossain";
  const siteName = profile ? `${profile.name} Portfolio` : "Md Ismail Hossain Portfolio";
  const title = profile ? `${profile.name} | ${profile.role}` : "Md Ismail Hossain | Software Engineer";
  const description = profile?.shortBio ?? "Software Engineering student and full-stack developer portfolio.";

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-canvas text-copy font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        {children}
      </body>
    </html>
  );
}
