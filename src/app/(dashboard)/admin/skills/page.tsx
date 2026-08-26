import { SkillForm } from "@/components/admin/skill-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }]
  });

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-sm uppercase text-cyan-300">Skills</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Skill taxonomy</h1>

      <div className="mt-8 space-y-4">
        <SkillForm />
        {skills.map((skill) => (
          <SkillForm key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
