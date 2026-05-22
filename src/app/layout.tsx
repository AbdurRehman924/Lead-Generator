import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/metadata";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: {
    template: `%s — ${siteConfig.name}`,
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
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
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <div className="pt-14 flex flex-col flex-1">{children}</div>
      </body>
    </html>
  );
}
