import { expect, test } from "@playwright/test";

test("renders the public home page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /complex work feel clear/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /explore selected work/i })).toBeVisible();
});

test("renders the contact form", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByRole("heading", { name: /good engineering starts with a good problem/i })).toBeVisible();
  await expect(page.locator('input[name="email"]').first()).toBeVisible();
});

test("closes the mobile menu after navigating to a route", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the details menu is only shown on mobile");

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.locator("details.mobile-navigation");

  await menu.locator("summary").click();
  await expect(menu).toHaveAttribute("open", "");
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(menu).not.toHaveAttribute("open", "");
});
