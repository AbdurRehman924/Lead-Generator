"use client";

import Link from "next/link";
import { calculators } from "@/lib/calculators/config";

const list = Object.values(calculators);

export function AssessCarousel() {
  return (
    <div className="flex flex-col gap-3">
      {list.map((card) => (
        <Link
          key={card.id}
          href={`/assess/${card.id}`}
          className="group flex flex-col bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] hover:shadow-[5px_5px_0px_#bfdbfe] dark:hover:shadow-[5px_5px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{card.name}</h4>
            <span className="text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold shrink-0">
              <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">→</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[9px] text-gray-900 dark:text-white uppercase tracking-wider">Evaluate:</span>
          {card.categories.map((c) => (
            <span key={c.id} className="text-[9px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              {c.label}
            </span>
          ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
