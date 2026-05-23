"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { calculators } from "@/lib/calculators/config";

const list = Object.values(calculators);

export function AssessCarousel() {
  const [idx, setIdx] = useState(0);
  const card = list[idx];

  const next = useCallback(() => setIdx((i) => (i + 1) % list.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + list.length) % list.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const btn = (onClick: () => void, dir: "prev" | "next") => (
    <button
      onClick={onClick}
      className="shrink-0 w-8 h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:border-blue-400 transition-all shadow-[2px_2px_0px_#d1d5db] dark:shadow-[2px_2px_0px_#374151] hover:shadow-[4px_4px_0px_#bfdbfe] dark:hover:shadow-[4px_4px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5"
      aria-label={dir === "prev" ? "Previous calculator" : "Next calculator"}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center">
      <div className="hidden sm:block">{btn(prev, "prev")}</div>

      <div className="flex-1 w-full sm:mx-3">
        <Link
          href={`/assess/${card.id}`}
          className="group relative flex flex-col bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] hover:shadow-[5px_5px_0px_#bfdbfe] dark:hover:shadow-[5px_5px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 h-44 sm:h-48"
        >
          <div className="flex items-start justify-between mb-1">
            <p className="text-[10px] tracking-wider uppercase text-blue-600 font-semibold">
              {card.categories.length} dimensions
            </p>
            <span className="text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold">
              <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">→</span>
            </span>
          </div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{card.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">{card.tagline}</p>
          <div className="flex flex-wrap gap-1">
            {card.categories.map((c) => (
              <span key={c.id} className="text-[9px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                {c.label}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-1">
            <div className="flex gap-1.5">
              {list.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 transition-all duration-500 ${
                    i === idx ? "bg-blue-500 w-3" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </Link>
      </div>

      <div className="hidden sm:block">{btn(next, "next")}</div>

      <div className="flex sm:hidden items-center gap-3 mt-2">
        {btn(prev, "prev")}
        {btn(next, "next")}
      </div>
    </div>
  );
}
