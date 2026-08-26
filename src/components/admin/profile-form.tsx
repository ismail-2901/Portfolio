import { SubmitButton } from "@/components/admin/submit-button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProfileAction } from "@/lib/actions/profile-actions";
import type { PublicProfile } from "@/lib/queries";

export function ProfileForm({ profile }: { profile: PublicProfile }) {
  return (
    <form action={updateProfileAction} className="space-y-6 rounded-lg border border-white/10 bg-zinc-900/60 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={profile.name} required />
        </Field>
        <Field>
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" defaultValue={profile.role} required />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={profile.location} required />
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={profile.email} required />
        </Field>
      </div>

      <Field>
        <Label htmlFor="shortBio">Short Bio</Label>
        <Textarea id="shortBio" name="shortBio" defaultValue={profile.shortBio} required />
      </Field>

      <div className="grid gap-5 md:grid-cols-3">
        <Field>
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input id="githubUrl" name="githubUrl" defaultValue={profile.githubUrl} required />
        </Field>
        <Field>
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input id="linkedinUrl" name="linkedinUrl" defaultValue={profile.linkedinUrl} required />
        </Field>
        <Field>
          <Label htmlFor="resumeUrl">Resume URL or Path</Label>
          <Input id="resumeUrl" name="resumeUrl" defaultValue={profile.resumeUrl} required />
        </Field>
      </div>

      <SubmitButton>Save profile</SubmitButton>
    </form>
  );
}
