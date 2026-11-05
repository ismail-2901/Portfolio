"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createSkillAction, deleteSkillAction, updateSkillAction } from "@/lib/actions/skill-actions";

export type SkillRow = {
  id: string;
  name: string;
  category: string;
  level: "WORKING" | "ADVANCED" | "EXPERT";
  order: number;
  featured: boolean;
};

export function SkillsTable({ skills }: { skills: SkillRow[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = Array.from(new Set(skills.map((s) => s.category))).sort();

  const filteredSkills = skills.filter((s) => {
    if (categoryFilter === "all") return true;
    return s.category === categoryFilter;
  });

  return (
    <div className="space-y-6">
      {/* Controls & Add Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="category-filter" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Category:
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-rule bg-surface px-3 py-1.5 text-xs font-medium text-copy focus:border-accent focus:outline-none"
          >
            <option value="all">All ({skills.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({skills.filter((s) => s.category === cat).length})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-canvas hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          {showAddForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showAddForm ? "Cancel" : "Add New Skill"}
        </button>
      </div>

      {/* New Skill Card (collapsible) */}
      {showAddForm && (
        <form
          action={createSkillAction}
          className="rounded-2xl border border-rule bg-surface-raised p-5 shadow-sm space-y-4"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-copy">Add New Skill</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1">Name</label>
              <Input name="name" placeholder="e.g. Docker" required className="h-9 text-xs" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1">Category</label>
              <Input name="category" placeholder="e.g. DevOps" required className="h-9 text-xs" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1">Level</label>
              <Select name="level" defaultValue="ADVANCED" className="h-9 text-xs">
                <option value="WORKING">Working</option>
                <option value="ADVANCED">Advanced</option>
                <option value="EXPERT">Expert</option>
              </Select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1">Order</label>
              <Input name="order" type="number" min="0" defaultValue="0" required className="h-9 text-xs" />
            </div>
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <label className="flex items-center gap-2 text-xs font-medium text-copy cursor-pointer">
                <input name="featured" type="checkbox" className="size-4 rounded accent-accent" />
                Featured
              </label>
              <SubmitButton className="h-9 px-4 text-xs font-bold uppercase tracking-wider">
                Create
              </SubmitButton>
            </div>
          </div>
        </form>
      )}

      {/* SaaS Data Table */}
      <div className="rounded-2xl border border-rule bg-surface-raised overflow-hidden shadow-xs">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[1.5fr_1.2fr_130px_80px_90px_auto] items-center gap-3 px-4 py-3 bg-surface/70 border-b border-rule text-[11px] font-bold uppercase tracking-wider text-muted select-none">
          <span>Skill Name</span>
          <span>Category</span>
          <span>Proficiency</span>
          <span>Order</span>
          <span>Featured</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-rule/60">
          {filteredSkills.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted">No skills in this category.</div>
          ) : (
            filteredSkills.map((skill) => (
              <form
                key={skill.id}
                action={updateSkillAction.bind(null, skill.id)}
                className="grid grid-cols-1 md:grid-cols-[1.5fr_1.2fr_130px_80px_90px_auto] items-center gap-3 p-3.5 hover:bg-surface/50 transition-colors"
              >
                <div>
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-muted block mb-0.5">Name</span>
                  <Input
                    name="name"
                    defaultValue={skill.name}
                    required
                    className="h-8 text-xs font-semibold"
                  />
                </div>
                <div>
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-muted block mb-0.5">Category</span>
                  <Input
                    name="category"
                    defaultValue={skill.category}
                    required
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-muted block mb-0.5">Level</span>
                  <Select
                    name="level"
                    defaultValue={skill.level}
                    className="h-8 text-xs"
                  >
                    <option value="WORKING">Working</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </Select>
                </div>
                <div>
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-muted block mb-0.5">Order</span>
                  <Input
                    name="order"
                    type="number"
                    min="0"
                    defaultValue={skill.order}
                    required
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-muted">Featured:</span>
                  <label className="flex items-center gap-1.5 text-xs text-copy cursor-pointer">
                    <input
                      name="featured"
                      type="checkbox"
                      defaultChecked={skill.featured}
                      className="size-4 rounded accent-accent"
                    />
                    <span className="md:hidden">Featured</span>
                  </label>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <SubmitButton className="h-8 px-3 text-[11px] font-bold uppercase tracking-wider">
                    Save
                  </SubmitButton>
                  <button
                    type="submit"
                    formAction={deleteSkillAction.bind(null, skill.id)}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-danger/30 text-danger hover:bg-danger/10 transition-colors"
                    aria-label={`Delete ${skill.name}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </form>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
