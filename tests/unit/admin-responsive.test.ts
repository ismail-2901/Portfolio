import { createElement } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/actions/skill-actions", () => ({
  createSkillAction: async () => undefined,
  deleteSkillAction: async () => undefined,
  updateSkillAction: async () => undefined
}));

vi.mock("@/components/admin/submit-button", () => ({
  SubmitButton: () => null
}));

vi.mock("next/link", async () => {
  const React = await import("react");
  return {
    default: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
      React.createElement("a", { href, ...props })
  };
});

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/skills",
  useSearchParams: () => new URLSearchParams()
}));

vi.mock("@/components/admin/logout-button", () => ({
  LogoutButton: () => null
}));

import { SkillForm } from "@/components/admin/skill-form";
import { AdminShell } from "@/components/admin/admin-shell";

describe("admin responsive controls", () => {
  it("keeps skill fields in two columns until the admin content can support the wide grid", () => {
    const { container } = render(createElement(SkillForm));

    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    expect(form).toHaveClass("sm:grid-cols-2");
    expect(form).toHaveClass("xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_160px_180px_auto]");
    expect(form).not.toHaveClass("md:grid-cols-[1fr_1fr_160px_180px_auto]");
    expect(container.querySelector('label:has(input[type="checkbox"])')).toHaveClass("min-h-11");
  });

  it("gives desktop and mobile admin navigation links full touch target height", () => {
    const { container } = render(createElement(AdminShell, null, null));
    const links = container.querySelectorAll('nav[aria-label="Admin navigation"] a');
    const sidebar = container.querySelector("aside");

    expect(links).toHaveLength(14);
    expect(sidebar).toHaveClass("overflow-y-auto");
    expect(container.querySelector('header a[href="/"]')).toHaveClass("min-h-11");
    for (const link of links) {
      expect(link).toHaveClass("min-h-11");
    }
  });
});
