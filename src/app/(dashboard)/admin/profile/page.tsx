import { ProfileForm } from "@/components/admin/profile-form";
import { getProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-sm uppercase text-cyan-300">Profile</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Identity settings</h1>
      <div className="mt-8">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
