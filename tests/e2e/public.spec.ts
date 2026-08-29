import { expect, test } from "@playwright/test";

test("renders the public home page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /secure, scalable, and beautiful/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /view work/i })).toBeVisible();
});

test("renders the contact form", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByRole("heading", { name: /resilient and sharp/i })).toBeVisible();
  await expect(page.locator('input[name="email"]').first()).toBeVisible();
});
