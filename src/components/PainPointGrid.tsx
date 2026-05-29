"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { groupsBusiness, painLabelsTech, type PainGroup } from "@/lib/pain-points";

const fieldGroups: Record<string, string[]> = {
  all: groupsBusiness.map((g) => g.id),
  frontend: ["performance", "coding", "growth"],
  backend: ["building", "coding", "ops"],
  fullstack: ["shipping", "building", "performance", "planning", "growth", "team"],
  devops: ["monitoring", "deploying", "shipping", "ops"],
  cloud: ["monitoring", "security", "ops"],
  security: ["security"],
};

const fieldOptions = [
  { id: "all", label: "All Problems" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "FullStack" },
  { id: "devops", label: "DevOps" },
  { id: "cloud", label: "Cloud" },
  { id: "security", label: "Security" },
];

export function PainPointGrid() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [techOpen, setTechOpen] = useState<Set<string>>(new Set());
  const [field, setField] = useState("all");
  const [showFieldMenu, setShowFieldMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowFieldMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(
    () => groupsBusiness.filter((g) => fieldGroups[field]?.includes(g.id)),
    [field],
  );

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleGroupSelect = useCallback((g: PainGroup) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const ids = g.children.map((c) => c.id);
      const allSelected = ids.every((id) => next.has(id));
      ids.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  }, []);

  const toggleSet = useCallback((
    set: Set<string>,
    setter: (s: Set<string>) => void,
    id: string,
  ) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  }, []);

  const groupSelectionCount = (group: PainGroup) =>
    group.children.filter((c) => selected.has(c.id)).length;

  return (
    <div className="bg-white/70 dark:bg-gray-950/70 border border-gray-200 dark:border-gray-800 p-6 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] h-full flex flex-col">
      <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">
        Identify your{" "}
        <span className="text-green-600 dark:text-green-400">business</span>{" "}
        <span className="text-red-500 dark:text-red-400">painpoints</span>
      </h2>
      <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Find your problem below. It probably has a name — and a solution. These aren&apos;t just checkboxes. They&apos;re problems I&apos;ve already solved.
      </h3>

      {/* Filter bar — outside scrollable area */}
      <div className="flex items-start justify-between gap-x-2 px-2 py-1 mb-2 border-b border-gray-200 dark:border-gray-700 flex-wrap">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowFieldMenu((v) => !v)}
            className="font-bold tracking-wider text-xs cursor-pointer transition-colors flex items-center gap-1.5 px-2 py-0.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            {fieldOptions.find((f) => f.id === field)?.label || "All Problems"}
            <span className={`inline-block transition-transform duration-200 ${showFieldMenu ? "rotate-180" : ""}`}>▼</span>
          </button>
          {showFieldMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-20 min-w-[140px]">
              {fieldOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setField(f.id); setShowFieldMenu(false); }}
                  className={`block w-full text-left text-xs px-3 py-1.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${field === f.id ? "font-bold text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="flex items-center gap-2 text-[9px]">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />critical</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />warning</span>
        </span>
      </div>

      <div
        className={`font-mono text-xs leading-loose overflow-x-auto flex-1 text-left ${dark ? "bg-gray-900" : "bg-gray-100"}`}
        style={{
          maxHeight: "380px",
          overflowY: "auto",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 8px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 8px), transparent 100%)",
        }}
      >
        <div className="pr-4 pt-4">
          <div className="pb-2">
          {filtered.map((g, gi) => {
            const isLast = gi === filtered.length - 1;
            return (
              <div key={g.id} className="border-b-2 border-gray-300 dark:border-gray-600">
                <div className={`flex ${groupSelectionCount(g) > 0 ? "bg-white dark:bg-gray-800" : ""}`}>
                  <div
                    className="flex flex-col items-center"
                    style={{ width: "1.2rem" }}
                  >
                    <span
                      className={`text-xs font-mono select-none ${dark ? "text-gray-600" : "text-gray-300"}`}
                    >
                      {isLast ? "└" : "├"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 flex">
                    <button
                      onClick={() => toggleGroupSelect(g)}
                       className="flex-1 flex items-start justify-start gap-2 px-2 py-2 cursor-pointer transition-colors hover:bg-blue-100 dark:hover:bg-blue-950"
                    >
                      <span
                        className={`shrink-0 w-3.5 h-3.5 flex items-center justify-center border text-[8px] font-bold ${groupSelectionCount(g) > 0 ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400 dark:border-gray-500 text-transparent"}`}
                      >
                        {groupSelectionCount(g) > 0 ? "✓" : ""}
                      </span>
                      <span
                        className={`text-xs text-left font-bold tracking-wider ${groupSelectionCount(g) > 0 ? "text-gray-900 dark:text-white" : dark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        <span className={`text-[9px] tracking-wider uppercase block ${groupSelectionCount(g) > 0 ? "text-gray-900 dark:text-white" : "text-blue-600 dark:text-blue-400"}`}>{g.id}</span>
                        {g.label}
                      </span>
                    </button>
                    <button
                      onClick={() => toggleSet(expanded, setExpanded, g.id)}
                      className="shrink-0 w-6 flex items-start justify-center pt-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                      aria-label={expanded.has(g.id) ? "Collapse" : "Expand"}
                    >
                      <span
                        className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {expanded.has(g.id) ? "▲" : "▼"}
                      </span>
                    </button>
                  </div>
                </div>

                {expanded.has(g.id) && (
                  <div className={groupSelectionCount(g) > 0 ? "bg-white dark:bg-gray-800" : ""}>
                    <div
                      className="px-1 pb-1"
                      style={{ paddingLeft: "1.2rem" }}
                    >
                      <span
                        className={`text-[10px] ${dark ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {g.description}
                      </span>
                    </div>
                    {g.children.map((child, i, arr) => {
                      const isLastChild = i === arr.length - 1;
                      const isSel = selected.has(child.id);
                      const isTechOpen = techOpen.has(child.id);
                      return (
                        <div key={child.id} className="border-b border-gray-200 dark:border-gray-700">
                          <div
                            className={`flex items-start w-full ${isSel ? "bg-white dark:bg-gray-800" : ""}`}
                            style={{ paddingLeft: "1.2rem" }}
                          >
                            <span
                              className={`w-4 text-sm font-mono select-none flex-shrink-0 ${dark ? "text-gray-600" : "text-gray-300"}`}
                            >
                              {isLast ? "" : "│"}
                            </span>
                            <span
                              className={`w-4 text-sm font-mono select-none flex-shrink-0 ${dark ? "text-gray-600" : "text-gray-300"}`}
                            >
                              {isLastChild ? "└─" : "├─"}
                            </span>
                            {child.severity && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0 ${
                                  child.severity === "critical"
                                    ? "bg-red-500"
                                    : "bg-amber-400"
                                }`}
                              />
                            )}
                              <div className="flex flex-col py-1.5 min-w-0">
                              <span
                                className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400"
                              >
                                {child.label}
                              </span>
                              {painLabelsTech[child.id] && (
                                <span className={`text-[10px] leading-tight ${dark ? "text-gray-300" : "text-gray-600"}`}>
                                  {painLabelsTech[child.id]}
                                </span>
                              )}
                            </div>
                            {child.tech && (
                              <button
                                onClick={() =>
                                  toggleSet(techOpen, setTechOpen, child.id)
                                }
                                className={`ml-auto self-end mb-2 mr-2 shrink-0 text-[10px] px-1 py-0.5 w-12 text-center border cursor-pointer transition-colors ${isTechOpen ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-500"}`}
                              >
                                {isTechOpen ? "▲ tech" : "▼ tech"}
                              </button>
                            )}
                          </div>
                          {isTechOpen && child.tech && (
                            <div
                              className="flex flex-wrap gap-1 mb-2"
                              style={{
                                paddingLeft: "2.4rem",
                                paddingTop: "2px",
                              }}
                            >
                              {child.tech.split(",").map((t) => (
                                <span
                                  key={`${child.id}-${t.trim()}`}
                                  className="text-[9px] px-1.5 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                                >
                                  {t.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>

      <div className="text-center mt-auto pt-4">
        <Link
          href={`/analyze?pains=${Array.from(selected).join(",")}`}
          className="group block w-full text-center text-xs tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
        >
          Get My Free Analysis{" "}
          <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
