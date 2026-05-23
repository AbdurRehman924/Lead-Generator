"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const painLabels: Record<string, string> = {
  idea: "Idea → Specifications",
  plan: "Plan → Tickets & sprints",
  design: "Design → Wireframes & mockups",
  code: "Code → Repos & branching",
  review: "Review → Code reviews & approvals",
  build: "Build → CI pipelines & containers",
  test: "Test → Unit, integration, E2E",
  scan: "Scan → Security & code quality",
  registry: "Registry → Image & artifact storage",
  staging: "Staging → Pre-prod environments",
  release: "Release → Automated promotions",
  deploy: "Deploy → Production releases",
  verify: "Verify → Post-deploy checks",
  rollback: "Rollback → Safe revert strategies",
  monitor: "Monitor → Metrics & dashboards",
  alert: "Alert → On-call notifications",
  incident: "Incident → Runbooks & status pages",
  backup: "Backup → Automated backups & restores",
  cost: "Cost → Budget tracking & optimization",
  secure: "Secure → Threat detection & WAF",
  compliance: "Compliance → Standards & auditing",
  seo: "SEO → Search optimization",
  analytics: "Analytics → User behavior & insights",
};

function AnalyzeContent() {
  const sp = useSearchParams();
  const pains = sp.get("pains")?.split(",").filter(Boolean) ?? [];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-16 pb-12">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Pain Points Summary
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Copy the paragraph below and email it to me for a free analysis.
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">Copy this:</p>
              <div className="relative">
                <textarea
                  readOnly
                  rows={8}
                  className="w-full text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 resize-none"
                  value={`I need help with the following infrastructure pain points:\n\n${pains.map((id) => `- ${painLabels[id] || id}`).join("\n")}\n\nI would like a professional analysis and recommendations for addressing these issues.`}
                />
                <button
                  onClick={() => {
                    const textarea = document.querySelector("textarea");
                    if (textarea) {
                      textarea.select();
                      navigator.clipboard.writeText(textarea.value);
                    }
                  }}
                  className="absolute top-2 right-2 text-[10px] sm:text-xs tracking-wider uppercase px-2 py-1 bg-blue-600 text-white pixel-btn shadow-[2px_2px_0px_#1d4ed8] hover:shadow-[4px_4px_0px_#1d4ed8] cursor-pointer"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-8">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2">
                Send me the analysis request
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Copy the paragraph above, then email it to{" "}
                <a href="mailto:artariq.dev.1@gmail.com" className="text-blue-600 underline font-semibold">
                  artariq.dev.1@gmail.com
                </a>
                . I&apos;ll review your pain points and reply with a tailored analysis and recommendations.
              </p>
              <a
                href={`mailto:artariq.dev.1@gmail.com?subject=Infrastructure Pain Points Analysis&body=${encodeURIComponent(`I need help with the following infrastructure pain points:\n\n${pains.map((id) => `- ${painLabels[id] || id}`).join("\n")}\n\nI would like a professional analysis and recommendations for addressing these issues.`)}`}
                className="inline-block text-xs sm:text-sm tracking-wider uppercase px-4 py-2 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8] cursor-pointer"
              >
                Open in Email →
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
