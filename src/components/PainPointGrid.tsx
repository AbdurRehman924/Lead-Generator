"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SubItem {
  id: string;
  label: string;
  tech: string;
}

interface PainGroup {
  id: string;
  label: string;
  description: string;
  children: SubItem[];
}

const groups: PainGroup[] = [
  {
    id: "planning",
    label: "Planning your project",
    description: "Ideas, roadmaps, and design docs",
    children: [
      { id: "idea", label: "Idea → Specifications", tech: "" },
      { id: "plan", label: "Plan → Tickets & sprints", tech: "Jira, Linear" },
      { id: "design", label: "Design → Wireframes & mockups", tech: "Figma, Lucidchart" },
    ],
  },
  {
    id: "coding",
    label: "Writing & reviewing code",
    description: "Version control, pull requests, code quality",
    children: [
      { id: "code", label: "Code → Repos & branching", tech: "Git, GitHub, VS Code" },
      { id: "review", label: "Review → Code reviews & approvals", tech: "PRs, CodeRabbit" },
    ],
  },
  {
    id: "building",
    label: "Building & testing",
    description: "Automated builds, tests, and security scans",
    children: [
      { id: "build", label: "Build → CI pipelines & containers", tech: "GitHub Actions, Docker" },
      { id: "test", label: "Test → Unit, integration, E2E", tech: "Jest, Playwright, k6" },
      { id: "scan", label: "Scan → Security & code quality", tech: "Trivy, Snyk, SonarQube" },
    ],
  },
  {
    id: "shipping",
    label: "Storing & releasing",
    description: "Container registries, staging, and release automation",
    children: [
      { id: "registry", label: "Registry → Image & artifact storage", tech: "GHCR, Docker Hub, ECR" },
      { id: "staging", label: "Staging → Pre-prod environments", tech: "K8s, Terraform, Helm" },
      { id: "release", label: "Release → Automated promotions", tech: "ArgoCD, GitOps" },
    ],
  },
  {
    id: "deploying",
    label: "Deploying & operating",
    description: "Deployments, verification, and rollbacks",
    children: [
      { id: "deploy", label: "Deploy → Production releases", tech: "ECS, K8s, CloudFormation" },
      { id: "verify", label: "Verify → Post-deploy checks", tech: "Datadog, Sentry, PagerDuty" },
      { id: "rollback", label: "Rollback → Safe revert strategies", tech: "Blue/Green, Canary" },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring & alerting",
    description: "Dashboards, alerts, and incident response",
    children: [
      { id: "monitor", label: "Monitor → Metrics & dashboards", tech: "Prometheus, Grafana" },
      { id: "alert", label: "Alert → On-call notifications", tech: "PagerDuty, Opsgenie" },
      { id: "incident", label: "Incident → Runbooks & status pages", tech: "Runbooks, Statuspage" },
    ],
  },
  {
    id: "ops",
    label: "Backups & costs",
    description: "Data protection and cloud spend",
    children: [
      { id: "backup", label: "Backup → Automated backups & restores", tech: "Velero, RDS Snapshot" },
      { id: "cost", label: "Cost → Budget tracking & optimization", tech: "AWS Budgets, Infracost" },
    ],
  },
  {
    id: "security",
    label: "Security & compliance",
    description: "Threat detection, governance, and audits",
    children: [
      { id: "secure", label: "Secure → Threat detection & WAF", tech: "GuardDuty, WAF, IAM" },
      { id: "compliance", label: "Compliance → Standards & auditing", tech: "SOC2, HIPAA, Config" },
    ],
  },
  {
    id: "growth",
    label: "Growth & visibility",
    description: "SEO, analytics, and user tracking",
    children: [
      { id: "seo", label: "SEO → Search optimization", tech: "Lighthouse, Schema.org" },
      { id: "analytics", label: "Analytics → User behavior & insights", tech: "GA, Plausible, Mixpanel" },
    ],
  },
];

export function PainPointGrid() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [techOpen, setTechOpen] = useState<Set<string>>(new Set());
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

  const toggleGroupSelect = (g: PainGroup) => {
    const next = new Set(selected);
    const ids = g.children.map((c) => c.id);
    const allSelected = ids.every((id) => next.has(id));
    ids.forEach((id) => allSelected ? next.delete(id) : next.add(id));
    setSelected(next);
  };

  const toggleSet = (set: Set<string>, setter: (s: Set<string>) => void, id: string) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  };

  const groupSelectionCount = (group: PainGroup) =>
    group.children.filter((c) => selected.has(c.id)).length;

  return (
    <div className="bg-white/70 dark:bg-gray-950/70 border border-gray-200 dark:border-gray-800 p-6 shadow-[3px_3px_0px_#e5e7eb] dark:shadow-[3px_3px_0px_#374151] h-full flex flex-col">
      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
        Identify your <span className="text-red-500 dark:text-red-400">painpoints</span>
      </h2>
      <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Click a stage name to select it. Expand (▼) to see details.
      </h3>

      <div
        className={`font-mono text-xs leading-loose overflow-x-auto ${dark ? "bg-gray-900" : "bg-gray-100"}`}
        style={{
          maxHeight: "380px",
          minHeight: "180px",
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
            const isOpen = expanded.has(g.id);
            const count = groupSelectionCount(g);
            const isLast = gi === groups.length - 1;
            return (
              <div key={g.id}>
                <div className="flex">
                  <div className="flex flex-col items-center" style={{ width: "1.2rem" }}>
                    <span className={`text-xs font-mono select-none ${dark ? "text-gray-600" : "text-gray-300"}`}>
                      {isLast ? "└" : "├"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 flex">
                    <button
                      onClick={() => toggleGroupSelect(g)}
                      className={`flex items-center gap-2 px-2 py-1 cursor-pointer transition-colors ${count > 0 ? "bg-red-50 dark:bg-red-900/20" : "hover:bg-blue-100 dark:hover:bg-blue-950"}`}
                    >
                      <span className={`w-3.5 h-3.5 flex items-center justify-center border text-[8px] font-bold ${count > 0 ? "bg-red-500 border-red-500 text-white" : "border-gray-400 dark:border-gray-500 text-transparent"}`}>
                        {count > 0 ? "✓" : ""}
                      </span>
                      <span className={`text-xs font-bold tracking-wider ${count > 0 ? "text-red-600 dark:text-red-400" : dark ? "text-gray-400" : "text-gray-500"}`}>
                        {g.label}
                      </span>
                    </button>
                    <button
                      onClick={() => toggleSet(expanded, setExpanded, g.id)}
                      className="shrink-0 w-6 flex items-center justify-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      <span className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div>
                    <div className="px-1 pb-1" style={{ paddingLeft: "1.2rem" }}>
                      <span className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>
                        {g.description}
                      </span>
                    </div>
                    {g.children.map((child, i, arr) => {
                      const isLastChild = i === arr.length - 1;
                      const isSel = selected.has(child.id);
                      const isTechOpen = techOpen.has(child.id);
                      return (
                        <div key={child.id}>
                          <div
                            className="flex items-center w-full"
                            style={{ paddingLeft: "1.2rem" }}
                          >
                            <span className={`w-4 text-sm font-mono select-none flex-shrink-0 ${dark ? "text-gray-600" : "text-gray-300"}`}>
                              {isLast ? "" : "│"}
                            </span>
                            <span className={`w-4 text-sm font-mono select-none flex-shrink-0 ${dark ? "text-gray-600" : "text-gray-300"}`}>
                              {isLastChild ? "└─" : "├─"}
                            </span>
                            <span
                              className={`text-xs sm:text-sm font-bold tracking-wider py-1 ${isSel ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}
                            >
                              {child.label}
                            </span>
                            {child.tech && (
                              <button
                                onClick={() => toggleSet(techOpen, setTechOpen, child.id)}
                                className={`ml-2 text-[10px] px-1 py-0.5 border cursor-pointer transition-colors ${isTechOpen ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-500"}`}
                              >
                                {isTechOpen ? "▲ tech" : "▼ tech"}
                              </button>
                            )}
                          </div>
                          {isTechOpen && child.tech && (
                            <div className="flex flex-wrap gap-1" style={{ paddingLeft: "2.4rem", paddingTop: "2px" }}>
                              {child.tech.split(",").map((t, i) => (
                                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                  {t.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-auto pt-4">
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
