"use client";

import React from "react";
import {
  Box,
  Braces,
  Code2,
  Database,
  FileCode,
  Palette,
  Server,
  ShieldCheck
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

function ReactIcon() {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="size-5 fill-current">
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextjsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 18.066L9.4 6.942H7.667v10.124h1.6V10.2l7.133 9.42c-.244.16-.496.31-.734.446zm-.4-4.82V6.942h-1.6v4.225l1.6 2.08z" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M11.998 1.5a1.8 1.8 0 0 0-.91.25L3.38 6.17a1.8 1.8 0 0 0-.88 1.56v8.54c0 .65.34 1.24.88 1.56l7.708 4.42a1.8 1.8 0 0 0 1.82 0l7.708-4.42c.54-.32.88-.91.88-1.56V7.73c0-.65-.34-1.24-.88-1.56L12.908 1.75a1.8 1.8 0 0 0-.91-.25zm-.05 3.32a.9.9 0 0 1 .45.12l6.1 3.5c.27.16.44.45.44.77v6.98c0 .32-.17.61-.44.77l-6.1 3.5a.9.9 0 0 1-.9 0l-6.1-3.5a.9.9 0 0 1-.44-.77V9.21c0-.32.17-.61.44-.77l6.1-3.5a.9.9 0 0 1 .45-.12z" />
    </svg>
  );
}

function AuthjsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M12 13.5v3.5" />
      <path d="M10.5 15.5h3" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.186V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.186V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.186V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.185.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 0 0 .185-.186V9.006a.185.185 0 0 0-.185-.186H2.208a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m21.758 1.483c-.21-.137-1.428-.79-3.26-.79-1.203 0-2.316.326-3.14.945-1.077-.107-5.06-.107-7.468 1.157-1.096.577-1.936 1.436-2.5 2.556-.376.745-.583 1.62-.615 2.597 0 1.956 1.11 3.555 3.036 4.382 1.41.606 3.106.764 4.887.458 2.052-.352 3.896-1.554 5.334-3.483.337-.453.634-.945.885-1.47 1.455.08 2.85-.36 3.82-1.202.433-.377.712-.862.805-1.396a1.6 1.6 0 0 0-.784-1.648" />
    </svg>
  );
}

function PhpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.5 13.5l1.1-6h2.2c1.2 0 1.9.6 1.7 1.8-.2 1.3-1.1 2-2.3 2H8.1l-.6 2.2H7.5zm3-3.2h.7c.6 0 1.1-.3 1.2-.9.1-.5-.2-.9-.8-.9h-.6l-.5 1.8zm3.8 3.2l1.6-8.5h1.2l-.7 3.5h1.6c1.2 0 1.9.6 1.7 1.8-.2 1.3-1.1 2-2.3 2h-1.1l-.6 2.2h-1.4zm2.6-3.2h.7c.6 0 1.1-.3 1.2-.9.1-.5-.2-.9-.8-.9h-.6l-.5 1.8z" />
    </svg>
  );
}

function OwaspIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M21.62 10.97l-8.59-8.59c-.49-.49-1.28-.49-1.77 0l-1.96 1.96 2.49 2.49c.53-.18 1.15-.06 1.57.36.43.43.54 1.05.35 1.58l2.4 2.4c.53-.19 1.15-.08 1.58.35.61.61.61 1.6 0 2.21-.61.61-1.6.61-2.21 0-.44-.44-.55-1.07-.34-1.61l-2.25-2.25v5.19c.2.11.38.26.51.46.43.61.35 1.45-.19 1.99-.61.61-1.6.61-2.21 0-.61-.61-.61-1.6 0-2.21.2-.2.43-.33.68-.4v-5.26c-.25-.07-.48-.2-.68-.4-.44-.44-.54-1.08-.32-1.62L8.29 4.39 2.38 10.3c-.49.49-.49 1.28 0 1.77l8.59 8.59c.49.49 1.28.49 1.77 0l8.88-8.88c.49-.49.49-1.28 0-1.81z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function PostgresIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.82 14.8c-.37.47-1.04.66-1.67.43-.88-.32-1.35-1.12-1.42-2.03-.04-.54-.15-.99-.57-1.35-.4-.34-.96-.4-1.47-.41-.75-.02-1.48.24-2.19.46-.73.23-1.47.45-2.24.41-.67-.04-1.32-.3-1.84-.73-.59-.49-.96-1.18-1.06-1.94-.14-1.12.35-2.22 1.21-2.94.88-.74 2.05-1.08 3.19-1.07 1.01.01 2.02.3 2.94.75.94.46 1.77 1.14 2.37 1.99.63.89.96 1.96.94 3.05-.01 1.22-.38 2.51-1.19 3.38z" />
    </svg>
  );
}

function MySqlIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12.03 2.5c-4.8 0-8.8 3.5-9.6 8.2 1.3-1.5 3.3-2.5 5.5-2.5 2.1 0 4 1 5.3 2.5 1.2-1.5 3.2-2.5 5.3-2.5 2.2 0 4.2 1 5.5 2.5-.8-4.7-4.8-8.2-9.6-8.2zm-5.8 8.8c-2.4 0-4.4 1.8-4.7 4.1 1.3-.9 2.9-1.4 4.7-1.4 1.7 0 3.3.5 4.6 1.4-.4-2.3-2.3-4.1-4.6-4.1zm11.6 0c-2.4 0-4.3 1.8-4.6 4.1 1.3-.9 2.9-1.4 4.6-1.4 1.8 0 3.4.5 4.7 1.4-.3-2.3-2.3-4.1-4.7-4.1z" />
    </svg>
  );
}

function PrismaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M21.92 18.99 13.06 2.45a1.22 1.22 0 0 0-2.12 0L2.08 19a1.22 1.22 0 0 0 1.06 1.79h17.72a1.22 1.22 0 0 0 1.06-1.8zM12 5.57l6.63 12.43h-5.21L12 11.23l-1.42 6.77H5.37L12 5.57z" />
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M21.362 9.354H12V.3a.3.3 0 0 0-.535-.19l-9.362 11.4a.3.3 0 0 0 .233.49H12v9.054a.3.3 0 0 0 .535.19l9.362-11.4a.3.3 0 0 0-.233-.49z" />
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M11.91 2C6.79 2 7.11 4.22 7.11 4.22l.01 2.3h4.9v.7H4.15S2 6.95 2 12.08s1.88 4.96 1.88 4.96h1.12v-1.57c0-1.8 1.54-1.78 1.54-1.78h4.88c1.43 0 1.53-.98 1.53-.98v-4.5c0-1.46-1.27-1.44-1.27-1.44H7.2V5.2s-.08-1.7 4.72-1.7c4.78 0 4.67 1.82 4.67 1.82v1.4h-2.34v.7h4.88s2.87-.22 2.87 4.66-2.51 4.88-2.51 4.88h-1.12v-1.37c0-1.68-1.44-1.78-1.44-1.78H12.2c-1.47 0-1.47 1.05-1.47 1.05v4.44c0 1.48 1.34 1.45 1.34 1.45h4.63s4.65.37 4.65-4.87c0-5.25-2.02-4.9-2.02-4.9h-1.1v-2.3S17.03 2 11.91 2z" />
    </svg>
  );
}

const skillDisplayMap: Record<string, SkillDisplay> = {
  "react":           { bg: "#20232a", textColor: "#61dafb", icon: <ReactIcon /> },
  "react.js":        { bg: "#20232a", textColor: "#61dafb", icon: <ReactIcon /> },
  "javascript":      { bg: "#f7df1e", textColor: "#000000", icon: <span className="font-extrabold text-[15px] tracking-tighter text-black select-none leading-none">JS</span> },
  "js":              { bg: "#f7df1e", textColor: "#000000", icon: <span className="font-extrabold text-[15px] tracking-tighter text-black select-none leading-none">JS</span> },
  "typescript":      { bg: "#3178c6", textColor: "#ffffff", icon: <span className="font-bold text-[14px] tracking-tighter text-white select-none leading-none">TS</span> },
  "ts":              { bg: "#3178c6", textColor: "#ffffff", icon: <span className="font-bold text-[14px] tracking-tighter text-white select-none leading-none">TS</span> },
  "next.js":         { bg: "#000000", textColor: "#ffffff", icon: <NextjsIcon /> },
  "nextjs":          { bg: "#000000", textColor: "#ffffff", icon: <NextjsIcon /> },
  "next":            { bg: "#000000", textColor: "#ffffff", icon: <NextjsIcon /> },
  "node.js":         { bg: "#22c55e", textColor: "#ffffff", icon: <NodeIcon /> },
  "nodejs":          { bg: "#22c55e", textColor: "#ffffff", icon: <NodeIcon /> },
  "node":            { bg: "#22c55e", textColor: "#ffffff", icon: <NodeIcon /> },
  "tailwind css":    { bg: "#0f172a", textColor: "#38bdf8", icon: <TailwindIcon /> },
  "tailwind":        { bg: "#0f172a", textColor: "#38bdf8", icon: <TailwindIcon /> },
  "tailwindcss":     { bg: "#0f172a", textColor: "#38bdf8", icon: <TailwindIcon /> },
  "express.js":      { bg: "#1f2937", textColor: "#ffffff", icon: <span className="font-extrabold text-[15px] tracking-tight text-white select-none lowercase leading-none">ex</span> },
  "express":         { bg: "#1f2937", textColor: "#ffffff", icon: <span className="font-extrabold text-[15px] tracking-tight text-white select-none lowercase leading-none">ex</span> },
  "expressjs":       { bg: "#1f2937", textColor: "#ffffff", icon: <span className="font-extrabold text-[15px] tracking-tight text-white select-none lowercase leading-none">ex</span> },
  "auth.js":         { bg: "#4f46e5", textColor: "#ffffff", icon: <AuthjsIcon /> },
  "nextauth":        { bg: "#4f46e5", textColor: "#ffffff", icon: <AuthjsIcon /> },
  "nextauth.js":     { bg: "#4f46e5", textColor: "#ffffff", icon: <AuthjsIcon /> },
  "docker":          { bg: "#2496ed", textColor: "#ffffff", icon: <DockerIcon /> },
  "php":             { bg: "#777bb4", textColor: "#ffffff", icon: <PhpIcon /> },
  "owasp":           { bg: "#0f172a", textColor: "#38bdf8", icon: <OwaspIcon /> },
  "owasp top 10":    { bg: "#0f172a", textColor: "#38bdf8", icon: <OwaspIcon /> },
  "mysql":           { bg: "#00758f", textColor: "#ffffff", icon: <MySqlIcon /> },
  "postgresql":      { bg: "#336791", textColor: "#ffffff", icon: <PostgresIcon /> },
  "postgres":        { bg: "#336791", textColor: "#ffffff", icon: <PostgresIcon /> },
  "prisma":          { bg: "#1a202c", textColor: "#ffffff", icon: <PrismaIcon /> },
  "prisma orm":      { bg: "#1a202c", textColor: "#ffffff", icon: <PrismaIcon /> },
  "supabase":        { bg: "#10b981", textColor: "#ffffff", icon: <SupabaseIcon /> },
  "git":             { bg: "#f05032", textColor: "#ffffff", icon: <GitIcon /> },
  "github":          { bg: "#181717", textColor: "#ffffff", icon: <GitHubIcon /> },
  "git & github":    { bg: "#181717", textColor: "#ffffff", icon: <GitHubIcon /> },
  "python":          { bg: "#3776ab", textColor: "#ffd43b", icon: <PythonIcon /> },
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
        <h2 className="section-giant-title text-center select-none mb-10 md:mb-14">
          SKILLS
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
