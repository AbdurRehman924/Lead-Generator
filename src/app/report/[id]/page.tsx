"use client";

import { Suspense, useRef } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { calculators } from "@/lib/calculators/config";
import { calculateScore, type Answer } from "@/lib/calculators/engine";
import { ReportCard } from "@/components/calculators/ReportCard";
import { reportTemplate } from "@/lib/email-templates";
import { siteConfig } from "@/lib/metadata";

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

  const summaryText = reportTemplate(config.name, result.grade, result.percentage, result.categories);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="h-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
            <ReportCard result={result} />
          </div>

          <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
              Your {config.name} Score
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Copy the summary, email it to me, and I&apos;ll reply within 24 hours with specific fixes — ranked by impact. Zero obligation.
            </p>

            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-mono">Copy this — and feel free to add any other issues you want fixed:</p>
            <div>
              <textarea
                ref={textRef}
                readOnly
                rows={10}
                className="w-full text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 resize-none"
                value={summaryText}
              />
              <button
                onClick={() => {
                  textRef.current?.select();
                  navigator.clipboard.writeText(summaryText);
                }}
                className="mt-2 text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1.5 bg-blue-600 text-white cursor-pointer pixel-btn shadow-[2px_2px_0px_#1d4ed8] hover:shadow-[4px_4px_0px_#1d4ed8]"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] flex flex-col">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              Here&apos;s what happens next
            </h2>
            <ol className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 space-y-2 list-decimal list-inside flex-1">
              <li>You email me the summary above at <a href={`mailto:${siteConfig.email}`} className="text-blue-600 underline font-semibold">{siteConfig.email}</a></li>
              <li>I review it within 24 hours</li>
              <li>I send back 3 specific fixes — ranked by impact</li>
              <li>You decide if you want my help implementing them</li>
            </ol>

            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Infrastructure Analysis — ${config.name} (${result.grade})`)}&body=${encodeURIComponent(summaryText)}`}
              className="inline-block text-xs tracking-wider uppercase px-4 py-2 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8] cursor-pointer self-start"
            >
              Email Me This →
            </a>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">Try another calculator</p>
            <div className="space-y-3">
              {Object.values(calculators)
                .filter((c) => c.id !== id)
                .map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/assess/${calc.id}`}
                    className="block bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 shadow-[2px_2px_0px_#e5e7eb] dark:shadow-[2px_2px_0px_#374151] hover:shadow-[4px_4px_0px_#bfdbfe] dark:hover:shadow-[4px_4px_0px_#1e3a5f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white">{calc.name}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{calc.tagline}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
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
