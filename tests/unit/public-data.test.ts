import { describe, expect, it } from "vitest";
import { Prisma } from "@prisma/client";

import { withPublicData } from "@/lib/public-data";

describe("withPublicData", () => {
  it("returns successful query data unchanged", async () => {
    await expect(withPublicData(async () => ["project"])).resolves.toEqual({
      available: true,
      data: ["project"]
    });
  });

  it("returns an unavailable state for a Prisma connection failure", async () => {
    const connectionError = new Prisma.PrismaClientInitializationError(
      "Database endpoint unreachable",
      "test",
      "P1001"
    );

    await expect(withPublicData(async () => { throw connectionError; })).resolves.toEqual({
      available: false,
      data: null
    });
  });

  it("rethrows application errors instead of hiding them", async () => {
    const applicationError = new Error("Unexpected application failure");

    await expect(withPublicData(async () => { throw applicationError; })).rejects.toBe(applicationError);
  });
});
