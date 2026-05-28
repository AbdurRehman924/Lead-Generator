"use client";

import { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { painPointsTemplate } from "@/lib/email-templates";

function AnalyzeContent() {
  const sp = useSearchParams();
  const pains = sp.get("pains")?.split(",").filter(Boolean) ?? [];
  const fullTemplate = painPointsTemplate(pains);
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-16 pb-12">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Your Pain Points Summary
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Here&apos;s a summary of what&apos;s hurting. Email it to me and I&apos;ll send back a prioritised action plan — which problem to tackle first, rough effort, and what a fix looks like.
        </p>

        {pains.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No pain points selected.{" "}
            <Link href="/" className="text-blue-600 underline">
              Go back and select some.
            </Link>
          </p>
        ) : (
          <>
            <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-6">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">Copy this — and feel free to add any other issues you want fixed:</p>
              <div className="relative">
                <textarea
                  ref={textRef}
                  readOnly
                  rows={8}
                  className="w-full text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 resize-none"
                  value={fullTemplate}
                />
                <button
                  onClick={() => {
                    textRef.current?.select();
                    navigator.clipboard.writeText(fullTemplate);
                  }}
                  className="absolute top-2 right-2 text-[10px] sm:text-xs tracking-wider uppercase px-2 py-1 bg-blue-600 text-white pixel-btn shadow-[2px_2px_0px_#1d4ed8] hover:shadow-[4px_4px_0px_#1d4ed8] cursor-pointer"
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
                No cost. No commitment.
              </p>
              <a
                href={`mailto:artariq.dev.1@gmail.com?subject=Infrastructure Pain Points Analysis&body=${encodeURIComponent(fullTemplate)}`}
                className="inline-block text-xs tracking-wider uppercase px-4 py-2 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8] cursor-pointer"
              >
                Email Me This →
              </a>
            </div>

            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Back to assessment
            </Link>
          </>
        )}
      </main>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={<div className="flex flex-1 min-h-screen items-center justify-center"><p className="text-sm text-gray-500">Loading...</p></div>}>
      <AnalyzeContent />
    </Suspense>
  );
}
