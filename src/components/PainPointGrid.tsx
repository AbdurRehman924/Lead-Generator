"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  id: string;
  label: string;
  tech: string;
  depth: number;
  parent: number | null;
}

const items: Item[] = [
  { id: "idea", label: "Idea", tech: "", depth: 1, parent: null },
  { id: "plan", label: "Plan", tech: "Jira, Linear", depth: 1, parent: null },
  { id: "design", label: "Design", tech: "Figma, Lucidchart", depth: 1, parent: null },
  { id: "code", label: "Code", tech: "Git, GitHub, VS Code", depth: 1, parent: null },
  { id: "review", label: "Review", tech: "PRs, CodeRabbit", depth: 1, parent: null },
  { id: "build", label: "Build", tech: "GitHub Actions, Docker", depth: 1, parent: null },
  { id: "test", label: "Test", tech: "Jest, Playwright, k6", depth: 1, parent: null },
  { id: "scan", label: "Scan", tech: "Trivy, Snyk, SonarQube", depth: 1, parent: null },
  { id: "registry", label: "Registry", tech: "GHCR, Docker Hub, ECR", depth: 1, parent: null },
  { id: "staging", label: "Staging", tech: "K8s, Terraform, Helm", depth: 1, parent: null },
  { id: "release", label: "Release", tech: "ArgoCD, GitOps", depth: 1, parent: null },
  { id: "deploy", label: "Deploy", tech: "ECS, K8s, CloudFormation", depth: 1, parent: null },
  { id: "verify", label: "Verify", tech: "Datadog, Sentry, PagerDuty", depth: 1, parent: null },
  { id: "rollback", label: "Rollback", tech: "Blue/Green, Canary", depth: 1, parent: null },
  { id: "monitor", label: "Monitor", tech: "Prometheus, Grafana", depth: 1, parent: null },
  { id: "alert", label: "Alert", tech: "PagerDuty, Opsgenie", depth: 1, parent: null },
  { id: "incident", label: "Incident", tech: "Runbooks, Statuspage", depth: 1, parent: null },
  { id: "backup", label: "Backup", tech: "Velero, RDS Snapshot", depth: 1, parent: null },
  { id: "cost", label: "Cost", tech: "AWS Budgets, Infracost", depth: 1, parent: null },
  { id: "secure", label: "Secure", tech: "GuardDuty, WAF, IAM", depth: 1, parent: null },
  { id: "compliance", label: "Compliance", tech: "SOC2, HIPAA, Config", depth: 1, parent: null },
  { id: "seo", label: "SEO", tech: "Lighthouse, Schema.org", depth: 1, parent: null },
  { id: "analytics", label: "Analytics", tech: "GA, Plausible, Mixpanel", depth: 1, parent: null },
];

const groups = [
  { label: "DevOps Pipeline", start: 0, end: 8 },
  { label: "Delivery", start: 8, end: 14 },
  { label: "Operations", start: 14, end: 23 },
];

export function PainPointGrid() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0, 1, 2]));
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleItem = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleGroup = (idx: number) => {
    const next = new Set(expanded);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setExpanded(next);
  };

  const textClr = dark ? "#60a5fa" : "#2563eb";
  const selTextClr = dark ? "#f87171" : "#dc2626";
  const lineClr = dark ? "#374151" : "#d1d5db";

  const pipe = (
    <span className={`text-xs font-mono select-none ${dark ? "text-gray-600" : "text-gray-300"}`}>│</span>
  );

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-6 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151]">
      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
        Identify your <span className="text-red-500 dark:text-red-400">painpoints</span>
      </h2>
      <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Click the stages where you have pain points
      </h3>

      <div
        className={`font-mono text-xs leading-loose overflow-x-auto ${dark ? "bg-gray-900" : "bg-gray-100"}`}
        style={{
          maxHeight: "340px",
          minHeight: "200px",
          overflowY: "scroll",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 8px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 8px), transparent 100%)",
        }}
      >
        <div className={`flex items-center px-2 py-1 mb-2 border-b ${dark ? "border-gray-800 text-gray-300" : "border-gray-200 text-gray-700"}`}>
          <span className="font-bold tracking-wider">▼ Supply Chain</span>
        </div>
        <div className="pb-2">

        {groups.map((g, gi) => {
          const isOpen = expanded.has(gi);
          const groupSelection = items.slice(g.start, g.end).filter((it) => selected.has(it.id)).length;
          const isLastGroup = gi === groups.length - 1;
          return (
            <div key={gi}>
              <div className="flex">
                <div className="flex flex-col items-center" style={{ width: "1.2rem" }}>
                  <span className={`text-xs font-mono select-none ${dark ? "text-gray-600" : "text-gray-300"}`}>
                    {isLastGroup ? "└" : "├"}
                  </span>
                </div>
                <button
                  onClick={() => toggleGroup(gi)}
                  className="flex items-center gap-2 px-1 py-1 w-full text-left hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                >
                  <span className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
                    {isOpen ? "▼" : "▶"}
                  </span>
                  <span className={`text-xs font-bold tracking-wider ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {g.label}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 ${dark ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"} ${groupSelection > 0 ? "" : "invisible"}`}>
                    {groupSelection || 0}
                  </span>
                </button>
              </div>

              {isOpen && (
                <div>
                  {items.slice(g.start, g.end).map((it, i, arr) => {
                    const isLastItem = i === arr.length - 1;
                    const isSel = selected.has(it.id);
                    return (
                      <button
                        key={it.id}
                        onClick={() => toggleItem(it.id)}
                        className="flex items-center w-full text-left hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                        style={{ paddingLeft: "1.2rem" }}
                      >
                        <span className={`w-4 text-sm font-mono select-none flex-shrink-0 ${dark ? "text-gray-600" : "text-gray-300"}`}>
                          {isLastGroup ? "" : pipe}
                        </span>
                        <span className={`w-4 text-sm font-mono select-none flex-shrink-0 ${dark ? "text-gray-600" : "text-gray-300"}`}>
                          {isLastItem ? "└─" : "├─"}
                        </span>
                        <span
                          className="text-sm font-bold tracking-wider transition-colors py-1 flex-shrink-0"
                          style={{ color: isSel ? selTextClr : textClr }}
                        >
                          {it.label}
                        </span>
                        {it.tech && (
                          <span className={`text-[10px] ml-2 truncate ${dark ? "text-gray-600" : "text-gray-400"}`}>
                            {it.tech}
                          </span>
                        )}
                        {isSel && (
                          <span className={`text-[10px] ml-auto flex-shrink-0 ${dark ? "text-red-400" : "text-red-500"}`}>✕</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>

      <div className="text-center mt-5">
        <Link
          href={`/assess${selected.size > 0 ? `?pains=${Array.from(selected).join(",")}` : ""}`}
          className="group block w-full text-center text-xs tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
        >
          Analyze My Pain Points <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
