"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculators } from "@/lib/calculators/config";

const list = Object.values(calculators);

export function AssessCarousel() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "fade">("typing");

  const card = list[idx];

  useEffect(() => {
    const full = `${card.categories.length} categories · ${card.name} · ${card.tagline}`;

    if (phase === "typing") {
      if (text.length < full.length) {
        const timer = setTimeout(() => setText(full.slice(0, text.length + 1)), 25);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("hold"), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === "hold") {
      setPhase("fade");
    }

    if (phase === "fade") {
      const timer = setTimeout(() => {
        setText("");
        setIdx((i) => (i + 1) % list.length);
        setPhase("typing");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, text, idx, card]);

  return (
    <div className="border border-gray-200 dark:border-gray-800 p-4 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="text-[10px] tracking-wider uppercase text-gray-400 ml-2 font-mono">
          assessment.sh
        </span>
      </div>

      <div className="font-mono text-xs leading-relaxed min-h-[4rem]">
        <span className="text-green-600 dark:text-green-400">$ </span>
        <span
          className={`transition-opacity duration-300 ${phase === "fade" ? "opacity-0" : "opacity-100"}`}
        >
          {text}
          {phase === "typing" && text.length < `${card.categories.length} categories · ${card.name} · ${card.tagline}`.length && (
            <span className="inline-block w-1.5 h-3.5 bg-blue-500 ml-0.5 align-middle animate-pulse" />
          )}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-1.5">
          {list.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 transition-all duration-300 ${
                i === idx ? "bg-blue-500 w-3" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
        <Link
          href={`/assess/${card.id}`}
          className="text-[10px] tracking-wider uppercase text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors font-bold"
        >
          Take this →
        </Link>
      </div>
    </div>
  );
}
