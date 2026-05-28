"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { groupsBusiness, painLabelsTech, type PainGroup } from "@/lib/pain-points";

export function PainPointGrid() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [techOpen, setTechOpen] = useState<Set<string>>(new Set());
  const [dark, setDark] = useState(false);

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

  const toggleGroupSelect = (g: PainGroup) => {
    const next = new Set(selected);
    const ids = g.children.map((c) => c.id);
    const allSelected = ids.every((id) => next.has(id));
    ids.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
    setSelected(next);
  };

  const toggleSet = (
    set: Set<string>,
    setter: (s: Set<string>) => void,
    id: string,
  ) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  };

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
        <div
          className={`flex items-start justify-between gap-x-2 px-2 py-1 mb-2 border-b flex-wrap ${dark ? "border-gray-800 text-gray-300" : "border-gray-200 text-gray-700"}`}
        >
          <span className="font-bold tracking-wider">▼ Business Problems</span>
          <span className="flex items-center gap-2 text-[9px]">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />critical</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />warning</span>
          </span>
        </div>
        <div className="pb-2">
          {groupsBusiness.map((g, gi) => {
            const isLast = gi === groupsBusiness.length - 1;
            return (
              <div key={g.id}>
                <div className="flex">
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
                       className={`flex-1 flex items-start justify-start gap-2 px-2 py-2 cursor-pointer transition-colors ${groupSelectionCount(g) > 0 ? "bg-red-50 dark:bg-red-900/20" : "hover:bg-blue-100 dark:hover:bg-blue-950"}`}
                    >
                      <span
                        className={`shrink-0 w-3.5 h-3.5 flex items-center justify-center border text-[8px] font-bold ${groupSelectionCount(g) > 0 ? "bg-red-500 border-red-500 text-white" : "border-gray-400 dark:border-gray-500 text-transparent"}`}
                      >
                        {groupSelectionCount(g) > 0 ? "✓" : ""}
                      </span>
                      <span
                        className={`text-xs text-left font-bold tracking-wider ${groupSelectionCount(g) > 0 ? "text-red-600 dark:text-red-400" : dark ? "text-gray-400" : "text-gray-500"}`}
                      >
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
                  <div>
                    <div
                      className="px-1 pb-1"
                      style={{ paddingLeft: "1.2rem" }}
                    >
                      <span
                        className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {g.description}
                      </span>
                    </div>
                    {g.children.map((child, i, arr) => {
                      const isLastChild = i === arr.length - 1;
                      const isSel = selected.has(child.id);
                      const isTechOpen = techOpen.has(child.id);
                      return (
                        <div key={child.id}>
                          <div
                            className="flex items-center w-full"
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
                                className={`text-xs sm:text-sm font-bold tracking-wider ${isSel ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}
                              >
                                {child.label}
                              </span>
                              {painLabelsTech[child.id] && (
                                <span className={`text-[10px] leading-tight ${dark ? "text-gray-500" : "text-gray-400"}`}>
                                  {painLabelsTech[child.id]}
                                </span>
                              )}
                            </div>
                            {child.tech && (
                              <button
                                onClick={() =>
                                  toggleSet(techOpen, setTechOpen, child.id)
                                }
                                className={`ml-auto shrink-0 text-[10px] px-1 py-0.5 w-12 text-center border cursor-pointer transition-colors ${isTechOpen ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-500"}`}
                              >
                                {isTechOpen ? "▲ tech" : "▼ tech"}
                              </button>
                            )}
                          </div>
                          {isTechOpen && child.tech && (
                            <div
                              className="flex flex-wrap gap-1"
                              style={{
                                paddingLeft: "2.4rem",
                                paddingTop: "2px",
                              }}
                            >
                              {child.tech.split(",").map((t, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
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
