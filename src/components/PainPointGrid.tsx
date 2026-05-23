"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SubItem {
  id: string;
  label: string;
  tech: string;
  severity?: string;
}

interface PainGroup {
  id: string;
  label: string;
  description: string;
  children: SubItem[];
}

const groups: PainGroup[] = [
  {
    id: "monitoring",
    label: "You shouldn't hear about downtime from a customer",
    description: "Every minute you don't know, someone else is already complaining",
    children: [
      { id: "monitor", label: "We've been down for an hour before anyone on the team noticed", severity: "critical", tech: "Prometheus, Grafana" },
      { id: "incident", label: "When things break, the team panics — there's no playbook", severity: "critical", tech: "Runbooks, Statuspage" },
      { id: "alert", label: "Alerts either fire constantly or not at all — both are useless", severity: "warning", tech: "PagerDuty, Opsgenie" },
    ],
  },
  {
    id: "deploying",
    label: "Deploys that don't keep you up at night",
    description: "A release shouldn't require a war room and a prayer",
    children: [
      { id: "deploy", label: "Every deployment feels like pulling a pin on a grenade", severity: "critical", tech: "ECS, K8s, CloudFormation" },
      { id: "rollback", label: "The last bad release took 3 hours to undo — while users were affected", severity: "critical", tech: "Blue/Green, Canary" },
      { id: "verify", label: "After deploying, we just... assume it worked", severity: "warning", tech: "Datadog, Sentry, PagerDuty" },
    ],
  },
  {
    id: "security",
    label: "Protecting users — and your reputation",
    description: "You don't want to find out you were breached from a news article",
    children: [
      { id: "secure", label: "We wouldn't know if we'd been breached — until it's on Twitter", severity: "critical", tech: "GuardDuty, WAF, IAM" },
      { id: "compliance", label: "Enterprise clients ask for SOC2 proof — the deal dies there", severity: "critical", tech: "SOC2, HIPAA, Config" },
      { id: "scan", label: "We have no idea what security holes exist in our codebase right now", severity: "critical", tech: "Trivy, Snyk, SonarQube" },
    ],
  },
  {
    id: "shipping",
    label: "Getting features to users — fast and safely",
    description: "Shipping should feel boring, not like defusing a bomb",
    children: [
      { id: "release", label: "Every release needs the same person in the room or it doesn't happen", severity: "critical", tech: "ArgoCD, GitOps" },
      { id: "staging", label: "Staging is so broken we've stopped using it", severity: "critical", tech: "K8s, Terraform, Helm" },
      { id: "build", label: "Deploying a hotfix takes longer than writing it", severity: "warning", tech: "GitHub Actions, Docker" },
      { id: "registry", label: "Old builds disappear — we can't roll back to a known good version", severity: "warning", tech: "GHCR, Docker Hub, ECR" },
    ],
  },
  {
    id: "building",
    label: "Catching problems before users do",
    description: "If users find it first, you've already lost their trust",
    children: [
      { id: "test", label: "We test in production and hope for the best", severity: "critical", tech: "Jest, Playwright, k6" },
      { id: "bug", label: "The same bugs keep coming back — we fix symptoms, not causes", severity: "critical", tech: "Sentry, Linear" },
      { id: "ci", label: "CI pipelines are flaky — half the team just reruns until it passes", severity: "warning", tech: "GitHub Actions, CircleCI" },
    ],
  },
  {
    id: "performance",
    label: "Fast for users, not just on your laptop",
    description: "Slowness you can't explain is revenue you can't see leaving",
    children: [
      { id: "slow", label: "The app is sluggish under load and nobody knows where to start", severity: "critical", tech: "k6, Datadog, Lighthouse" },
      { id: "local", label: "Works perfectly locally — breaks in production every time", severity: "critical", tech: "Docker, Env Config" },
      { id: "cascade", label: "One slow third-party API call takes down the whole app", severity: "warning", tech: "Circuit Breakers, Timeouts" },
    ],
  },
  {
    id: "coding",
    label: "Code that doesn't come back to haunt you",
    description: "One person leaving shouldn't put the whole product at risk",
    children: [
      { id: "code", label: "The codebase is only safe when one specific person is online", severity: "critical", tech: "Git, GitHub, VS Code" },
      { id: "review", label: "Code gets merged because everyone's too busy to review it properly", severity: "warning", tech: "PRs, CodeRabbit" },
      { id: "debt", label: "Tech debt is so bad that new features break old ones constantly", severity: "warning", tech: "SonarQube, Refactoring" },
    ],
  },
  {
    id: "ops",
    label: "Data safety & cloud spend you can explain",
    description: "One bad day shouldn't erase everything you've built",
    children: [
      { id: "backup", label: "If the database died right now, we'd lose everything — and have no plan", severity: "critical", tech: "Velero, RDS Snapshot" },
      { id: "cost", label: "The AWS bill jumped 40% last month and nobody can explain it", severity: "critical", tech: "AWS Budgets, Infracost" },
      { id: "infra", label: "Infrastructure exists only in someone's memory — nothing is documented", severity: "warning", tech: "Terraform, Pulumi" },
    ],
  },
  {
    id: "team",
    label: "A team that can move without bottlenecks",
    description: "Velocity shouldn't depend on who's online today",
    children: [
      { id: "onboard", label: "A new developer takes weeks before they can ship anything", severity: "critical", tech: "Docs, Dev Containers" },
      { id: "knowledge", label: "Everything lives in one person's head — and they're burning out", severity: "critical", tech: "Notion, Confluence, Runbooks" },
      { id: "docs", label: "No documentation — we figure things out by reading old code", severity: "warning", tech: "Swagger, Storybook, Wikis" },
    ],
  },
  {
    id: "planning",
    label: "From idea to execution",
    description: "Good ideas are worthless without a system to ship them",
    children: [
      { id: "plan", label: "Nobody agrees on what's being built — until it's already built wrong", severity: "critical", tech: "Jira, Linear" },
      { id: "idea", label: "Great ideas keep dying in Slack threads and never get built", severity: "warning", tech: "" },
      { id: "design", label: "Every developer designs their own way — and it shows", severity: "warning", tech: "Figma, Lucidchart" },
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
      <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">
        Identify your <span className="text-green-600 dark:text-green-400">business</span> <span className="text-red-500 dark:text-red-400">painpoints</span>
      </h2>
      <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Find your problem below. It probably has a name — and a solution. These aren&apos;t just checkboxes. They&apos;re problems I&apos;ve already solved.
      </h3>

      <div
        className={`font-mono text-xs leading-loose overflow-x-auto flex-1 ${dark ? "bg-gray-900" : "bg-gray-100"}`}
        style={{
          maxHeight: "380px",
          overflowY: "auto",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 8px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 8px), transparent 100%)",
        }}
      >
        <div className={`flex items-center px-2 py-1 mb-2 border-b ${dark ? "border-gray-800 text-gray-300" : "border-gray-200 text-gray-700"}`}>
          <span className="font-bold tracking-wider">▼ Business Problems</span>
          <span className="ml-auto flex items-center gap-2 text-[9px]">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />critical</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />warning</span>
          </span>
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
                            {child.severity && (
                              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0 ${
                                child.severity === "critical" ? "bg-red-500" : "bg-amber-400"
                              }`} />
                            )}
                            <span
                              className={`text-xs sm:text-sm font-bold tracking-wider py-1 ${isSel ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}
                            >
                              {child.label}
                            </span>
                            {child.tech && (
                              <button
                                onClick={() => toggleSet(techOpen, setTechOpen, child.id)}
                                className={`ml-auto shrink-0 text-[10px] px-1 py-0.5 w-12 text-center border cursor-pointer transition-colors ${isTechOpen ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-500"}`}
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
          href={`/analyze?pains=${Array.from(selected).join(",")}`}
          className="group block w-full text-center text-xs tracking-wider uppercase px-5 py-2.5 bg-blue-600 text-white pixel-btn border border-blue-700 shadow-[3px_3px_0px_#1d4ed8] hover:shadow-[5px_5px_0px_#1d4ed8]"
        >
          Get My Free Analysis <span className="inline-block text-base transition-all duration-300 group-hover:scale-[2] group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
