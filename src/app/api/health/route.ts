import { prisma } from "@/lib/prisma";

const headers = { "Cache-Control": "no-store" };

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json(
      { status: "not_ready", database: "not_configured" },
      { status: 503, headers }
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: "ok", database: "connected" }, { headers });
  } catch {
    return Response.json(
      { status: "not_ready", database: "unavailable" },
      { status: 503, headers }
    );
  }
}