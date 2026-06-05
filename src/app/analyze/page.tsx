"use client";

import { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { painPointsTemplate } from "@/lib/email-templates";
import { painLabelsBusiness, parentLabelsBusiness } from "@/lib/pain-points";
import { siteConfig } from "@/lib/metadata";
import { STEPS } from "@/lib/steps";

function AnalyzeContent() {
  const sp = useSearchParams();
  const pains = sp.get("pains")?.split(",").filter(Boolean) ?? [];
  const fullTemplate = painPointsTemplate(pains);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState(fullTemplate);
  const [emailClicked, setEmailClicked] = useState(false);
  const [name, setName] = useState("");

  const emailBody = name ? `Hi Abdur Rehman,\n\nMy name is ${name}.\n\n${message}` : message;

  // Group selected pains by parent label
  const grouped = new Map<string, string[]>();
  pains.forEach((id) => {
    const parent = parentLabelsBusiness[id] || "Other";
    if (!grouped.has(parent)) grouped.set(parent, []);
    grouped.get(parent)!.push(id);
  });

  function handleCopy() {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-16 pb-12">
        {pains.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No problems selected.{" "}
            <Link href="/" className="text-blue-600 underline">Go back and select some.</Link>
          </p>
        ) : (
          <>
            {/* Confirmation header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                You flagged {pains.length} problem{pains.length !== 1 ? "s" : ""}.
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Email this over — no calls, no forms, no commitment.
              </p>
            </div>

            {/* Selected problems grouped */}
            <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-4">
              {Array.from(grouped.entries()).map(([parent, ids]) => (
                <div key={parent} className="mb-3 last:mb-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">{parent}</p>
                  <ul className="space-y-1">
                    {ids.map((id) => (
                      <li key={id} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <span className="text-red-500 mt-0.5">•</span>
                        {painLabelsBusiness[id] || id}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Name field */}
            <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-3">
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
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`${pains.length} problems flagged${name ? ` — ${name}` : ""}`)}&body=${encodeURIComponent(emailBody)}`}
              onClick={() => setEmailClicked(true)}
              className="block text-center text-xs tracking-wider uppercase px-5 py-3 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8] mb-2"
            >
              Email Me This →
            </a>
            {emailClicked && (
              <p className="text-xs text-gray-900 dark:text-white font-semibold text-center border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900 mb-3">
                Your email client should have opened. If not, copy the message below and paste it manually.
              </p>
            )}

            {/* Collapsible full message */}
            <div className="border border-gray-200 dark:border-gray-800 mb-6">
              <button
                onClick={() => setShowMessage((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold tracking-wider text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors text-left"
              >
                <span>
                  <span className="block">Preview the full message</span>
                  <span className="block text-[10px] font-normal normal-case tracking-normal text-gray-400 dark:text-gray-500">Edit freely — add, remove, or describe any other business problem you want help with.</span>
                </span>
                <span>{showMessage ? "▲" : "▼"}</span>
              </button>
              {showMessage && (
                <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="relative">
                    <textarea
                      ref={textRef}
                      rows={8}
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
              )}
            </div>

            {/* What happens next */}
            <div className="border border-gray-200 dark:border-gray-800 p-4 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] mb-8">
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

            {/* Secondary CTA + back */}
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                ← Back
              </Link>
              <Link href="/assess" className="text-xs text-gray-500 dark:text-gray-400 underline hover:text-blue-600 transition-colors">
                Want a scored report instead? →
              </Link>
            </div>
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
