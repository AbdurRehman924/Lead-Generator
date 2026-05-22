"use client";

import { useState } from "react";

export function EmailCapture({ calculatorName }: { calculatorName: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) return;
    setSent(true);
  };

  if (sent) return null;

  return (
    <div className="border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/10 p-5 shadow-[3px_3px_0px_#bfdbfe] dark:shadow-[3px_3px_0px_#1e3a5f] mb-8">
      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
        Get your report by email
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Enter your email and we&apos;ll send you the full {calculatorName} report with scores, analysis, and recommendations.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400"
        />
        <button
          onClick={submit}
          className="text-xs tracking-wider uppercase px-4 py-2 bg-blue-600 text-white pixel-btn shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
        >
          Send Report
        </button>
      </div>
    </div>
  );
}
