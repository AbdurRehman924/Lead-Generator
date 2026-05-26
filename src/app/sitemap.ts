import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cinch.artariq.dev";

  const calculatorRoutes = Object.keys(calculators).map((id) => ({
    url: `${baseUrl}/assess/${id}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/assess`, lastModified: new Date() },
    ...calculatorRoutes,
  ];
}
