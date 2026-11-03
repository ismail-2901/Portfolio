import { Prisma } from "@prisma/client";

const unavailableDatabaseCodes = new Set([
  "P1000",
  "P1001",
  "P1002",
  "P1003",
  "P1008",
  "P1010",
  "P1011",
  "P1013",
  "P1017",
  "P2024"
]);

export type PublicDataResult<T> =
  | { available: true; data: T }
  | { available: false; data: null };

export function isDatabaseUnavailableError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return unavailableDatabaseCodes.has(error.errorCode ?? "");
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return unavailableDatabaseCodes.has(error.code);
  }

  return false;
}

export async function withPublicData<T>(query: () => Promise<T>): Promise<PublicDataResult<T>> {
  try {
    return { available: true, data: await query() };
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    return { available: false, data: null };
  }
}
