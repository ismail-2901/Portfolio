"use client";

import React from "react";
import {
  Box,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Server,
  ShieldCheck,
  Terminal,
  Workflow
} from "lucide-react";

import type { PublicSkill } from "@/lib/queries";

type SkillDisplay = {
  bg: string;
  textColor: string;
  icon: React.ReactNode;
};

type SkillItem = {
  name: string;
  category: string;
  bg: string;
  textColor: string;
  icon: React.ReactNode;
};

const skillDisplayMap: Record<string, SkillDisplay> = {
  "react":           { bg: "#06b6d4", textColor: "#ffffff", icon: <Layers className="size-5" /> },
  "javascript":      { bg: "#eab308", textColor: "#000000", icon: <Code2 className="size-5" /> },
  "typescript":      { bg: "#3178c6", textColor: "#ffffff", icon: <FileCode className="size-5" /> },
  "next.js":         { bg: "#000000", textColor: "#ffffff", icon: <Globe className="size-5" /> },
  "node.js":         { bg: "#22c55e", textColor: "#ffffff", icon: <Server className="size-5" /> },
  "tailwind css":    { bg: "#38bdf8", textColor: "#ffffff", icon: <Layers className="size-5" /> },
  "express.js":      { bg: "#374151", textColor: "#ffffff", icon: <Workflow className="size-5" /> },
  "postgresql":      { bg: "#336791", textColor: "#ffffff", icon: <Database className="size-5" /> },
  "mysql":           { bg: "#00758f", textColor: "#ffffff", icon: <Database className="size-5" /> },
  "prisma":          { bg: "#2d3748", textColor: "#ffffff", icon: <Cpu className="size-5" /> },
  "git & github":    { bg: "#181717", textColor: "#ffffff", icon: <GitBranch className="size-5" /> },
  "supabase":        { bg: "#10b981", textColor: "#ffffff", icon: <ShieldCheck className="size-5" /> },
  "python":          { bg: "#2563eb", textColor: "#ffffff", icon: <Terminal className="size-5" /> },
  "html & css":      { bg: "#ea580c", textColor: "#ffffff", icon: <FileCode className="size-5" /> },
  "mongodb":         { bg: "#00ed64", textColor: "#000000", icon: <Database className="size-5" /> },
  "firebase":        { bg: "#f59e0b", textColor: "#000000", icon: <ShieldCheck className="size-5" /> },
  "aws":             { bg: "#ff9900", textColor: "#000000", icon: <Server className="size-5" /> },
  "java":            { bg: "#e76f00", textColor: "#ffffff", icon: <Braces className="size-5" /> },
  "canva":           { bg: "#00c4cc", textColor: "#ffffff", icon: <Palette className="size-5" /> },
  "figma":           { bg: "#a259ff", textColor: "#ffffff", icon: <Palette className="size-5" /> },
  "product design":  { bg: "#f43f5e", textColor: "#ffffff", icon: <Box className="size-5" /> },
  "graphql":         { bg: "#e10098", textColor: "#ffffff", icon: <Braces className="size-5" /> }
};

const defaultFallbackDisplay: SkillDisplay = {
  bg: "#6b7280",
  textColor: "#ffffff",
  icon: <Code2 className="size-5" />
};

const defaultSkills: SkillItem[] = [
  { name: "React",        category: "Frontend Development",  ...skillDisplayMap["react"] },
  { name: "JavaScript",   category: "Web Development",       ...skillDisplayMap["javascript"] },
  { name: "TypeScript",   category: "Typed JavaScript",      ...skillDisplayMap["typescript"] },
  { name: "Next.js",      category: "Full-Stack Framework",  ...skillDisplayMap["next.js"] },
  { name: "Node.js",      category: "Backend Engineering",   ...skillDisplayMap["node.js"] },
  { name: "Tailwind CSS", category: "Styling Framework",     ...skillDisplayMap["tailwind css"] },
  { name: "Express.js",   category: "REST APIs",             ...skillDisplayMap["express.js"] },
  { name: "PostgreSQL",   category: "Relational Database",   ...skillDisplayMap["postgresql"] },
  { name: "MySQL",        category: "Database",              ...skillDisplayMap["mysql"] },
  { name: "Prisma",       category: "ORM & Schema",          ...skillDisplayMap["prisma"] },
  { name: "Git & GitHub", category: "Version Control",       ...skillDisplayMap["git & github"] },
  { name: "Supabase",     category: "Backend Services",      ...skillDisplayMap["supabase"] },
  { name: "Python",       category: "Backend / Scripting",   ...skillDisplayMap["python"] },
  { name: "HTML & CSS",   category: "Web Foundation",        ...skillDisplayMap["html & css"] }
];

export function SkillsSection({ skills }: { skills: PublicSkill[] }) {
  const displaySkills: SkillItem[] =
    skills.length === 0
      ? defaultSkills
      : skills.map((skill) => {
          const key = skill.name.toLowerCase();
          const display = skillDisplayMap[key] ?? defaultFallbackDisplay;
          return {
            name: skill.name,
            category: skill.category,
            ...display
          };
        });

  return (
    <section className="py-16 md:py-24" id="skills">
      <div className="container-shell">
        {/* Giant Section Title */}
        <h2 className="section-giant-title text-center md:text-left select-none mb-10 md:mb-14">
          SKILLS
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displaySkills.map((skill) => (
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
