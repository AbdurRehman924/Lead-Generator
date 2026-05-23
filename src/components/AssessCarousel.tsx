"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { calculators } from "@/lib/calculators/config";

const list = Object.values(calculators);

function Card({
  card,
  onSwipeLeft,
  onSwipeRight,
  onDragStart,
}: {
  card: (typeof list)[number];
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onDragStart: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragStart={onDragStart}
      onDragEnd={(_, info) => {
        if (info.offset.x > 80) onSwipeRight();
        else if (info.offset.x < -80) onSwipeLeft();
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        href={`/assess/${card.id}`}
        className="group relative flex flex-col bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] h-full hover:shadow-[5px_5px_0px_#bfdbfe] dark:hover:shadow-[5px_5px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-1">
            <p className="text-[10px] sm:text-xs tracking-wider uppercase text-blue-600 font-semibold">
              {card.categories.length} dimensions
            </p>
          <span className="text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold">
            <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">→</span>
          </span>
        </div>
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-1">{card.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">{card.tagline}</p>
        <div className="flex flex-wrap gap-1">
          {card.categories.map((c) => (
            <span key={c.id} className="text-[9px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              {c.label}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

export function AssessCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const pause = useCallback(() => {
    setPaused(true);
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 5000);
  }, []);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % list.length);
    pause();
  }, [pause]);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + list.length) % list.length);
    pause();
  }, [pause]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, paused]);

  useEffect(() => {
    return () => clearTimeout(pauseTimer.current);
  }, []);

  const current = list[idx];
  const behind = list[(idx - 1 + list.length) % list.length];

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
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center w-full">
        <div className="hidden sm:block">{btn(prev, "prev")}</div>

        <div className="flex-1 sm:mx-3">
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: "11rem", minHeight: "176px" }}
          >
            {/* Card behind */}
            <div className="absolute inset-0 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3 sm:p-5 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151] opacity-50 scale-[0.94] translate-y-0.5 pointer-events-none">
              <p className="text-[10px] tracking-wider uppercase text-gray-300 dark:text-gray-600">{behind.categories.length} dimensions</p>
              <h4 className="text-sm font-bold text-gray-300 dark:text-gray-600 mt-1">{behind.name}</h4>
            </div>

            {/* Top card — swipeable */}
            <Card key={current.id} card={current} onSwipeLeft={next} onSwipeRight={prev} onDragStart={pause} />
          </div>
        </div>

        <div className="hidden sm:block">{btn(next, "next")}</div>
      </div>

      {/* Dots + mobile arrows under cards */}
      <div className="flex items-center gap-3">
        <div className="sm:hidden">{btn(prev, "prev")}</div>
        <div className="flex gap-1.5">
          {list.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 transition-all duration-500 ${
                i === idx ? "w-3 bg-blue-500" : "w-1.5 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
        <div className="sm:hidden">{btn(next, "next")}</div>
      </div>
    </div>
  );
}
