"use client";

import { useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

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

function compressProfileImage(file: File): Promise<File | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const maxDim = 1200;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(null);
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), { type: "image/webp" }));
        },
        "image/webp",
        0.85
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };
    img.src = objectUrl;
  });
}

export function ProfileForm({ profile }: { profile: PublicProfile }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile.imageUrl);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);

    let processedFile = file;
    if (file.size > 1.5 * 1024 * 1024) {
      try {
        const compressed = await compressProfileImage(file);
        if (compressed) {
          processedFile = compressed;
          const dt = new DataTransfer();
          dt.items.add(compressed);
          e.target.files = dt.files;
        }
      } catch {
        // Fallback to original file
      }
    }

    if (processedFile.size > 4 * 1024 * 1024) {
      setFileError("Image must be smaller than 4 MB. Please choose a smaller photo.");
      e.target.value = "";
      return;
    }

    setPreviewUrl(URL.createObjectURL(processedFile));
    setFileName(processedFile.name);
  };

  return (
    <div className="space-y-6">
      <div className="admin-profile-card rounded-panel border border-rule bg-surface-raised p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="admin-avatar relative flex size-24 items-center justify-center overflow-hidden rounded-full border border-accent/30 bg-surface text-subheading font-semibold text-accent">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={profile.name}
                className="size-full object-cover"
              />
            ) : (
              getInitials(profile.name)
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="font-mono text-metadata uppercase tracking-[0.2em] text-muted">Profile image</p>
              <p className="mt-1 text-body-small text-muted">Upload a new portrait or paste a public image URL.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <form action={uploadProfileImageAction} className="flex flex-1 items-center gap-3">
                <input
                  type="file"
                  name="file"
                  accept="image/avif,image/jpeg,image/png,image/webp"
                  className="peer sr-only"
                  id="profile-image-upload"
                  required
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profile-image-upload"
                  className="inline-flex min-h-11 max-w-[220px] cursor-pointer items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-label font-medium text-accent transition duration-interactive hover:border-accent/60 hover:bg-accent/15 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
                >
                  <ImagePlus aria-hidden="true" className="size-4 shrink-0" />
                  <span className="truncate">{fileName ?? "Choose file"}</span>
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

            {fileError ? (
              <p className="text-body-small text-danger" role="alert">
                {fileError}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <form action={updateProfileAction} className="space-y-6 rounded-panel border border-rule bg-surface-raised p-6">
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

        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="availabilityStatus">Availability Status</Label>
            <Input id="availabilityStatus" name="availabilityStatus" defaultValue={profile.availabilityStatus ?? ""} placeholder="e.g. Open to internships & full-stack roles" />
          </Field>
          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="availableForHire"
              name="availableForHire"
              defaultChecked={profile.availableForHire}
              className="size-5 rounded border-rule text-accent focus:ring-accent"
            />
            <Label htmlFor="availableForHire" className="cursor-pointer font-medium">
              Available for Hire / Open to Work
            </Label>
          </div>
        </div>

        <Field>
          <Label htmlFor="shortBio">Short Bio</Label>
          <Textarea id="shortBio" name="shortBio" defaultValue={profile.shortBio} required />
        </Field>

        <Field>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={profile.imageUrl ?? ""} placeholder="https://images.example.com/profile.jpg" />
        </Field>

        <div className="grid gap-5 md:grid-cols-4">
          <Field>
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input id="githubUrl" name="githubUrl" defaultValue={profile.githubUrl} required />
          </Field>
          <Field>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input id="linkedinUrl" name="linkedinUrl" defaultValue={profile.linkedinUrl} required />
          </Field>
          <Field>
            <Label htmlFor="twitterUrl">Twitter / X URL</Label>
            <Input id="twitterUrl" name="twitterUrl" defaultValue={profile.twitterUrl ?? ""} placeholder="https://x.com/username" />
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
