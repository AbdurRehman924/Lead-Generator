"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GridBg } from "@/components/GridBg";
import { PainPointGrid } from "@/components/PainPointGrid";
import { AssessCarousel } from "@/components/AssessCarousel";

function CollapsibleSection({
  title,
  desc,
  count,
  children,
  titleClass,
}: {
  title: React.ReactNode;
  desc?: string;
  count?: string;
  children: React.ReactNode;
  titleClass?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 max-w-2xl mx-auto">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left group cursor-pointer"
      >
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-[2px_2px_0px_#d1d5db] dark:shadow-[2px_2px_0px_#374151] hover:shadow-[4px_4px_0px_#bfdbfe] dark:hover:shadow-[4px_4px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex-1">
            <h3 className={`text-sm font-bold ${titleClass || "text-gray-900 dark:text-white"} leading-tight`}>
              {title}
            </h3>
            {desc && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{desc}</p>
            )}
          </div>
          <div className="flex items-center justify-end gap-3 mt-2">
            {count && (
              <span className="text-xs font-bold text-white dark:text-gray-900 bg-gray-900 dark:bg-white border border-gray-600 dark:border-gray-300 px-2.5 h-5 flex items-center">
                {count}
              </span>
            )}
            <span className="inline-flex items-center justify-center w-5 h-5 text-white dark:text-gray-900 bg-gray-900 dark:bg-white border border-gray-600 dark:border-gray-300">
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      <main className="flex-1 flex flex-col">
        <section className="relative min-h-screen flex flex-col justify-center pt-16 pb-8">
          <GridBg />
          <div className="relative z-10 max-w-4xl mx-auto w-full px-6">
            <CollapsibleSection title={<><span className="text-blue-600 dark:text-blue-400">Benchmark your intuition.</span></>} desc="Is your software worth what you invested? Cloud, fullstack, or pipeline — instant scorecard. No filter." count="3 evaluators">
              <div className="bg-white/70 dark:bg-gray-950/70 border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 text-xs">
                  <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                    <p className="font-bold text-gray-900 dark:text-white">Eight</p>
                    <p className="text-gray-500 dark:text-gray-400">Questions</p>
                  </div>
                  <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                    <p className="font-bold text-gray-900 dark:text-white">Three</p>
                    <p className="text-gray-500 dark:text-gray-400">Tracks</p>
                  </div>
                  <div className="flex-1 min-w-[6rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 sm:p-3 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]">
                    <p className="font-bold text-gray-900 dark:text-white">Critical</p>
                    <p className="text-gray-500 dark:text-gray-400">Evaluations</p>
                  </div>
                </div>
                <AssessCarousel />
                <div className="mt-3">
                  <Link
                    href="/assess"
                    className="group block w-full text-center text-xs tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
                  >
                    Run a check{" "}
                    <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title={<>Identify your <span className="text-green-600 dark:text-green-400">business</span> <span className="text-red-500 dark:text-red-400">painpoints</span></>} desc="Select problems. Hit the button. Copy the message. Send it over — let's talk." count="6 areas">
              <PainPointGrid />
            </CollapsibleSection>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-[10px] tracking-wider text-gray-400 dark:text-gray-500">
          {new Date().getFullYear()}{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 font-bold">
            a
          </span>
          bdur{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 font-bold">
            r
          </span>
          ehman{" "}
          <span className="text-xs text-gray-600 dark:text-gray-300 font-bold">
            tariq
          </span>
        </div>
      </footer>
    </div>
  );
}
