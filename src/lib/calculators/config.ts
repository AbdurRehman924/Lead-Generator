interface Question {
  id: string;
  label: string;
  options: { label: string; value: string; score: number }[];
}

interface Category {
  id: string;
  label: string;
}

export interface CalculatorConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  questions: Question[];
  categories: Category[];
}

export const calculators: Record<string, CalculatorConfig> = {
  cloud: {
    id: "cloud",
    name: "Cloud Mathematician",
    tagline: "Your cloud bill is probably higher than it should be. Let's find where.",
    description: "8 questions to find where your cloud spend is quietly leaking, your security has gaps you haven't noticed, and your infrastructure is one outage away from costing you users.",
    categories: [
      { id: "cost", label: "Cost Control" },
      { id: "security", label: "Security" },
      { id: "reliability", label: "Reliability" },
      { id: "monitoring", label: "Visibility" },
    ],
    questions: [
      {
        id: "surprise_bills",
        label: "Are you paying for cloud services you stopped using months ago?",
        options: [
          { label: "No — we audit regularly", value: "audit", score: 5 },
          { label: "Probably, but it's not much", value: "some", score: 3 },
          { label: "Yes — I'm sure there's waste", value: "yes",     score: 0 },
          { label: "I have no idea", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "cloud_waste",
        label: "When's the last time you checked if your tech spending is leaking money?",
        options: [
          { label: "This month", value: "month", score: 5 },
          { label: "This quarter", value: "quarter", score: 3 },
          { label: "Last year", value: "year",     score: 0 },
          { label: "Never — I don't track it closely", value: "never",     score: -1 },
        ],
      },
      {
        id: "breach_detection",
        label: "If your systems went down today, how long before you'd lose a customer?",
        options: [
          { label: "Minutes — we have redundancies", value: "minutes", score: 5 },
          { label: "An hour or so", value: "hour", score: 3 },
          { label: "A few hours", value: "hours",     score: 0 },
          { label: "A day or more — and that scares me", value: "day",     score: 0 },
          { label: "I honestly don't know", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "s3_visibility",
        label: "Do you actually know if your customer data is safe right now?",
        options: [
          { label: "Yes — we have strong security", value: "yes", score: 5 },
          { label: "I'm fairly confident", value: "confident", score: 3 },
          { label: "I hope so, but I'm not sure", value: "unsure",     score: 0 },
          { label: "I have no idea", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "recovery_time",
        label: "Could your business keep running if your main system crashed tomorrow?",
        options: [
          { label: "Yes — full backup plan in place", value: "yes", score: 5 },
          { label: "Mostly — we'd manage", value: "mostly", score: 3 },
          { label: "It would be a mess", value: "mess",     score: 0 },
          { label: "We'd be dead in the water", value: "dead",     score: -1 },
        ],
      },
      {
        id: "backup_tested",
        label: "What happens to your data if someone accidentally deletes it — is it gone for good?",
        options: [
          { label: "No — we have backups we've tested", value: "tested", score: 5 },
          { label: "We have backups, never tested restore", value: "untested", score: 3 },
          { label: "We might have backups somewhere", value: "maybe",     score: 0 },
          { label: "I don't know — and that worries me", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "outage_discovery",
        label: "How many users have left because your website or app was too slow?",
        options: [
          { label: "None — we monitor performance", value: "none", score: 5 },
          { label: "A few, but we fixed it", value: "few", score: 3 },
          { label: "Probably some — I don't track it", value: "some",     score: 0 },
          { label: "I have no way of knowing", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "infra_visibility",
        label: "Do you have a clear picture of where your tech dollars are actually going?",
        options: [
          { label: "Yes — full visibility", value: "full", score: 5 },
          { label: "Mostly — I know the big items", value: "mostly", score: 3 },
          { label: "Roughly — there are blind spots", value: "rough",     score: 0 },
          { label: "Not really — it's a black box", value: "none",     score: -1 },
        ],
      },
    ],
  },

  fullstack: {
    id: "fullstack",
    name: "FullStack Alchemist",
    tagline: "The software you paid for — is it actually earning its keep?",
    description: "You invested in software to grow your business. Is it actually delivering — or is it costing you more in frustration, lost users, and wasted time than it's worth? 8 questions to find out.",
    categories: [
      { id: "foundation", label: "App Foundation" },
      { id: "experience", label: "User Experience" },
      { id: "growth", label: "Growth Readiness" },
      { id: "quality", label: "Code Quality" },
    ],
    questions: [
      {
        id: "onboarding_friction",
        label: "Can a new user (or your employee) figure this out without you explaining it first?",
        options: [
          { label: "Yes — it's intuitive", value: "smooth", score: 5 },
          { label: "Mostly, but some get stuck", value: "stuck", score: 3 },
          { label: "Someone usually has to walk them through it", value: "manual",     score: 0 },
          { label: "I haven't actually tested that", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "money_readiness",
        label: "Is your software actually doing what you paid for it to do?",
        options: [
          { label: "Yes — it delivers exactly what I expected", value: "yes", score: 5 },
          { label: "Mostly — but there are gaps", value: "mostly", score: 3 },
          { label: "Not really — it's missing key things", value: "no",     score: 0 },
          { label: "I'm not sure what it's supposed to do", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "user_complaints",
        label: "When was the last time someone told you it was too slow or annoying to use?",
        options: [
          { label: "Never — people seem happy", value: "never", score: 5 },
          { label: "Months ago", value: "months",     score: 3 },
          { label: "This month", value: "month",     score: 0 },
          { label: "This week", value: "week",     score: 0 },
          { label: "I don't ask — and nobody's volunteered", value: "dont_track",     score: -1 },
        ],
      },
      {
        id: "mobile_quality",
        label: "Does this software grow with your business, or does it hold you back as you scale?",
        options: [
          { label: "It scales with us — no issues", value: "scales", score: 5 },
          { label: "It works for now, but we're pushing limits", value: "straining", score: 3 },
          { label: "It's already struggling to keep up", value: "struggling",     score: 0 },
          { label: "I don't know how much more it can handle", value: "dont_know",     score: -1 },
        ],
      },
      {
        id: "search_visibility",
        label: "Does your software tell you what's working — or just dump numbers on you?",
        options: [
          { label: "Yes — clear insights, easy to understand", value: "clear", score: 5 },
          { label: "It gives me data, I figure out the rest", value: "data", score: 3 },
          { label: "It's just raw numbers with no context", value: "raw",     score: 0 },
          { label: "I don't get any reporting from it", value: "none",     score: -1 },
        ],
      },
      {
        id: "user_dropoff",
        label: "Do you know exactly where people get stuck and just give up using it?",
        options: [
          { label: "Yes — we track that and fix it", value: "yes", score: 5 },
          { label: "I have a rough idea", value: "rough", score: 3 },
          { label: "No, but I want to know", value: "want",     score: 0 },
          { label: "We don't track usage at all", value: "none",     score: -1 },
        ],
      },
      {
        id: "deploy_confidence",
        label: "Does every request for a new feature feel like starting from scratch?",
        options: [
          { label: "No — changes are quick and predictable", value: "quick", score: 5 },
          { label: "Sometimes — simple changes are fast", value: "sometimes", score: 3 },
          { label: "Yes — everything takes longer than expected", value: "slow",     score: 0 },
          { label: "I dread asking for changes at this point", value: "dread",     score: -1 },
        ],
      },
      {
        id: "bug_resolution",
        label: "If it stopped working today, how long before it hurts your business?",
        options: [
          { label: "Hours — we'd catch it fast", value: "hours", score: 5 },
          { label: "A day — we'd manage", value: "day", score: 3 },
          { label: "A few days — it would be painful", value: "days",     score: 0 },
          { label: "I don't know — and that worries me", value: "dont_know",     score: -1 },
        ],
      },
    ],
  },

  pipeline: {
    id: "pipeline",
    name: "Pipeline Plumber",
    tagline: "Every change that takes too long or breaks something costs you money.",
    description: "Every time a change takes too long or breaks something, it costs you money and trust. 8 questions to find the bottlenecks slowing your business down.",
    categories: [
      { id: "speed", label: "Deployment Speed" },
      { id: "quality_gates", label: "Quality Gates" },
      { id: "observability", label: "Observability" },
      { id: "process", label: "Process & Docs" },
    ],
    questions: [
      {
        id: "time_to_prod",
        label: "How long does it actually take from 'we need this change' to 'it's live'?",
        options: [
          { label: "Hours — fast and smooth", value: "hours", score: 5 },
          { label: "A day or two", value: "days", score: 3 },
          { label: "A week or more", value: "week",     score: 0 },
          { label: "I don't actually measure it", value: "dont_measure",     score: -1 },
        ],
      },
      {
        id: "panic_deploy",
        label: "When was the last time a new update caused problems you had to scramble to fix?",
        options: [
          { label: "Never — updates are smooth", value: "never", score: 5 },
          { label: "Months ago", value: "months",     score: 3 },
          { label: "This month", value: "month",     score: 0 },
          { label: "This week", value: "week",     score: 0 },
          { label: "Every update feels like a gamble", value: "always",     score: -1 },
        ],
      },
      {
        id: "broken_test_block",
        label: "Can your team catch a mistake before it reaches your users — or does it slip through?",
        options: [
          { label: "Yes — automated checks catch everything", value: "blocked", score: 5 },
          { label: "Sometimes — manual review catches most", value: "manual_stop", score: 3 },
          { label: "Mistakes reach users regularly", value: "slips",     score: 0 },
          { label: "We don't have checks in place", value: "no_tests",     score: -1 },
        ],
      },
      {
        id: "rollback_speed",
        label: "If a new update breaks something, how fast can you undo it?",
        options: [
          { label: "Minutes — one-click rollback", value: "minutes", score: 5 },
          { label: "An hour or so", value: "hour", score: 3 },
          { label: "Half a day — we need to figure things out first", value: "half_day",     score: 0 },
          { label: "We don't have a way to undo", value: "none",     score: -1 },
        ],
      },
      {
        id: "deploy_health",
        label: "After a change goes live, how do you actually know it's working?",
        options: [
          { label: "Automated checks confirm it immediately", value: "auto", score: 5 },
          { label: "I check in manually", value: "manual", score: 3 },
          { label: "I wait to see if anyone complains", value: "wait",     score: 0 },
          { label: "I don't check — I assume it's fine", value: "ignore",     score: -1 },
        ],
      },
      {
        id: "deploy_audit",
        label: "If something went wrong last week, could you trace back who did what and when?",
        options: [
          { label: "Yes — everything is logged and clear", value: "full", score: 5 },
          { label: "Mostly — I could piece it together", value: "most", score: 3 },
          { label: "Not really — it would be messy", value: "messy",     score: 0 },
          { label: "We don't track changes at all", value: "none",     score: -1 },
        ],
      },
      {
        id: "bus_factor",
        label: "If the person who knows the system best left tomorrow, would you be stuck?",
        options: [
          { label: "No — everything is documented and shared", value: "shared", score: 5 },
          { label: "Mostly — others could figure it out", value: "mostly", score: 3 },
          { label: "It would be rough", value: "rough",     score: 0 },
          { label: "Yes — only one person knows how things work", value: "one",     score: -1 },
        ],
      },
      {
        id: "manual_steps",
        label: "How many people and steps are needed just to push a simple change live?",
        options: [
          { label: "One person, few clicks — fully automated", value: "zero", score: 5 },
          { label: "One or two people, a few steps", value: "low", score: 3 },
          { label: "Several people and approvals", value: "medium",     score: 0 },
          { label: "I'm not sure — it's different every time", value: "dont_know",     score: -1 },
        ],
      },
    ],
  },
};
