import { painLabelsBusiness, parentLabelsBusiness } from "./pain-points";

export function painPointsTemplate(pains: string[]): string {
  const grouped = new Map<string, string[]>();
  pains.forEach((id) => {
    const parent = parentLabelsBusiness[id] || "Other";
    if (!grouped.has(parent)) grouped.set(parent, []);
    grouped.get(parent)!.push(id);
  });
  const body = Array.from(grouped.entries())
    .map(([parent, ids]) => `${parent}\n${ids.map((id) => `  • ${painLabelsBusiness[id] || id}`).join("\n")}`)
    .join("\n\n");

  return `--- Infrastructure Pain Points ---\n\n${body}\n\n--- What I Need ---\nI want Abdur Rehman to look at this and tell me:\n  1. Which of these is quietly costing us the most right now?\n  2. What's the one fix that buys the most breathing room?\n  3. How long before we actually start feeling the difference?\n\nCome as you are. Leave with a direction.`;
}

export function reportTemplate(
  name: string,
  grade: string,
  percentage: number,
  categories: { label: string; percentage: number }[],
): string {
  const catLines = categories.map((c) => `  ${c.label}: ${c.percentage}%`).join("\n");

  return `--- Infrastructure Health Check ---\nCalculator: ${name}\nGrade: ${grade} | Score: ${percentage}%\n\nCategory Breakdown:\n${catLines}\n\n--- What I Need ---\nI want Abdur Rehman to look at this and tell me:\n  1. Which of these is quietly costing us the most right now?\n  2. What's the one fix that buys the most breathing room?\n  3. How long before we actually start feeling the difference?\n\nCome as you are. Leave with a direction.`;
}
