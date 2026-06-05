import { siteConfig } from "@/lib/metadata";

export const STEPS = [
  { n: "01", text: <>Send the email to <a href={`mailto:${siteConfig.email}`} className="text-blue-600 underline font-semibold">{siteConfig.email}</a></> },
  { n: "02", text: "I review it within 24 hours" },
  { n: "03", text: "I send back 3 specific fixes — ranked by impact" },
  { n: "04", text: "You decide if you want my help implementing them" },
];
