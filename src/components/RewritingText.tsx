"use client";

import { useEffect, useState } from "react";

const rewrites = [
  { from: "runaway AWS bills", to: "predictable, optimized costs" },
  { from: "broken deployments", to: "automated, reliable delivery" },
  { from: "security blind spots", to: "enforced at every layer" },
  { from: "manual provisioning", to: "infrastructure as code" },
  { from: "slow release cycles", to: "push to deploy in minutes" },
  { from: "no visibility", to: "full-stack observability" },
  { from: "configuration drift", to: "self-healing, always in sync" },
  { from: "untested backups", to: "restore-tested and verified" },
  { from: "SEO guesswork", to: "structured, crawlable, fast" },
  { from: "scaling bottlenecks", to: "elastic, production-ready" },
];

export function RewritingText() {
  const [i, setI] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [phase, setPhase] = useState<
    "typing-from" | "deleting-from" | "typing-to" | "hold"
  >("typing-from");

  useEffect(() => {
    const { from: f, to: t } = rewrites[i];

    if (phase === "typing-from") {
      if (from.length < f.length) {
        const timer = setTimeout(() => setFrom(f.slice(0, from.length + 1)), 50);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("deleting-from"), 900);
      return () => clearTimeout(timer);
    }

    if (phase === "deleting-from") {
      if (from.length > 0) {
        const timer = setTimeout(() => setFrom(from.slice(0, -1)), 30);
        return () => clearTimeout(timer);
      }
      setPhase("typing-to");
    }

    if (phase === "typing-to") {
      if (to.length < t.length) {
        const timer = setTimeout(() => setTo(t.slice(0, to.length + 1)), 50);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("hold"), 1800);
      return () => clearTimeout(timer);
    }

    if (phase === "hold") {
      setFrom("");
      setTo("");
      setI((n) => (n + 1) % rewrites.length);
      setPhase("typing-from");
    }
  }, [phase, from, to, i]);

  return (
    <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 block leading-relaxed">
      turning{" "}
      <span className="text-red-500 dark:text-red-400">
        {phase === "typing-from" || phase === "deleting-from" ? from : ""}
      </span>
      <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 align-middle animate-pulse" />
      {(phase === "typing-to" || phase === "hold") && (
        <> into{" "}<span className="text-emerald-600 dark:text-emerald-400">{to}</span></>
      )}
    </span>
  );
}
