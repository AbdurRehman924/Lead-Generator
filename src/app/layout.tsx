import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    template: `%s — ${siteConfig.name}`,
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  icons: "/favicon.svg",
  metadataBase: new URL("https://ask.artariq.dev"),
  alternates: { canonical: "/" },
  keywords: ["software audit", "cloud cost", "CRM health", "fullstack assessment", "infrastructure scorecard", "Abdur Rehman Tariq"],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
    url: "https://ask.artariq.dev",
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document.documentElement;
                var s = localStorage.getItem("dark");
                if (s !== null ? s === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  d.classList.add("dark");
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <Nav />
        <div className="flex flex-col flex-1">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
