"use client";

import { useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createExperienceAction, deleteExperienceAction, updateExperienceAction } from "@/lib/actions/experience-actions";

export type ExperienceRow = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  summary: string;
  startDate: Date | string;
  endDate: Date | string | null;
  current: boolean;
  order: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

function formatDateForInput(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

function formatDateDisplay(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function ExperienceTable({ experiences }: { experiences: ExperienceRow[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNewCurrent, setIsNewCurrent] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header bar with Add Button */}
      <div className="flex items-center justify-between">
        <p className="text-body-small text-muted">
          Manage career history, education milestones, and software engineering roles.
        </p>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-canvas hover:opacity-90 transition-opacity"
        >
          {showAddForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showAddForm ? "Cancel" : "Add Experience"}
        </button>
      </div>

      {/* Add New Experience Form */}
      {showAddForm && (
        <form
          action={createExperienceAction}
          className="rounded-panel border border-accent/40 bg-surface-raised p-6 space-y-5 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <h3 className="text-heading-compact font-semibold text-copy">Add New Experience</h3>
            <span className="text-xs text-muted">All changes will reflect on the live /experience page.</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field>
              <Label htmlFor="new-role">Role / Title</Label>
              <Input id="new-role" name="role" placeholder="e.g. Software Engineer / B.Sc. Student" required />
            </Field>
            <Field>
              <Label htmlFor="new-company">Company / Institution</Label>
              <Input id="new-company" name="company" placeholder="e.g. Daffodil International University" required />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Field>
              <Label htmlFor="new-location">Location</Label>
              <Input id="new-location" name="location" placeholder="e.g. Dhaka, Bangladesh" />
            </Field>
            <Field>
              <Label htmlFor="new-startDate">Start Date</Label>
              <Input id="new-startDate" name="startDate" type="date" required />
            </Field>
            <Field>
              <Label htmlFor="new-endDate">End Date</Label>
              <Input id="new-endDate" name="endDate" type="date" disabled={isNewCurrent} />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-3 items-center">
            <label className="flex h-11 cursor-pointer items-center gap-3 rounded-small border border-control-border bg-canvas/60 px-3 text-body-small text-copy transition hover:border-control-hover">
              <input
                name="current"
                type="checkbox"
                checked={isNewCurrent}
                onChange={(e) => setIsNewCurrent(e.target.checked)}
                className="focus-ring size-4 accent-accent-secondary"
              />
              Currently here (Present)
            </label>

            <Field>
              <Label htmlFor="new-order">Order</Label>
              <Input id="new-order" name="order" type="number" min="0" defaultValue={experiences.length + 1} required />
            </Field>

            <Field>
              <Label htmlFor="new-status">Status</Label>
              <Select id="new-status" name="status" defaultValue="PUBLISHED">
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </Select>
            </Field>
          </div>

          <Field>
            <Label htmlFor="new-summary">Summary / Description</Label>
            <Textarea
              id="new-summary"
              name="summary"
              placeholder="Describe your responsibilities, technical impact, tools used, or coursework."
              required
              className="min-h-24"
            />
          </Field>

          <div className="flex items-center gap-3 pt-2">
            <SubmitButton pendingLabel="Creating">
              <Check aria-hidden="true" className="size-4" />
              Save Experience
            </SubmitButton>
            <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="rounded-panel border border-rule bg-surface-raised p-8 text-center text-muted">
            No experience entries found. Click &quot;Add Experience&quot; above to create one.
          </div>
        ) : (
          experiences.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-panel border border-rule bg-surface-raised p-6 transition-all hover:border-accent/40"
              >
                {!isEditing ? (
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="size-2.5 rounded-full bg-emerald-500" />
                        <h3 className="text-heading-small font-bold uppercase tracking-tight text-copy">
                          {item.role}
                        </h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface border border-rule text-copy">
                          {item.company}
                        </span>
                        {item.location && (
                          <span className="text-xs text-muted">· {item.location}</span>
                        )}
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface border border-rule text-muted">
                          {item.status}
                        </span>
                      </div>

                      <p className="text-xs font-mono text-muted">
                        {formatDateDisplay(item.startDate)} — {item.current ? "Present" : formatDateDisplay(item.endDate)}
                        <span className="ml-3">Order: {item.order}</span>
                      </p>

                      <p className="text-body-small text-muted leading-relaxed whitespace-pre-line pt-1">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingId(item.id)}
                        className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-button border border-rule bg-surface px-3 py-1.5 text-xs font-semibold text-copy transition hover:border-accent hover:text-accent"
                      >
                        <Pencil aria-hidden="true" className="size-3.5" />
                        Edit
                      </button>
                      <form action={deleteExperienceAction.bind(null, item.id)}>
                        <SubmitButton variant="danger" pendingLabel="Deleting" className="px-3 py-1.5 text-xs">
                          <Trash2 aria-hidden="true" className="size-3.5" />
                          Delete
                        </SubmitButton>
                      </form>
                    </div>
                  </div>
                ) : (
                  <EditExperienceForm
                    item={item}
                    onCancel={() => setEditingId(null)}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function EditExperienceForm({
  item,
  onCancel
}: {
  item: ExperienceRow;
  onCancel: () => void;
}) {
  const [isCurrent, setIsCurrent] = useState(item.current);

  return (
    <form action={updateExperienceAction.bind(null, item.id)} className="space-y-5">
      <div className="flex items-center justify-between border-b border-rule pb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Edit Experience</h4>
        <span className="text-xs text-muted">ID: {item.id}</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field>
          <Label htmlFor={`role-${item.id}`}>Role / Title</Label>
          <Input id={`role-${item.id}`} name="role" defaultValue={item.role} required />
        </Field>
        <Field>
          <Label htmlFor={`company-${item.id}`}>Company / Institution</Label>
          <Input id={`company-${item.id}`} name="company" defaultValue={item.company} required />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Field>
          <Label htmlFor={`location-${item.id}`}>Location</Label>
          <Input id={`location-${item.id}`} name="location" defaultValue={item.location ?? ""} />
        </Field>
        <Field>
          <Label htmlFor={`startDate-${item.id}`}>Start Date</Label>
          <Input
            id={`startDate-${item.id}`}
            name="startDate"
            type="date"
            defaultValue={formatDateForInput(item.startDate)}
            required
          />
        </Field>
        <Field>
          <Label htmlFor={`endDate-${item.id}`}>End Date</Label>
          <Input
            id={`endDate-${item.id}`}
            name="endDate"
            type="date"
            defaultValue={formatDateForInput(item.endDate)}
            disabled={isCurrent}
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-3 items-center">
        <label className="flex h-11 cursor-pointer items-center gap-3 rounded-small border border-control-border bg-canvas/60 px-3 text-body-small text-copy transition hover:border-control-hover">
          <input
            name="current"
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
            className="focus-ring size-4 accent-accent-secondary"
          />
          Currently here (Present)
        </label>

        <Field>
          <Label htmlFor={`order-${item.id}`}>Order</Label>
          <Input id={`order-${item.id}`} name="order" type="number" min="0" defaultValue={item.order} required />
        </Field>

        <Field>
          <Label htmlFor={`status-${item.id}`}>Status</Label>
          <Select id={`status-${item.id}`} name="status" defaultValue={item.status}>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </Select>
        </Field>
      </div>

      <Field>
        <Label htmlFor={`summary-${item.id}`}>Summary / Description</Label>
        <Textarea
          id={`summary-${item.id}`}
          name="summary"
          defaultValue={item.summary}
          required
          className="min-h-24"
        />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton pendingLabel="Saving">
          <Check aria-hidden="true" className="size-4" />
          Save Changes
        </SubmitButton>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
