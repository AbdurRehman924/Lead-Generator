"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const painLabels: Record<string, string> = {
  monitor: "We've been down for an hour before anyone on the team noticed",
  incident: "When things break, the team panics — there's no playbook",
  alert: "Alerts either fire constantly or not at all — both are useless",
  deploy: "Every deployment feels like pulling a pin on a grenade",
  rollback: "The last bad release took 3 hours to undo — while users were affected",
  verify: "After deploying, we just... assume it worked",
  secure: "We wouldn't know if we'd been breached — until it's on Twitter",
  compliance: "Enterprise clients ask for SOC2 proof — the deal dies there",
  scan: "We have no idea what security holes exist in our codebase right now",
  release: "Every release needs the same person in the room or it doesn't happen",
  staging: "Staging is so broken we've stopped using it",
  build: "Deploying a hotfix takes longer than writing it",
  registry: "Old builds disappear — we can't roll back to a known good version",
  test: "We test in production and hope for the best",
  bug: "The same bugs keep coming back — we fix symptoms, not causes",
  ci: "CI pipelines are flaky — half the team just reruns until it passes",
  slow: "The app is sluggish under load and nobody knows where to start",
  local: "Works perfectly locally — breaks in production every time",
  cascade: "One slow third-party API call takes down the whole app",
  code: "The codebase is only safe when one specific person is online",
  review: "Code gets merged because everyone's too busy to review it properly",
  debt: "Tech debt is so bad that new features break old ones constantly",
  backup: "If the database died right now, we'd lose everything — and have no plan",
  cost: "The AWS bill jumped 40% last month and nobody can explain it",
  infra: "Infrastructure exists only in someone's memory — nothing is documented",
  onboard: "A new developer takes weeks before they can ship anything",
  knowledge: "Everything lives in one person's head — and they're burning out",
  docs: "No documentation — we figure things out by reading old code",
  plan: "Nobody agrees on what's being built — until it's already built wrong",
  idea: "Great ideas keep dying in Slack threads and never get built",
  design: "Every developer designs their own way — and it shows",
};

const parentLabels: Record<string, string> = {
  monitor: "You shouldn't hear about downtime from a customer",
  incident: "You shouldn't hear about downtime from a customer",
  alert: "You shouldn't hear about downtime from a customer",
  deploy: "Deploys that don't keep you up at night",
  rollback: "Deploys that don't keep you up at night",
  verify: "Deploys that don't keep you up at night",
  secure: "Protecting users — and your reputation",
  compliance: "Protecting users — and your reputation",
  scan: "Protecting users — and your reputation",
  release: "Getting features to users — fast and safely",
  staging: "Getting features to users — fast and safely",
  build: "Getting features to users — fast and safely",
  registry: "Getting features to users — fast and safely",
  test: "Catching problems before users do",
  bug: "Catching problems before users do",
  ci: "Catching problems before users do",
  slow: "Fast for users, not just on your laptop",
  local: "Fast for users, not just on your laptop",
  cascade: "Fast for users, not just on your laptop",
  code: "Code that doesn't come back to haunt you",
  review: "Code that doesn't come back to haunt you",
  debt: "Code that doesn't come back to haunt you",
  backup: "Data safety & cloud spend you can explain",
  cost: "Data safety & cloud spend you can explain",
  infra: "Data safety & cloud spend you can explain",
  onboard: "A team that can move without bottlenecks",
  knowledge: "A team that can move without bottlenecks",
  docs: "A team that can move without bottlenecks",
  plan: "From idea to execution",
  idea: "From idea to execution",
  design: "From idea to execution",
};

function AnalyzeContent() {
  const sp = useSearchParams();
  const pains = sp.get("pains")?.split(",").filter(Boolean) ?? [];

  const grouped = new Map<string, string[]>();
  pains.forEach((id) => {
    const parent = parentLabels[id] || "Other";
    if (!grouped.has(parent)) grouped.set(parent, []);
    grouped.get(parent)!.push(id);
  });
  const summaryBody = Array.from(grouped.entries())
    .map(([parent, ids]) => `${parent}\n${ids.map((id) => `  • ${painLabels[id] || id}`).join("\n")}`)
    .join("\n\n");

  const fullTemplate = `--- Business Pain Points ---\n\n${summaryBody}\n\n--- What I Need ---\nI want Abdur Rehman to look at this and tell me:\n  1. Which of these is quietly costing us the most right now?\n  2. What's the one fix that buys the most breathing room?\n  3. How long before we actually start feeling the difference?\n\nNo pitch. No pressure. Just tell me where to start.`;

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
                  readOnly
                  rows={8}
                  className="w-full text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 resize-none"
                  value={fullTemplate}
                />
                <button
                  onClick={() => {
                    const textarea = document.querySelector("textarea");
                    if (textarea) {
                      textarea.select();
                      navigator.clipboard.writeText(fullTemplate);
                    }
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
