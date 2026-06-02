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
    name: "Cloud Audit",
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
    name: "Fullstack Audit",
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

  frontend: {
    id: "frontend",
    name: "Frontend Health Check",
    tagline: "Is your frontend costing you users? Slow pages and broken UI drive people away before they even see what you offer.",
    description: "8 questions to find out if your frontend is fast, reliable, and converting visitors — or quietly bleeding your audience.",
    categories: [
      { id: "performance", label: "Performance" },
      { id: "ux", label: "User Experience" },
      { id: "quality", label: "Code Quality" },
      { id: "infrastructure", label: "Infrastructure" },
    ],
    questions: [
      {
        id: "load_time",
        label: "How fast does your main page actually load on a mobile browser — not your office Wi-Fi?",
        options: [
          { label: "Under 2 seconds — feels instant", value: "fast", score: 5 },
          { label: "2-4 seconds — acceptable", value: "ok", score: 3 },
          { label: "5+ seconds — people are waiting", value: "slow", score: 0 },
          { label: "I haven't actually tested it", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "ui_consistency",
        label: "Does your UI behave consistently across browsers and devices — or does it break on some screens?",
        options: [
          { label: "Consistent everywhere — tested regularly", value: "consistent", score: 5 },
          { label: "Mostly — some edge cases", value: "mostly", score: 3 },
          { label: "It breaks on certain devices regularly", value: "broken", score: 0 },
          { label: "I don't test across devices", value: "dont_test", score: -1 },
        ],
      },
      {
        id: "accessibility",
        label: "Can someone with impaired vision or motor disabilities actually use your site?",
        options: [
          { label: "Yes — we follow WCAG standards", value: "compliant", score: 5 },
          { label: "Partially — we've done basic checks", value: "partial", score: 3 },
          { label: "Probably not — never checked", value: "no", score: 0 },
          { label: "I don't know what WCAG is", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "build_deploy",
        label: "When you make a frontend change, how long from commit to users seeing it live?",
        options: [
          { label: "Minutes — automated deploy", value: "minutes", score: 5 },
          { label: "Hours — semi-automated", value: "hours", score: 3 },
          { label: "Days — manual process", value: "days", score: 0 },
          { label: "I don't track it — it varies", value: "dont_track", score: -1 },
        ],
      },
      {
        id: "error_monitoring",
        label: "Do you know immediately when your site breaks for a user — or do you find out when they complain?",
        options: [
          { label: "Real-time error alerts", value: "real_time", score: 5 },
          { label: "We check logs manually", value: "manual", score: 3 },
          { label: "Users tell us — eventually", value: "reactive", score: 0 },
          { label: "No monitoring at all", value: "none", score: -1 },
        ],
      },
      {
        id: "third_party_deps",
        label: "How many third-party scripts (analytics, ads, tracking) load on your site — and do you know what they cost in performance?",
        options: [
          { label: "Fewer than 5 — we audit regularly", value: "lean", score: 5 },
          { label: "5-10 — we know what they do", value: "moderate", score: 3 },
          { label: "10+ — they pile up over time", value: "heavy", score: 0 },
          { label: "I have no idea what's loading", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "responsive_quality",
        label: "Does your site work properly on mobile — or do you lose users because text is tiny and buttons don't tap?",
        options: [
          { label: "Full responsive — works on any screen", value: "responsive", score: 5 },
          { label: "Mostly — some pages have issues", value: "mostly", score: 3 },
          { label: "It's desktop-only, mobile is broken", value: "broken", score: 0 },
          { label: "I don't check mobile experience", value: "dont_check", score: -1 },
        ],
      },
      {
        id: "dev_velocity",
        label: "Can your team ship a new page or feature in days — or does every change take weeks of coordination?",
        options: [
          { label: "Days — components are reusable", value: "fast", score: 5 },
          { label: "A week or two — some friction", value: "moderate", score: 3 },
          { label: "Weeks — everything is custom", value: "slow", score: 0 },
          { label: "I don't know how long changes take", value: "dont_know", score: -1 },
        ],
      },
    ],
  },

  backend: {
    id: "backend",
    name: "Backend Resilience Audit",
    tagline: "Your frontend looks great — but is the backend a house of cards? One bad API response can take down the whole experience.",
    description: "8 questions to find out if your backend is reliable, secure, and built to scale — or one bad deploy away from a crisis.",
    categories: [
      { id: "api", label: "API Design" },
      { id: "data", label: "Data Management" },
      { id: "security", label: "Security" },
      { id: "scalability", label: "Scalability" },
    ],
    questions: [
      {
        id: "api_reliability",
        label: "When your frontend calls an API, how often does it fail — and do you know why?",
        options: [
          { label: "Rarely — we monitor error rates", value: "monitored", score: 5 },
          { label: "Occasionally — we fix as they come", value: "occasional", score: 3 },
          { label: "Regularly — it's a known problem", value: "frequent", score: 0 },
          { label: "I don't track API errors", value: "dont_track", score: -1 },
        ],
      },
      {
        id: "db_performance",
        label: "As your data grows, are your queries staying fast — or are pages starting to crawl?",
        options: [
          { label: "Fast — we monitor and optimise", value: "optimised", score: 5 },
          { label: "Still OK — slow queries exist but manageable", value: "manageable", score: 3 },
          { label: "Getting slow — no one's optimised yet", value: "degrading", score: 0 },
          { label: "I don't know how our DB is performing", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "data_security",
        label: "If your customer data was leaked today, would you know what was exposed — and how fast?",
        options: [
          { label: "Yes — encryption + audit logs + alerts", value: "secure", score: 5 },
          { label: "Mostly — we'd piece it together", value: "mostly", score: 3 },
          { label: "Not really — it would be a scramble", value: "scramble", score: 0 },
          { label: "I don't know what data we store or where", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "error_handling",
        label: "When something goes wrong on the server, does the system tell you — or does the user just see a blank screen?",
        options: [
          { label: "Alerts + logs — we know instantly", value: "alerted", score: 5 },
          { label: "We check logs when something feels off", value: "reactive", score: 3 },
          { label: "Users report it — if they bother", value: "user", score: 0 },
          { label: "No error tracking at all", value: "none", score: -1 },
        ],
      },
      {
        id: "scaling_plan",
        label: "If your traffic doubled overnight, would your backend handle it — or would you be scrambling?",
        options: [
          { label: "Handles it — auto-scaling in place", value: "auto", score: 5 },
          { label: "Probably — we have some headroom", value: "headroom", score: 3 },
          { label: "No — we'd need to urgently upgrade", value: "would_fail", score: 0 },
          { label: "I don't know what our limits are", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "api_docs",
        label: "If a new developer (or AI) needed to integrate with your backend, could they figure it out without asking anyone?",
        options: [
          { label: "Yes — documented and versioned", value: "documented", score: 5 },
          { label: "Some docs — incomplete but useful", value: "partial", score: 3 },
          { label: "No docs — tribal knowledge only", value: "tribal", score: 0 },
          { label: "I don't have an API — it's all coupled", value: "none", score: -1 },
        ],
      },
      {
        id: "dependency_risk",
        label: "How many of your backend services or libraries are outdated or no longer maintained?",
        options: [
          { label: "None — we update regularly", value: "updated", score: 5 },
          { label: "A few — we know about them", value: "aware", score: 3 },
          { label: "Several — updating feels risky", value: "outdated", score: 0 },
          { label: "I have no inventory of dependencies", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "incident_response",
        label: "When the backend goes down, how fast can you get it back — and do you know why it happened?",
        options: [
          { label: "Minutes — runbook + rollback ready", value: "fast", score: 5 },
          { label: "Within an hour — we figure it out", value: "hour", score: 3 },
          { label: "Half a day or more — it's chaotic", value: "slow", score: 0 },
          { label: "We've never stress-tested recovery", value: "never", score: -1 },
        ],
      },
    ],
  },

  crm: {
    id: "crm",
    name: "CRM Health Score",
    tagline: "Your CRM should be your best salesperson. Is it actually helping you close deals — or is it just an expensive address book?",
    description: "8 questions to find out if your CRM is driving revenue — or if leads are falling through the cracks without you noticing.",
    categories: [
      { id: "lead_mgmt", label: "Lead Management" },
      { id: "pipeline", label: "Sales Pipeline" },
      { id: "data_quality", label: "Data Quality" },
      { id: "automation", label: "Automation" },
    ],
    questions: [
      {
        id: "lead_capture",
        label: "When a new lead comes in, is it captured automatically — or does someone have to manually enter it?",
        options: [
          { label: "Automatic — forms feed directly in", value: "auto", score: 5 },
          { label: "Semi-automatic — email forwards to CRM", value: "semi", score: 3 },
          { label: "Manual entry — someone types it in", value: "manual", score: 0 },
          { label: "Leads come through email and spreadsheets", value: "ad_hoc", score: -1 },
        ],
      },
      {
        id: "follow_up",
        label: "How quickly does your team follow up on a new lead — and do you track whether they actually do?",
        options: [
          { label: "Within minutes — automated assignment", value: "instant", score: 5 },
          { label: "Within hours — team checks regularly", value: "hours", score: 3 },
          { label: "Within days — if someone remembers", value: "days", score: 0 },
          { label: "I don't track follow-up at all", value: "dont_track", score: -1 },
        ],
      },
      {
        id: "data_hygiene",
        label: "Is your CRM data clean and up-to-date — or do you have duplicates, outdated contacts, and bad numbers?",
        options: [
          { label: "Clean — dedup rules + regular audits", value: "clean", score: 5 },
          { label: "Decent — occasional cleanup by hand", value: "decent", score: 3 },
          { label: "Messy — duplicates and bad data everywhere", value: "messy", score: 0 },
          { label: "I don't know what state our data is in", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "pipeline_visibility",
        label: "Can you see exactly where every deal is in your pipeline — or do you have to ask someone for a status update?",
        options: [
          { label: "Full pipeline view — always up to date", value: "visible", score: 5 },
          { label: "Partial — I can see most of it", value: "partial", score: 3 },
          { label: "I ask the team — they tell me verbally", value: "verbal", score: 0 },
          { label: "No pipeline tracking at all", value: "none", score: -1 },
        ],
      },
      {
        id: "automation",
        label: "How much of your sales process is automated — follow-ups, reminders, task creation, reporting?",
        options: [
          { label: "Mostly automated — minimal manual work", value: "mostly", score: 5 },
          { label: "Some — basic email automation works", value: "some", score: 3 },
          { label: "Very little — everything is manual", value: "manual", score: 0 },
          { label: "I don't know what's possible to automate", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "reporting",
        label: "Do you know which lead sources, campaigns, or sales activities actually bring in revenue — or are you guessing?",
        options: [
          { label: "Yes — source tracking + attribution", value: "tracked", score: 5 },
          { label: "Partially — we know some sources", value: "partial", score: 3 },
          { label: "Not really — it's mostly guesses", value: "guessing", score: 0 },
          { label: "No reporting at all", value: "none", score: -1 },
        ],
      },
      {
        id: "integration",
        label: "Does your CRM talk to your other tools (email, calendar, invoicing, ads) — or is it isolated?",
        options: [
          { label: "Fully integrated — seamless data flow", value: "integrated", score: 5 },
          { label: "Partially — some tools are connected", value: "partial", score: 3 },
          { label: "Manual — we copy data between systems", value: "manual", score: 0 },
          { label: "Not integrated at all — everything separate", value: "none", score: -1 },
        ],
      },
      {
        id: "adoption",
        label: "Does your team actually use the CRM every day — or do they work around it because it's clunky?",
        options: [
          { label: "Yes — it's their main daily tool", value: "adopted", score: 5 },
          { label: "Mostly — some prefer spreadsheets", value: "partial", score: 3 },
          { label: "Barely — it's just a contact list", value: "low", score: 0 },
          { label: "We bought it but no one uses it", value: "unused", score: -1 },
        ],
      },
    ],
  },

  pipeline: {
    id: "pipeline",
    name: "Software Delivery Audit",
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
        label: "Can a mistake be caught before it reaches your users — or does it slip through?",
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
        label: "How much of your deployment process depends on undocumented knowledge?",
        options: [
          { label: "No — everything is documented and shared", value: "shared", score: 5 },
          { label: "Mostly — others could figure it out", value: "mostly", score: 3 },
          { label: "It would be rough", value: "rough",     score: 0 },
          { label: "Yes — only one person knows how things work", value: "one",     score: -1 },
        ],
      },
      {
        id: "manual_steps",
        label: "How many steps does it take just to push a simple change live?",
        options: [
          { label: "One person, few clicks — fully automated", value: "zero", score: 5 },
          { label: "One or two people, a few steps", value: "low", score: 3 },
          { label: "Several people and approvals", value: "medium",     score: 0 },
          { label: "I'm not sure — it's different every time", value: "dont_know",     score: -1 },
        ],
      },
    ],
  },

  growth: {
    id: "growth",
    name: "Growth Capacity Scan",
    tagline: "Your business is growing. Is your tech going to keep up — or choke your revenue?",
    description: "Growing businesses outgrow their software faster than they expect. 8 questions to find out if your tech will scale with you — or quietly hold you back.",
    categories: [
      { id: "scaling", label: "Scaling Readiness" },
      { id: "performance", label: "Performance" },
      { id: "reliability", label: "Reliability" },
      { id: "agility", label: "Agility" },
    ],
    questions: [
      {
        id: "traffic_handling",
        label: "When you get an unexpected surge of users, does your software handle it — or does it slow down or crash?",
        options: [
          { label: "Handles it without breaking a sweat", value: "handles", score: 5 },
          { label: "Minor slowdowns, but stays up", value: "minor", score: 3 },
          { label: "It's crashed on us before", value: "crashed", score: 0 },
          { label: "I have no idea how it'd handle a surge", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "ship_speed",
        label: "If you needed to beat a competitor to market with a new feature, how fast could you ship it?",
        options: [
          { label: "Weeks — we move fast", value: "weeks", score: 5 },
          { label: "A month or two", value: "months", score: 3 },
          { label: "3-6 months — it's a slog", value: "slog", score: 0 },
          { label: "I don't know — it depends on too many things", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "team_focus",
        label: "How much of your team's energy goes to building new things vs. just keeping the lights on?",
        options: [
          { label: "Mostly building — we're ahead", value: "building", score: 5 },
          { label: "About even — half and half", value: "even", score: 3 },
          { label: "Mostly firefighting — barely keeping up", value: "firefighting", score: 0 },
          { label: "I don't actually track how our time is spent", value: "dont_track", score: -1 },
        ],
      },
      {
        id: "change_friction",
        label: "When's the last time an update or change broke something that actually cost you money?",
        options: [
          { label: "Never — changes are smooth and tested", value: "never", score: 5 },
          { label: "Months ago — rare but it happens", value: "months", score: 3 },
          { label: "This month — it's a recurring problem", value: "recent", score: 0 },
          { label: "This week — every change feels like a gamble", value: "always", score: -1 },
        ],
      },
      {
        id: "scale_limit",
        label: "Could your current setup handle 2x, 5x, or 10x your current users without a major rebuild?",
        options: [
          { label: "Yes — we're built to scale", value: "yes", score: 5 },
          { label: "2x yes, beyond that we'd need work", value: "partial", score: 3 },
          { label: "Probably not — we're near our limit", value: "no", score: 0 },
          { label: "I have no idea what our ceiling is", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "outage_confidence",
        label: "If a server failed or traffic spiked right now, would your software keep running — or would you lose money?",
        options: [
          { label: "Yes — fully redundant, tested regularly", value: "redundant", score: 5 },
          { label: "Mostly — some gaps but we'd manage", value: "mostly", score: 3 },
          { label: "I hope so, but I'm not confident", value: "unsure", score: 0 },
          { label: "It would probably go down — and that scares me", value: "would_fail", score: -1 },
        ],
      },
      {
        id: "codebase_complexity",
        label: "If a new developer joined today, how long before they'd be shipping meaningful changes?",
        options: [
          { label: "Days — well documented, clear codebase", value: "days", score: 5 },
          { label: "A week or two — they'd ramp up fast", value: "weeks", score: 3 },
          { label: "A month or more — it's complex", value: "months", score: 0 },
          { label: "I don't know — and that probably says enough", value: "dont_know", score: -1 },
        ],
      },
      {
        id: "performance_visibility",
        label: "Do you actually know how your software is performing right now — speed, errors, uptime — without someone telling you something's wrong?",
        options: [
          { label: "Yes — real-time dashboard, full visibility", value: "full", score: 5 },
          { label: "I check manually when I think about it", value: "manual", score: 3 },
          { label: "Only when users complain", value: "reactive", score: 0 },
          { label: "No visibility at all — it's a black box", value: "none", score: -1 },
        ],
      },
    ],
  },
};
