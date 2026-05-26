"use client";

import { motion } from "framer-motion";
import type { CalculatorResult } from "@/lib/calculators/engine";

const gradeConfig: Record<string, { color: string; label: string; summary: string }> = {
  A: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", label: "Excellent", summary: "Tight ship. Keep it documented." },
  B: { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", label: "Solid", summary: "Strong. A few edges to sharpen." },
  C: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", label: "Fragile", summary: "Cracks showing. Some are costing you." },
  D: { color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400", label: "At Risk", summary: "Fix these before they become incidents." },
  F: { color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", label: "Critical", summary: "Bleeding money or trust. Act now." },
};

function blockColor(pct: number): string {
  if (pct >= 75) return "bg-emerald-500";
  if (pct >= 55) return "bg-amber-500";
  if (pct >= 35) return "bg-orange-500";
  return "bg-red-500";
}

function sev(pct: number): { label: string; badge: string } {
  if (pct >= 75) return { label: "Healthy", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" };
  if (pct >= 55) return { label: "Needs work", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
  if (pct >= 35) return { label: "At risk", badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" };
  return { label: "Critical", badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
}

const worstCategoryMessages: Record<string, string> = {
  cost: "Unchecked cloud costs leak 20–35% of your bill into idle resources and over-provisioned instances.",
  security: "A breach at this level goes undiscovered for weeks on average — and costs 6 figures to clean up.",
  reliability: "Every hour of downtime costs mid-size companies $260K. Without a recovery plan, that number gets ugly fast.",
  monitoring: "If users find outages before you do, you're losing trust with every incident. Silent failures are the most expensive kind.",
  foundation: "If users can't sign up smoothly, you're losing 10–15% of potential users before they even see your product.",
  experience: "60% of traffic is mobile. If your app feels broken on a phone, you're invisible to more than half your audience.",
  growth: "Invisible apps don't grow. If you can't be found or measured, you can't be improved.",
  quality: "Every untested deploy is a future incident waiting for the worst possible moment to strike.",
  speed: "Slow deploys compound into slow companies. Every extra day in the pipeline is a day competitors ship features your users don't have.",
  quality_gates: "Without quality gates, you're shipping known-broken code. It's not 'if' it becomes an incident — it's 'when.'",
  observability: "No audit trail = no ability to answer 'what broke?' after an incident. You're flying blind.",
  process: "Single-point-of-failure engineers put your entire pipeline at risk. If only one person can deploy, you're one resignation away from chaos.",
};

function getWorstCategory(result: CalculatorResult) {
  return result.categories.reduce((a, b) => (a.percentage < b.percentage ? a : b));
}

function Blocks({ pct, size }: { pct: number; size: "sm" | "lg" }) {
  const total = 10;
  const filled = Math.round((pct / 100) * total);
  const sq = size === "lg" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.02 * i }}
          className={`${sq} shrink-0 ${i < filled ? blockColor(pct) : "bg-gray-200 dark:bg-gray-800"}`}
        />
      ))}
    </div>
  );
}

export function ReportCard({ result }: { result: CalculatorResult }) {
  const g = gradeConfig[result.grade] || gradeConfig.F;
  const worst = getWorstCategory(result);
  const atRiskCount = result.categories.filter((c) => c.percentage < 75).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center h-full gap-5"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={`text-base font-bold px-2 py-0.5 ${g.color}`}
          >
            {result.grade}
          </motion.span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{g.label}</span>
          <span className="text-sm text-gray-400">· {result.percentage}%</span>
        </div>

        <div className="mb-1">
          <Blocks pct={result.percentage} size="lg" />
        </div>

        <p className="text-[10px] text-gray-400 dark:text-gray-500">
          {atRiskCount > 0 ? `${atRiskCount} of ${result.categories.length} categories need attention` : "All categories look healthy"} · {result.overallScore}/{result.maxScore}
        </p>
      </div>

      <div className="space-y-2">
        {result.categories.map((cat, i) => {
          const s = sev(cat.percentage);
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.04 * i }}
            >
              <div className="flex items-center mb-1">
                <span className="text-xs font-bold text-gray-900 dark:text-white">{cat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Blocks pct={cat.percentage} size="sm" />
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 shrink-0 ${s.badge}`}>{cat.percentage}% · {s.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-800 pt-3">
        {worstCategoryMessages[worst.id] || g.summary}
      </p>
    </motion.div>
  );
}
