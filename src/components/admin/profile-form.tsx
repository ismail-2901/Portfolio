import { ImagePlus, Trash2, Upload } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deleteProfileImageAction, uploadProfileImageAction } from "@/lib/actions/media-actions";
import { updateProfileAction } from "@/lib/actions/profile-actions";
import type { PublicProfile } from "@/lib/queries";

function getInitials(name: string) {
  return name
    .replace(/\[[^\]]+\]/g, "YN")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfileForm({ profile }: { profile: PublicProfile }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-zinc-900/60 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border border-cyan-300/30 bg-zinc-950 text-xl font-semibold text-cyan-200">
            {profile.imageUrl ? (
              <img src={profile.imageUrl} alt={profile.name} className="size-full object-cover" />
            ) : (
              getInitials(profile.name)
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Profile image</p>
              <p className="mt-1 text-sm text-zinc-400">Upload a new portrait or paste a public image URL.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <form action={uploadProfileImageAction} encType="multipart/form-data" className="flex flex-1 items-center gap-3">
                <input type="file" name="file" accept="image/avif,image/jpeg,image/png,image/webp" className="hidden" id="profile-image-upload" required />
                <label
                  htmlFor="profile-image-upload"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm font-medium text-cyan-100"
                >
                  <ImagePlus aria-hidden="true" className="size-4" />
                  Upload
                </label>
                <SubmitButton className="shrink-0" pendingLabel="Uploading">Save upload</SubmitButton>
              </form>

              {profile.imageUrl ? (
                <form action={deleteProfileImageAction}>
                  <SubmitButton variant="danger" className="gap-2">
                    <Trash2 aria-hidden="true" className="size-4" />
                    Delete
                  </SubmitButton>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>

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

        <Field>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={profile.imageUrl ?? ""} placeholder="https://images.example.com/profile.jpg" />
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
    </div>
  );
}
