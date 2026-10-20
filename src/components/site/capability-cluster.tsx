import type { PublicSkill } from "@/lib/queries";

const capabilityGroups = [
  { title: "Frontend", matches: ["frontend", "interface", "ui"] },
  { title: "Backend", matches: ["backend", "api", "server", "security"] },
  { title: "Databases", matches: ["database", "data"] },
  { title: "AI / ML", matches: ["ai", "ml", "machine learning", "model"] },
  { title: "DevOps / Cloud", matches: ["devops", "cloud", "infra", "operations"] }
];

export function CapabilityCluster({ skills }: { skills: PublicSkill[] }) {
  const remaining = new Set(skills);
  const groups = capabilityGroups.flatMap(({ title, matches }) => {
    const items = skills.filter((skill) => {
      if (!remaining.has(skill)) {
        return false;
      }

      const category = skill.category.toLowerCase();
      const name = skill.name.toLowerCase();
      const matchesGroup = matches.some((match) => category.includes(match) || name.includes(match));

      if (matchesGroup) {
        remaining.delete(skill);
      }

      return matchesGroup;
    });

    return items.length ? [{ title, items }] : [];
  });

  if (remaining.size) {
    groups.push({ title: "Tools", items: skills.filter((skill) => remaining.has(skill)) });
  }

  return (
    <div className="capability-list">
      {groups.map(({ title, items }) => (
        <section key={title} className="capability-row">
          <h3 className="font-mono text-xs text-accent">{title}</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-copy">
            {items.map((skill) => <li key={skill.id}>{skill.name}</li>)}
          </ul>
        </section>
      ))}
    </div>
  );
}