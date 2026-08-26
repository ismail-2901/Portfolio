import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the portfolio contact form and analytics posture."
};

export default function PrivacyPage() {
  return (
    <main className="pt-32">
      <section className="container-shell max-w-3xl py-16">
        <p className="font-mono text-sm uppercase text-cyan-300">Privacy</p>
        <h1 className="mt-3 text-5xl font-semibold text-zinc-50">Privacy Policy</h1>
        <div className="mt-8 space-y-6 leading-8 text-zinc-300">
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
