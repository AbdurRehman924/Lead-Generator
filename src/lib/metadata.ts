export const siteConfig = {
  name: "Cinch",
  tagline: "Your infrastructure, production-ready.",
  url: "https://cinch.dev",
  description:
    "Production-grade infrastructure and fullstack applications. DevOps, cloud engineering, and technical SEO.",
};

export function buildMetadata(overrides?: {
  title?: string;
  description?: string;
  path?: string;
}) {
  const title = overrides?.title
    ? `${overrides.title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title,
    description: overrides?.description ?? siteConfig.description,
    openGraph: {
      title,
      description: overrides?.description ?? siteConfig.description,
      url: overrides?.path
        ? `${siteConfig.url}${overrides.path}`
        : siteConfig.url,
    },
  };
}
