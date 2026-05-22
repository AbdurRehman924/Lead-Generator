"use client";

import { motion } from "framer-motion";
import type { CalculatorResult } from "@/lib/calculators/engine";

const gradeColor: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  B: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  C: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  D: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  F: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function ReportCard({ result }: { result: CalculatorResult }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-sm font-bold text-gray-900 dark:text-white">Your Score</h1>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={`text-xs font-bold px-2 py-0.5 ${gradeColor[result.grade] || "bg-gray-100 text-gray-700"}`}
        >
          {result.grade}
        </motion.span>
        <span className="text-xs text-gray-500">{result.percentage}% · {result.overallScore}/{result.maxScore}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {result.categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
            className="border border-gray-200 dark:border-gray-800 px-3 py-2 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151]"
          >
            <p className="text-[10px] tracking-wider uppercase text-gray-500 dark:text-gray-400">{cat.label}</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{cat.percentage}%</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
