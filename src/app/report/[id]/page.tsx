"use client";

import { Suspense, useRef } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { calculators } from "@/lib/calculators/config";
import { calculateScore, type Answer } from "@/lib/calculators/engine";
import { ReportCard } from "@/components/calculators/ReportCard";

function ReportContent() {
  const { id } = useParams<{ id: string }>();
  const sp = useSearchParams();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const config = calculators[id];
  if (!config) notFound();

  const answers: Answer[] = config.questions.map((q) => ({
    questionId: q.id,
    value: sp.get(q.id) || "",
  }));

  const result = calculateScore(id, answers);

  const summaryText = `--- Infrastructure Health Check ---\nCalculator: ${config.name}\nGrade: ${result.grade} | Score: ${result.percentage}%\n\nCategory Breakdown:\n${result.categories.map((c) => `  ${c.label}: ${c.percentage}%`).join("\n")}\n\n--- What I Need ---\nI want Abdur Rehman to look at this and tell me:\n  1. Which of these is quietly costing us the most right now?\n  2. What's the one fix that buys the most breathing room?\n  3. How long before we actually start feeling the difference?\n\nNo pitch. No pressure. Just tell me where to start.`;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-16 pb-12">
        <ReportCard result={result} />

        <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-8">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            Your {config.name} Score
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Copy the summary, email it to me, and I&apos;ll reply within 24 hours with specific fixes — ranked by impact. Zero obligation.
          </p>

          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-mono">Copy this — and feel free to add any other issues you want fixed:</p>
          <div className="relative">
            <textarea
              ref={textRef}
              readOnly
              rows={7}
              className="w-full text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 resize-none"
              value={summaryText}
            />
            <button
              onClick={() => {
                textRef.current?.select();
                navigator.clipboard.writeText(summaryText);
              }}
              className="absolute top-2 right-2 text-[10px] sm:text-xs tracking-wider uppercase px-2 py-1 bg-blue-600 text-white cursor-pointer pixel-btn shadow-[2px_2px_0px_#1d4ed8] hover:shadow-[4px_4px_0px_#1d4ed8]"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-8">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            Here&apos;s what happens next
          </h2>
          <ol className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 space-y-2 list-decimal list-inside">
            <li>You email me the summary above at <a href="mailto:artariq.dev.1@gmail.com" className="text-blue-600 underline font-semibold">artariq.dev.1@gmail.com</a></li>
            <li>I review it within 24 hours</li>
            <li>I send back 3 specific fixes — ranked by impact</li>
            <li>You decide if you want my help implementing them</li>
          </ol>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            No cost. No commitment. Just an honest opinion from someone who spends their days fixing this stuff.
          </p>
          <a
            href={`mailto:artariq.dev.1@gmail.com?subject=${encodeURIComponent(`Infrastructure Analysis — ${config.name} (${result.grade})`)}&body=${encodeURIComponent(summaryText)}`}
            className="inline-block text-xs tracking-wider uppercase px-4 py-2 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8] cursor-pointer"
          >
            Email Me This →
          </a>
        </div>

        <Link
          href="/assess"
          className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Try another calculator
        </Link>
      </main>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 min-h-screen items-center justify-center"><p className="text-sm text-gray-500">Loading...</p></div>}>
      <ReportContent />
    </Suspense>
  );
}
