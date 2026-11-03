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

test("moves skip-link focus to the main landmark", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("closes the mobile menu after navigating to a route", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the details menu is only shown on mobile");

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menuToggle = page.locator('[aria-controls="mobile-navigation"]');

  await menuToggle.click();
  await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('[aria-controls="mobile-navigation"]')).toHaveAttribute("aria-expanded", "false");

  await page.locator('[aria-controls="mobile-navigation"]').click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
});

test("marks project and blog sections current on nested routes", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop navigation is only shown on desktop");

  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });

  await page.goto("/projects/phase-3-navigation-check");
  await expect(primaryNavigation.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");

  await page.goto("/blog/phase-3-navigation-check");
  await expect(primaryNavigation.getByRole("link", { name: "Blog" })).toHaveAttribute("aria-current", "page");
});

test("closes the mobile navigation on Escape and returns focus to its toggle", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation is only shown on mobile");

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menuToggle = page.locator('[aria-controls="mobile-navigation"]');

  await menuToggle.focus();
  await page.keyboard.press("Enter");
  await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Home" })).toBeFocused();
  await page.keyboard.press("Escape");

  await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
  await expect(menuToggle).toBeFocused();
});

test("keeps the mobile navigation panel within the viewport", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation is only shown on mobile");

  await page.setViewportSize({ width: 375, height: 568 });
  await page.goto("/");
  await page.locator('[aria-controls="mobile-navigation"]').click();

  const panel = await page.getByRole("navigation", { name: "Mobile navigation" }).boundingBox();
  expect(panel).not.toBeNull();
  expect(panel!.x).toBeGreaterThanOrEqual(0);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(375);
  expect(panel!.y + panel!.height).toBeLessThanOrEqual(568);
});

test("focuses a linked error summary and retains contact values after validation", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("A");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Message").fill("Short message");
  await page.getByRole("button", { name: "Send message" }).click();

  const errorSummary = page.locator("#contact-error-summary");
  await expect(errorSummary).toBeVisible();
  await expect(errorSummary).toBeFocused();
  await expect(errorSummary.getByRole("link", { name: /name/i })).toHaveAttribute("href", "#name");
  await expect(errorSummary.getByRole("link", { name: /message/i })).toHaveAttribute("href", "#message");
  await expect(page.getByLabel("Name")).toHaveValue("A");
  await expect(page.locator("#message")).toHaveValue("Short message");
  await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#message")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Name")).toHaveAttribute("aria-describedby", "name-error");
  await expect(page.locator("#message")).toHaveAttribute("aria-describedby", "message-error");
});
