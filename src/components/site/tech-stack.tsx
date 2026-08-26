import { Badge } from "@/components/ui/badge";
import type { PublicSkill } from "@/lib/queries";

export function TechStack({ skills }: { skills: PublicSkill[] }) {
  const grouped = skills.reduce<Record<string, PublicSkill[]>>((acc, skill) => {
    acc[skill.category] ??= [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="rounded-lg border border-white/10 bg-zinc-900/60 p-5">
          <p className="font-mono text-xs uppercase text-cyan-300">{category}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {items.map((skill) => (
              <Badge key={skill.id} className="border-indigo-300/20 text-zinc-200">
                {skill.name}
              </Badge>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
