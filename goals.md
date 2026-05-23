# Cinch — Lead Generator

> **3 calculators → scored report → lead capture.** Deployed at cinch.artariq.dev.

## Stack
Next.js 16, Tailwind v4, Framer Motion, TypeScript. No database, no auth. Hosted on Vercel.

## Current state
- Landing page with 2-column hero: value prop (left) + pain point tree (right)
- 3 calculators: Cloud Mathematician, FullStack Alchemist, Pipeline Plumber
- Auto-rotating assessment carousel with category tags and hover effects
- Multi-step question form with AnimatePresence transitions
- Report page with grade, compact category cards, email capture, Calendly CTA
- Interactive supply chain pain point tree (23 stages, 3 categories, expandable)
- Animated grid background, dark mode with localStorage persistence
- Mobile-responsive with horizontal overflow protection
- Pixel/monospace design language with pixel-btn shadows

## Structure
```
app/
├── (landing)/page.tsx       ← Hero + carousel + pain tree
├── assess/page.tsx          ← Calculator picker
├── assess/[calculator]/     ← 7-step question form
├── report/[id]/             ← Scored report with email capture
├── layout.tsx               ← Root layout with inline dark script
├── globals.css              ← Pixel design system
components/
├── Nav.tsx                  ← Fixed top nav with theme toggle
├── ThemeToggle.tsx           ← Dark mode toggle
├── GridBg.tsx               ← Animated grid background
├── AssessCarousel.tsx        ← Auto-rotating assessment card
├── PainPointGrid.tsx        ← Supply chain tree with tech tags
├── EmailCapture.tsx         ← Email input for report delivery
└── calculators/
    ├── CalculatorForm.tsx   ← Multi-step form with animations
    └── ReportCard.tsx       ← Compact score display
lib/
├── calculators/
│   ├── config.ts            ← 3 calculators, 7 Qs each, scoring rules
│   └── engine.ts            ← Scoring logic with category breakdown
└── metadata.ts              ← SEO metadata
```

## To add next
- [ ] Email capture backend (send report via email)
- [ ] SEO (sitemaps, JSON-LD, OG images)
- [ ] Analytics to track which calculators convert
- [ ] More calculators
- [ ] Lead scoring in pain point tree → direct to relevant calculator
