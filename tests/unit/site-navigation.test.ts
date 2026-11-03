import { describe, expect, it } from "vitest";

import { isActiveSiteRoute } from "@/components/site/site-navigation";

describe("isActiveSiteRoute", () => {
  it("matches the current route and its nested pages", () => {
    expect(isActiveSiteRoute("/projects", "/projects")).toBe(true);
    expect(isActiveSiteRoute("/projects/security-platform", "/projects")).toBe(true);
    expect(isActiveSiteRoute("/blog/engineering-notes", "/blog")).toBe(true);
  });

  it("does not match a route that only shares the same prefix", () => {
    expect(isActiveSiteRoute("/blogroll", "/blog")).toBe(false);
    expect(isActiveSiteRoute("/projects-archive", "/projects")).toBe(false);
  });

  it("matches the home route exactly and normalizes trailing slashes", () => {
    expect(isActiveSiteRoute("/", "/")).toBe(true);
    expect(isActiveSiteRoute("/projects/", "/projects")).toBe(true);
    expect(isActiveSiteRoute("/projects/one/", "/projects")).toBe(true);
    expect(isActiveSiteRoute("/about", "/")).toBe(false);
  });
});
