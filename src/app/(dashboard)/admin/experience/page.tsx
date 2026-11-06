import { ExperienceTable } from "@/components/admin/experience-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }]
  });

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-metadata uppercase text-accent">Career & Education</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Experience Management</h1>

      <div className="mt-8">
        <ExperienceTable experiences={experiences} />
      </div>
    </div>
  );
}

