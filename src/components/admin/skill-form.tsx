import { Trash2 } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createSkillAction, deleteSkillAction, updateSkillAction } from "@/lib/actions/skill-actions";

type SkillFormValue = {
  id: string;
  name: string;
  category: string;
  level: "WORKING" | "ADVANCED" | "EXPERT";
  order: number;
  featured: boolean;
};

export function SkillForm({ skill }: { skill?: SkillFormValue }) {
  const action = skill ? updateSkillAction.bind(null, skill.id) : createSkillAction;

  return (
    <form action={action} className="grid gap-4 rounded-lg border border-white/10 bg-zinc-900/60 p-5 md:grid-cols-[1fr_1fr_160px_180px_auto] md:items-end">
      <Field>
        <Label htmlFor={`name-${skill?.id ?? "new"}`}>Name</Label>
        <Input id={`name-${skill?.id ?? "new"}`} name="name" defaultValue={skill?.name} required />
      </Field>
      <Field>
        <Label htmlFor={`category-${skill?.id ?? "new"}`}>Category</Label>
        <Input id={`category-${skill?.id ?? "new"}`} name="category" defaultValue={skill?.category} required />
      </Field>
      <Field>
        <Label htmlFor={`order-${skill?.id ?? "new"}`}>Order</Label>
        <Input id={`order-${skill?.id ?? "new"}`} name="order" type="number" min="0" defaultValue={skill?.order ?? 0} required />
      </Field>
      <Field>
        <Label htmlFor={`level-${skill?.id ?? "new"}`}>Level</Label>
        <Select id={`level-${skill?.id ?? "new"}`} name="level" defaultValue={skill?.level ?? "ADVANCED"}>
          <option value="WORKING">Working</option>
          <option value="ADVANCED">Advanced</option>
          <option value="EXPERT">Expert</option>
        </Select>
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-zinc-200">
          <input name="featured" type="checkbox" defaultChecked={skill?.featured} className="size-4 accent-indigo-500" />
          Featured
        </label>
        <SubmitButton pendingLabel="Saving">{skill ? "Save" : "Create"}</SubmitButton>
        {skill ? (
          <button
            formAction={deleteSkillAction.bind(null, skill.id)}
            className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-red-400/30 text-red-200 transition hover:bg-red-500/10"
            aria-label={`Delete ${skill.name}`}
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
    </form>
  );
}
