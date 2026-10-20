import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getProfile } from "@/lib/queries";
import { serializeStructuredData } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 300;

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profile = await getProfile();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    url: getSiteUrl(),
    sameAs: [profile.githubUrl, profile.linkedinUrl]
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      {children}
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(personJsonLd) }}
      />
    </>
  );
}
