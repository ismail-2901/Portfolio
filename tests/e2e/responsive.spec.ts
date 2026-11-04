import { mkdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
  { name: "mobile-landscape", width: 844, height: 390 },
  { name: "tablet-landscape", width: 1024, height: 768 }
];

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page, context: string) {
  const { documentWidth, viewportWidth } = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth
  }));

  expect(documentWidth, `${context}: document should not extend past the viewport`).toBeLessThanOrEqual(viewportWidth);
}

test("homepage and engineering object fit the requested viewport matrix", async ({ page }) => {
  mkdirSync("test-results/responsive", { recursive: true });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /ismail/i })).toBeVisible();

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await expectNoHorizontalOverflow(page, `home at ${viewport.name}`);
    await expect(page.locator("header")).toBeVisible();

    if (viewport.width < 768) {
      await expect(page.locator('[aria-controls="mobile-navigation"]')).toBeVisible();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    }

    const object = await page.locator(".engineering-object-stage").boundingBox();
    expect(object, `engineering object should render at ${viewport.name}`).not.toBeNull();
    expect(object!.x).toBeGreaterThanOrEqual(0);
    expect(object!.x + object!.width).toBeLessThanOrEqual(viewport.width);

    const footer = await page.locator("footer").boundingBox();
    expect(footer, `footer should render at ${viewport.name}`).not.toBeNull();
    expect(footer!.x).toBeGreaterThanOrEqual(0);
    expect(footer!.x + footer!.width).toBeLessThanOrEqual(viewport.width);

    if (["375", "768", "1440"].includes(viewport.name)) {
      await page.evaluate(() => window.scrollTo(0, 800));
      const stickyHeader = await page.locator("header").boundingBox();
      expect(stickyHeader?.y).toBe(0);
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    await page.screenshot({ path: `test-results/responsive/home-${viewport.name}.png` });
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/responsive/footer-375.png" });
});

test("public content routes avoid horizontal overflow on phone, tablet, and desktop", async ({ page }) => {
  test.slow();
  const routes = [
    "/about",
    "/projects",
    "/projects/phase-3-navigation-check",
    "/blog",
    "/blog/phase-3-navigation-check",
    "/contact",
    "/resume",
    "/privacy"
  ];

  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await expectNoHorizontalOverflow(page, `${route} at ${viewport.name}`);
    }
  }
});

test("contact fields remain within the viewport throughout the requested matrix", async ({ page }) => {
  mkdirSync("test-results/responsive", { recursive: true });
  await page.goto("/contact");
  await expect(page.getByLabel("Name")).toBeVisible();

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await expectNoHorizontalOverflow(page, `contact at ${viewport.name}`);

    const form = await page.locator("form").boundingBox();
    expect(form, `contact form should render at ${viewport.name}`).not.toBeNull();
    expect(form!.x).toBeGreaterThanOrEqual(0);
    expect(form!.x + form!.width).toBeLessThanOrEqual(viewport.width);

    if (["390", "768", "1024", "1440"].includes(viewport.name)) {
      await page.screenshot({ path: `test-results/responsive/contact-${viewport.name}.png` });
    }
  }
});

test("mobile navigation remains in the viewport in short portrait and landscape", async ({ page }) => {
  mkdirSync("test-results/responsive", { recursive: true });
  await page.goto("/");

  for (const viewport of [
    { name: "short-portrait", width: 375, height: 568 },
    { name: "short-landscape", width: 667, height: 375 }
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const toggle = page.locator('[aria-controls="mobile-navigation"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const panel = await page.getByRole("navigation", { name: "Mobile navigation" }).boundingBox();
    expect(panel, `${viewport.name} navigation panel should render`).not.toBeNull();
    expect(panel!.x).toBeGreaterThanOrEqual(0);
    expect(panel!.x + panel!.width).toBeLessThanOrEqual(viewport.width);
    expect(panel!.y + panel!.height).toBeLessThanOrEqual(viewport.height);

    await page.screenshot({ path: `test-results/responsive/navigation-${viewport.name}.png` });

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  }
});

test("admin login controls fit narrow viewports and keep usable targets", async ({ page }) => {
  mkdirSync("test-results/responsive", { recursive: true });
  await page.goto("/admin/login");
  await expect(page.getByRole("heading", { name: "Secure dashboard login" })).toBeVisible();

  for (const viewport of [...viewports, { name: "200-percent-reflow-width", width: 640, height: 800 }]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await expectNoHorizontalOverflow(page, `admin login at ${viewport.name}`);

    const form = await page.locator("form").boundingBox();
    expect(form, `admin login form should render at ${viewport.name}`).not.toBeNull();
    expect(form!.width).toBeLessThanOrEqual(viewport.width);

    if (["375", "1024", "1920"].includes(viewport.name)) {
      await page.screenshot({ path: `test-results/responsive/admin-login-${viewport.name}.png` });
    }
  }

  const passwordToggle = await page.getByRole("button", { name: "Show password" }).boundingBox();
  expect(passwordToggle?.width).toBeGreaterThanOrEqual(44);
  expect(passwordToggle?.height).toBeGreaterThanOrEqual(44);
});

test("reduced-motion preference limits interface animation duration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const animationDuration = await page.locator(".motion-reveal").first().evaluate((element) => {
    const duration = getComputedStyle(element).animationDuration.split(",")[0].trim();
    const value = Number.parseFloat(duration);
    return duration.endsWith("ms") ? value / 1000 : value;
  });

  expect(animationDuration).toBeLessThanOrEqual(0.001);
});

test("admin dashboard and management pages fit viewports without horizontal overflow", async ({ page }) => {
  test.slow();
  mkdirSync("test-results/responsive", { recursive: true });

  await page.goto("/admin/login");
  await page.getByLabel("Email").fill("ismailsajinabusaleh@gmail.com");
  await page.locator("input#password").fill("pepede23456@");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("/admin");

  const adminRoutes = [
    "/admin",
    "/admin/projects",
    "/admin/projects/new",
    "/admin/articles",
    "/admin/articles/new",
    "/admin/skills",
    "/admin/media",
    "/admin/messages",
    "/admin/profile"
  ];

  for (const route of adminRoutes) {
    await page.goto(route);
    await expect(page.getByRole("main")).toBeVisible();
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await expectNoHorizontalOverflow(page, `admin route ${route} at ${vp.name}`);
    }
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/admin");
  await page.screenshot({ path: "test-results/responsive/admin-dashboard-375.png" });
  await page.goto("/admin/skills");
  await page.screenshot({ path: "test-results/responsive/admin-skills-375.png" });
  await page.goto("/admin/profile");
  await page.screenshot({ path: "test-results/responsive/admin-profile-375.png" });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/admin");
  await page.screenshot({ path: "test-results/responsive/admin-dashboard-1440.png" });
});

