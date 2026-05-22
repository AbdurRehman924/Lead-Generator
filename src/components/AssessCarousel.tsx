"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculators } from "@/lib/calculators/config";

const list = Object.values(calculators);

export function AssessCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % list.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const card = list[idx];

  return (
    <div className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]" style={{ height: "10rem" }}>
      <p className="text-[10px] tracking-wider uppercase text-blue-600 font-semibold mb-1">
        {card.categories.length} categories
      </p>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{card.name}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{card.tagline}</p>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
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
        <Link
          href={`/assess/${card.id}`}
          className="text-[10px] tracking-wider uppercase text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold transition-colors"
        >
          Take this →
        </Link>
      </div>
    </div>
  );
}
