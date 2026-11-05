import { SkillsTable } from "@/components/admin/skills-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }]
  });

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-metadata uppercase text-accent">Skills</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Skill taxonomy</h1>

      <div className="mt-8">
        <SkillsTable skills={skills} />
      </div>
    </div>
  );
}
