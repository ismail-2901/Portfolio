"use client";

import React from "react";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Server,
  Terminal,
  Cpu,
  FileCode,
  GitBranch,
  ShieldCheck,
  Workflow
} from "lucide-react";

type SkillItem = {
  name: string;
  category: string;
  bg: string;
  textColor: string;
  icon: React.ReactNode;
};

const defaultSkills: SkillItem[] = [
  {
    name: "React",
    category: "Frontend Development",
    bg: "#06b6d4",
    textColor: "#ffffff",
    icon: <Layers className="size-5" />
  },
  {
    name: "JavaScript",
    category: "Web Development",
    bg: "#eab308",
    textColor: "#000000",
    icon: <Code2 className="size-5" />
  },
  {
    name: "TypeScript",
    category: "Typed JavaScript",
    bg: "#3178c6",
    textColor: "#ffffff",
    icon: <FileCode className="size-5" />
  },
  {
    name: "Next.js",
    category: "Full-Stack Framework",
    bg: "#000000",
    textColor: "#ffffff",
    icon: <Globe className="size-5" />
  },
  {
    name: "Node.js",
    category: "Backend Engineering",
    bg: "#22c55e",
    textColor: "#ffffff",
    icon: <Server className="size-5" />
  },
  {
    name: "Tailwind CSS",
    category: "Styling Framework",
    bg: "#38bdf8",
    textColor: "#ffffff",
    icon: <Layers className="size-5" />
  },
  {
    name: "Express.js",
    category: "REST APIs",
    bg: "#374151",
    textColor: "#ffffff",
    icon: <Workflow className="size-5" />
  },
  {
    name: "PostgreSQL",
    category: "Relational Database",
    bg: "#336791",
    textColor: "#ffffff",
    icon: <Database className="size-5" />
  },
  {
    name: "MySQL",
    category: "Database",
    bg: "#00758f",
    textColor: "#ffffff",
    icon: <Database className="size-5" />
  },
  {
    name: "Prisma",
    category: "ORM & Schema",
    bg: "#2d3748",
    textColor: "#ffffff",
    icon: <Cpu className="size-5" />
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    bg: "#181717",
    textColor: "#ffffff",
    icon: <GitBranch className="size-5" />
  },
  {
    name: "Supabase",
    category: "Backend Services",
    bg: "#10b981",
    textColor: "#ffffff",
    icon: <ShieldCheck className="size-5" />
  },
  {
    name: "Python",
    category: "Backend / Scripting",
    bg: "#2563eb",
    textColor: "#ffffff",
    icon: <Terminal className="size-5" />
  },
  {
    name: "HTML & CSS",
    category: "Web Foundation",
    bg: "#ea580c",
    textColor: "#ffffff",
    icon: <FileCode className="size-5" />
  }
];

export function SkillsSection() {
  return (
    <section className="py-16 md:py-24" id="skills">
      <div className="container-shell">
        {/* Giant Section Title */}
        <h2 className="section-giant-title text-center md:text-left select-none mb-10 md:mb-14">
          SKILLS
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {defaultSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-surface-raised border border-rule/70 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: skill.bg, color: skill.textColor }}
              >
                {skill.icon}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-copy truncate">{skill.name}</p>
                <p className="text-[11px] text-muted truncate">{skill.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

