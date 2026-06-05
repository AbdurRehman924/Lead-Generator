"use client";

import { Suspense, useState } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { calculators } from "@/lib/calculators/config";
import { calculateScore, type Answer } from "@/lib/calculators/engine";
import { ReportCard } from "@/components/calculators/ReportCard";
import { reportTemplate } from "@/lib/email-templates";
import { siteConfig } from "@/lib/metadata";
import { STEPS } from "@/lib/steps";

function ReportContent() {
  const { id } = useParams<{ id: string }>();
  const sp = useSearchParams();

  const config = calculators[id];
  if (!config) notFound();

  const answers: Answer[] = config.questions.map((q) => ({
    questionId: q.id,
    value: sp.get(q.id) || "",
  }));

  const result = calculateScore(id, answers);
  const initialTemplate = reportTemplate(config.name, result.grade, result.percentage, result.categories);

  const [message, setMessage] = useState(initialTemplate);
  const [copied, setCopied] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [name, setName] = useState("");

  const emailBody = name ? `Hi Abdur Rehman,\n\nMy name is ${name}.\n\n${message}` : message;

  function handleCopy() {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Left — score card */}
          <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
            <ReportCard result={result} />
          </div>

          {/* Right — action panel */}
          <div className="flex flex-col gap-4">
            {/* Editable message */}
            <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{config.name} Score</h2>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3">
                Edit freely — add, remove, or describe any other business problem you want help with.
              </p>
              <div className="relative">
                <textarea
                  rows={9}
                  className="w-full text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 resize-none font-mono"
                  value={emailBody}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 text-[10px] tracking-wider uppercase px-2 py-1 bg-blue-600 text-white pixel-btn shadow-[2px_2px_0px_#1d4ed8] cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Name field */}
            <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5">
                Your name <span className="text-gray-400 font-normal normal-case tracking-normal">— so I know who to reply to</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Primary CTA */}
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`${config.name} — Grade ${result.grade} (${result.percentage}%)${name ? ` — ${name}` : ""}`)}&body=${encodeURIComponent(emailBody)}`}
              onClick={() => setEmailClicked(true)}
              className="block text-center text-xs tracking-wider uppercase px-5 py-3 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
            >
              Email Me This →
            </a>
            {emailClicked && (
              <p className="text-xs text-gray-900 dark:text-white font-semibold text-center border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900 mt-2">
                Your email client should have opened. If not, copy the message above and paste it manually.
              </p>
            )}

            {/* What happens next */}
            <div className="border border-gray-200 dark:border-gray-800 p-4 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">What happens next</h2>
              <ol className="space-y-2.5">
                {STEPS.map(({ n, text }) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900">{n}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Try another calculator */}
        <div className="mb-8">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Each audit covers a different area — your score here doesn&apos;t tell you what&apos;s happening in the others.</p>
          <Link href="/assess" className="text-xs text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            Try another evaluator →
          </Link>
        </div>

        <Link href="/" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          ← Back
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
