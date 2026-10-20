import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How portfolio contact details are handled and retained.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy", description: "How portfolio contact details are handled and retained.", url: "/privacy" },
  twitter: { card: "summary", title: "Privacy Policy", description: "How portfolio contact details are handled and retained." }
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <section className="container-shell max-w-3xl pb-24 pt-16 md:pb-32 md:pt-24">
        <p className="eyebrow">Privacy / policy</p>
        <h1 className="mt-5 text-5xl font-medium text-copy md:text-6xl">Privacy Policy</h1>
        <div className="mt-8 space-y-6 leading-8 text-muted">
          <p>
            Contact form submissions are stored to respond to inquiries. The form records your name, email,
            optional company, message, user agent, and a hashed IP fingerprint for abuse prevention.
          </p>
          <p>
            Secrets are never exposed client-side. Email delivery uses server-side credentials, and archived
            contact messages remain visible only to authenticated administrators.
          </p>
          <p>
            We use this information only to respond to your inquiry, protect the service from abuse, and keep
            an internal record of communications. We do not sell contact details or use them for advertising.
            Messages are retained only as long as they are needed for those purposes or required by law.
          </p>
          <p>
            To ask about your information or request deletion, use the contact details shown on this site.
            We may need to verify the request before making changes.
          </p>
        </div>
      </section>
    </main>
  );
}
