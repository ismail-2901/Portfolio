"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function GithubSection() {
  const [hoveredDay, setHoveredDay] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  // Generate realistic GitHub contribution matrix (52 weeks x 7 days)
  const weeks = useMemo(() => {
    const totalWeeks = 48;
    const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
    const grid: { level: number; count: number; date: string }[][] = [];

    // Pseudo-random deterministic generator
    let seed = 42;
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    const startDate = new Date("2025-11-01");
    const currentDate = new Date(startDate);

    for (let w = 0; w < totalWeeks; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const rand = random();
        let level = 0;
        let count = 0;
        if (rand > 0.45) {
          level = 1;
          count = Math.floor(random() * 3) + 1;
        }
        if (rand > 0.72) {
          level = 2;
          count = Math.floor(random() * 4) + 3;
        }
        if (rand > 0.88) {
          level = 3;
          count = Math.floor(random() * 5) + 6;
        }
        if (rand > 0.95) {
          level = 4;
          count = Math.floor(random() * 8) + 10;
        }

        const dateStr = currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });

        days.push({ level, count, date: dateStr });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      grid.push(days);
    }

    return { grid, months };
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-300 dark:bg-emerald-800";
      case 2:
        return "bg-emerald-400 dark:bg-emerald-600";
      case 3:
        return "bg-emerald-500 dark:bg-emerald-500";
      case 4:
        return "bg-emerald-600 dark:bg-emerald-400";
      default:
        return "bg-neutral-200 dark:bg-neutral-800";
    }
  };

  return (
    <section className="py-16 md:py-24" id="github">
      <div className="container-shell">
        {/* Giant Section Title */}
        <h2 className="section-giant-title text-center select-none mb-8 md:mb-12">
          GITHUB
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Stats Row & View Profile Link */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-rule/60 mb-8">
            <div className="flex items-center gap-10 md:gap-14">
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted">
                  FOLLOWERS
                </p>
                <p className="text-xl md:text-2xl font-black text-copy mt-1">18</p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted">
                  COMMITS
                </p>
                <p className="text-xl md:text-2xl font-black text-copy mt-1">1,021</p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted">
                  REPOS
                </p>
                <p className="text-xl md:text-2xl font-black text-copy mt-1">40</p>
              </div>
            </div>

            <Link
              href="https://github.com/ismail-2901"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs md:text-sm font-bold uppercase tracking-wider text-copy underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              VIEW PROFILE <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* Contribution Graph Container with Mobile Scroll Affordance */}
          <div className="relative">
            <div className="relative overflow-x-auto pb-4 after:absolute after:right-0 after:top-0 after:bottom-4 after:w-16 after:bg-gradient-to-l after:from-canvas after:to-transparent after:pointer-events-none md:after:hidden">
              {hoveredDay && (
                <div
                  className="absolute pointer-events-none z-20 -top-8 px-2.5 py-1 rounded-md bg-neutral-900 text-white text-[10px] font-medium shadow-md -translate-x-1/2 whitespace-nowrap"
                  style={{ left: Math.max(80, hoveredDay.x - 30) }}
                >
                  {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"} on {hoveredDay.date}
                </div>
              )}
              <div className="min-w-[700px] inline-block p-4 rounded-2xl bg-surface border border-rule">
                {/* Months Header */}
                <div className="flex justify-between text-[11px] text-muted mb-2 px-8">
                  {weeks.months.map((m, idx) => (
                    <span key={idx}>{m}</span>
                  ))}
                </div>

                {/* Grid Area with Day Labels */}
                <div className="flex gap-2">
                  <div className="flex flex-col justify-between text-[9px] text-muted pr-1 py-1">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  <div className="flex gap-1.5 flex-1 justify-between">
                    {weeks.grid.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1.5">
                        {week.map((day, dIdx) => (
                          <div
                            key={dIdx}
                            className={`size-2.5 sm:size-3 rounded-[3px] transition-transform hover:scale-125 cursor-pointer ${getCellColor(
                              day.level
                            )}`}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                count: day.count,
                                date: day.date,
                                x: rect.x + rect.width / 2,
                                y: rect.y
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer Details */}
                <div className="flex items-center justify-between text-[11px] text-muted mt-4 pt-3 border-t border-rule/50 px-2">
                  <span>Learn how we count contributions</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <span className="size-2.5 rounded-[2px] bg-neutral-200 dark:bg-neutral-800" />
                    <span className="size-2.5 rounded-[2px] bg-emerald-300 dark:bg-emerald-800" />
                    <span className="size-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-600" />
                    <span className="size-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-500" />
                    <span className="size-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="md:hidden text-[11px] text-muted mt-2 text-center select-none">
              ← Swipe to view full year →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
