import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SkipLink } from "@/components/site/skip-link";
import { getPublicProfile } from "@/lib/queries";
import { serializeStructuredData } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 300;

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profileResult = await getPublicProfile();
  const personJsonLd = profileResult.available
    ? {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profileResult.data.name,
      jobTitle: profileResult.data.role,
      email: profileResult.data.email,
      url: getSiteUrl(),
      sameAs: [profileResult.data.githubUrl, profileResult.data.linkedinUrl]
    }
    : null;

  return (
    <>
      <SkipLink />
      <SiteHeader />
      {children}
      <SiteFooter />
      {personJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(personJsonLd) }}
        />
      ) : null}
    </>
  );
}
