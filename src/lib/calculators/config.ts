export interface Question {
  id: string;
  label: string;
  options: { label: string; value: string; score: number }[];
}

export interface Category {
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
    tagline: "What your cloud bill hides. What your monitoring misses. What keeps you up at night.",
    description: "8 questions that go straight to the places where AWS accounts quietly bleed money, security, and sleep. No fluff — just the gaps that cost you.",
    categories: [
      { id: "cost", label: "Cost Control" },
      { id: "security", label: "Security" },
      { id: "reliability", label: "Reliability" },
      { id: "monitoring", label: "Visibility" },
    ],
    questions: [
      {
        id: "surprise_bills",
        label: "When's the last time your AWS bill made you say 'wait, what'?",
        options: [
          { label: "This month", value: "month", score: 0 },
          { label: "This quarter", value: "quarter", score: 2 },
          { label: "Last year", value: "year", score: 3 },
          { label: "Never — our costs are predictable", value: "never", score: 5 },
          { label: "I don't check the bill closely", value: "dont_know", score: 1 },
        ],
      },
      {
        id: "cloud_waste",
        label: "How much of your cloud spend goes to things nobody uses anymore?",
        options: [
          { label: "We audit — it's always under 10%", value: "low", score: 5 },
          { label: "Probably 10—30%, we don't look often", value: "medium", score: 3 },
          { label: "I'd guess more than 30%", value: "high", score: 1 },
          { label: "I genuinely have no idea", value: "dont_know", score: 0 },
        ],
      },
      {
        id: "breach_detection",
        label: "If someone breached your AWS account right now, how long until you'd know?",
        options: [
          { label: "Minutes — automated detection in place", value: "minutes", score: 5 },
          { label: "Hours — alarms would fire", value: "hours", score: 3 },
          { label: "Days — we'd figure it out eventually", value: "days", score: 2 },
          { label: "Honestly? I might never know", value: "never", score: 0 },
        ],
      },
      {
        id: "s3_visibility",
        label: "Can you name every S3 bucket in your account and what's in them right now?",
        options: [
          { label: "Yes — I know every single one", value: "yes", score: 5 },
          { label: "I know the critical ones", value: "critical", score: 3 },
          { label: "There are probably some I've forgotten", value: "forgotten", score: 1 },
          { label: "I don't know how many buckets we have", value: "dont_know", score: 0 },
        ],
      },
      {
        id: "recovery_time",
        label: "How long would it take to get EVERYTHING back online after a total disaster?",
        options: [
          { label: "Under an hour — fully automated failover", value: "hour", score: 5 },
          { label: "A few hours — mostly automated", value: "hours", score: 4 },
          { label: "A day or two — some manual steps", value: "days", score: 2 },
          { label: "I honestly don't know — and that worries me", value: "dont_know", score: 1 },
          { label: "We don't have a recovery plan", value: "none", score: 0 },
        ],
      },
      {
        id: "backup_tested",
        label: "When was the last time you actually tested your backups by restoring from them?",
        options: [
          { label: "We test restore every month", value: "monthly", score: 5 },
          { label: "We tested once, a while ago", value: "once", score: 3 },
          { label: "We've never tested restoring", value: "never", score: 1 },
          { label: "We don't have automated backups yet", value: "none", score: 0 },
        ],
      },
      {
        id: "outage_discovery",
        label: "Who usually finds out first when something breaks — you or your users?",
        options: [
          { label: "My alerts fire before anyone notices", value: "alerts", score: 5 },
          { label: "I check dashboards — I'd see it within minutes", value: "dashboards", score: 3 },
          { label: "Users email me. Every time.", value: "users", score: 1 },
          { label: "Sometimes I don't know until hours later", value: "later", score: 0 },
        ],
      },
      {
        id: "infra_visibility",
        label: "Could you describe exactly what your infrastructure looked like last Tuesday at 3 PM?",
        options: [
          { label: "Yes — full observability with tracing", value: "full", score: 5 },
          { label: "Mostly — we have logs and dashboards", value: "mostly", score: 3 },
          { label: "Not really — we'd piece it together", value: "partial", score: 1 },
          { label: "I wouldn't know where to start", value: "dont_know", score: 0 },
        ],
      },
    ],
  },

  fullstack: {
    id: "fullstack",
    name: "FullStack Alchemist",
    tagline: "Your users notice the cracks before you do. Close them before they leave.",
    description: "Broken onboarding, invisible SEO, payments that don't work — these kill products quietly. 8 questions to surface the gaps your users already feel.",
    categories: [
      { id: "foundation", label: "App Foundation" },
      { id: "experience", label: "User Experience" },
      { id: "growth", label: "Growth Readiness" },
      { id: "quality", label: "Code Quality" },
    ],
    questions: [
      {
        id: "onboarding_friction",
        label: "Can a total stranger sign up for your app without reading instructions?",
        options: [
          { label: "Yes — dead simple, any device", value: "smooth", score: 5 },
          { label: "It works, but people get stuck", value: "stuck", score: 3 },
          { label: "Someone usually walks them through it", value: "manual", score: 1 },
          { label: "I haven't tested the sign-up flow from outside", value: "dont_know", score: 0 },
        ],
      },
      {
        id: "money_readiness",
        label: "Can your app take money from someone right now?",
        options: [
          { label: "Yes — automated checkout, subs, invoices", value: "auto", score: 5 },
          { label: "Manual billing only", value: "manual", score: 3 },
          { label: "Not yet — it's on the roadmap", value: "planned", score: 2 },
          { label: "Not yet, and I don't know where to start", value: "stuck", score: 0 },
          { label: "My app is free / no monetization needed", value: "na", score: 5 },
        ],
      },
      {
        id: "user_complaints",
        label: "When was the last time a user told you the app was slow, broken, or annoying?",
        options: [
          { label: "Never — we track and fix fast", value: "never", score: 5 },
          { label: "Months ago — we're stable", value: "months", score: 4 },
          { label: "This month", value: "month", score: 2 },
          { label: "This week", value: "week", score: 1 },
          { label: "I don't track user complaints", value: "dont_track", score: 0 },
        ],
      },
      {
        id: "mobile_quality",
        label: "Open your app on a phone right now. Does it feel like it was built for it?",
        options: [
          { label: "Fully responsive — gorgeous everywhere", value: "full", score: 5 },
          { label: "Works but feels cramped on mobile", value: "cramped", score: 3 },
          { label: "Desktop only for now", value: "desktop", score: 1 },
          { label: "Not built yet", value: "none", score: 0 },
        ],
      },
      {
        id: "search_visibility",
        label: "If someone Googled the problem your app solves, would you show up?",
        options: [
          { label: "Yes — page 1 for our keywords", value: "page1", score: 5 },
          { label: "We show up for our name, not much else", value: "brand", score: 3 },
          { label: "Probably not", value: "no", score: 1 },
          { label: "I don't know — we've never checked", value: "dont_know", score: 0 },
        ],
      },
      {
        id: "user_dropoff",
        label: "Do you know the exact step where most users abandon your app and never come back?",
        options: [
          { label: "Yes — funnel analytics, we optimize it", value: "yes", score: 5 },
          { label: "I have a rough idea", value: "rough", score: 3 },
          { label: "No, but I want to know", value: "want", score: 1 },
          { label: "We don't track any user behavior", value: "none", score: 0 },
        ],
      },
      {
        id: "deploy_confidence",
        label: "If you deploy to production tomorrow, how confident are you that nothing breaks?",
        options: [
          { label: "100% — tests cover everything critical", value: "full", score: 5 },
          { label: "Pretty confident — most paths are tested", value: "mostly", score: 4 },
          { label: "50/50 — there are always surprises", value: "fifty", score: 2 },
          { label: "I cross my fingers every deploy", value: "fingers", score: 1 },
          { label: "We have no automated tests, I test manually", value: "none", score: 0 },
        ],
      },
      {
        id: "bug_resolution",
        label: "How fast can you go from 'there's a bug' to 'it's fixed in production'?",
        options: [
          { label: "Minutes — CI/CD, fast rollback", value: "minutes", score: 5 },
          { label: "Same day", value: "day", score: 4 },
          { label: "A few days", value: "days", score: 2 },
          { label: "Weeks — long deploy cycle", value: "weeks", score: 1 },
          { label: "I don't have a way to track that", value: "dont_track", score: 0 },
        ],
      },
    ],
  },

  pipeline: {
    id: "pipeline",
    name: "Pipeline Plumber",
    tagline: "Every bad deploy costs trust. Every slow deploy costs velocity. See where yours leaks.",
    description: "Panic hotfixes, untested rollbacks, deploy days that stretch into weeks — each one a crack in your team's confidence. 8 questions to find the bottlenecks before your next incident.",
    categories: [
      { id: "speed", label: "Deployment Speed" },
      { id: "quality_gates", label: "Quality Gates" },
      { id: "observability", label: "Observability" },
      { id: "process", label: "Process & Docs" },
    ],
    questions: [
      {
        id: "time_to_prod",
        label: "How long from 'code is written' to 'it's running in production'?",
        options: [
          { label: "Minutes — fully automated", value: "minutes", score: 5 },
          { label: "A few hours", value: "hours", score: 4 },
          { label: "A day or two", value: "days", score: 2 },
          { label: "A week or more", value: "week", score: 1 },
          { label: "I don't measure it", value: "dont_measure", score: 0 },
        ],
      },
      {
        id: "panic_deploy",
        label: "When was the last time you pushed a hotfix to production with your heart racing?",
        options: [
          { label: "Never — our deploys are boring and predictable", value: "never", score: 5 },
          { label: "This quarter", value: "quarter", score: 3 },
          { label: "This month", value: "month", score: 2 },
          { label: "This week", value: "week", score: 1 },
          { label: "I can't remember a deploy that wasn't stressful", value: "always", score: 0 },
        ],
      },
      {
        id: "broken_test_block",
        label: "What happens when a broken test gets pushed to your pipeline?",
        options: [
          { label: "Deploy is blocked — automated gate", value: "blocked", score: 5 },
          { label: "Someone notices and manually stops it", value: "manual_stop", score: 3 },
          { label: "It deploys, then we notice the error", value: "slips", score: 1 },
          { label: "We don't have automated tests in the pipeline", value: "no_tests", score: 0 },
        ],
      },
      {
        id: "rollback_speed",
        label: "How long does it take to undo a bad deploy?",
        options: [
          { label: "Seconds — one-click automated rollback", value: "seconds", score: 5 },
          { label: "Minutes — manual but straightforward", value: "minutes", score: 4 },
          { label: "Hours — we need to figure out what broke first", value: "hours", score: 2 },
          { label: "We patch forward instead of rolling back", value: "patch", score: 1 },
          { label: "We don't have a rollback process", value: "none", score: 0 },
        ],
      },
      {
        id: "deploy_health",
        label: "Five minutes after a deploy — how do you know if it worked?",
        options: [
          { label: "Automated health checks, dashboards go green", value: "auto", score: 5 },
          { label: "I watch the logs for a few minutes", value: "logs", score: 3 },
          { label: "I wait to see if anyone complains", value: "wait", score: 1 },
          { label: "I move on — if it's broken, I'll hear about it", value: "ignore", score: 0 },
        ],
      },
      {
        id: "deploy_audit",
        label: "Can you see every deploy from last week — who triggered it, what changed, if it passed?",
        options: [
          { label: "Yes — full audit trail, automated changelogs", value: "full", score: 5 },
          { label: "Most of them — some things are tracked", value: "most", score: 3 },
          { label: "I'd piece it together from Slack and git log", value: "piece", score: 1 },
          { label: "We don't track deploys at all", value: "none", score: 0 },
        ],
      },
      {
        id: "bus_factor",
        label: "If your most senior engineer won the lottery tomorrow, could someone else deploy on Wednesday?",
        options: [
          { label: "Yes — fully documented, anyone on the team", value: "full", score: 5 },
          { label: "Mostly — docs cover the critical steps", value: "mostly", score: 3 },
          { label: "It would be rough but survivable", value: "rough", score: 2 },
          { label: "Only one person knows how", value: "one", score: 0 },
        ],
      },
      {
        id: "manual_steps",
        label: "How many manual steps does it take to get one change into production?",
        options: [
          { label: "Zero — fully automated CI/CD pipeline", value: "zero", score: 5 },
          { label: "1—2 — mostly automated with one approval", value: "low", score: 4 },
          { label: "3—5 — several manual gates", value: "medium", score: 2 },
          { label: "5+ — lots of SSH, clicking, and checklist items", value: "high", score: 1 },
          { label: "I'm not sure — I just follow the process", value: "dont_know", score: 0 },
        ],
      },
    ],
  },
};
