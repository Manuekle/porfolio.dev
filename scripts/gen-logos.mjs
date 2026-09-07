// Bakes the brand marks used across the site into src/data/brands.ts so nothing
// is fetched at runtime. Path data comes from Simple Icons (CC0-1.0).
// Run: node scripts/gen-logos.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const VERSION = "16.30.0";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const SLUGS = [
  // frontend
  "react", "nextdotjs", "astro", "typescript", "javascript", "tailwindcss", "flutter", "framer",
  // backend
  "nodedotjs", "python", "bun",
  // data
  "postgresql", "mysql", "mongodb", "redis", "prisma",
  // ai
  "openai", "anthropic", "claude", "mistralai", "googlegemini", "ollama", "modelcontextprotocol", "n8n",
  // infra + tools
  "docker", "linux", "git", "vercel", "googlecloud", "figma", "postman", "mercadopago", "meta",
  "microsoftazure", "microsoft", "expo", "stripe", "whatsapp",
  // social + education
  "github", "linkedin", "instagram", "gmail", "coursera", "google",
];

// Simple Icons dropped a few marks for trademark reasons; iconify still serves
// the paths, so fill in the metadata by hand for those.
const FALLBACK = {
  openai: { title: "OpenAI", hex: "412991" },
  linkedin: { title: "LinkedIn", hex: "0A66C2" },
  microsoft: { title: "Microsoft", hex: "5E5E5E" },
  microsoftazure: { title: "Microsoft Azure", hex: "0078D4" },
};

const meta = await fetch(`https://cdn.jsdelivr.net/npm/simple-icons@${VERSION}/data/simple-icons.json`).then((r) =>
  r.json(),
);
const bySlug = new Map(meta.map((i) => [i.slug, i]));

const rows = [];
for (const slug of SLUGS) {
  const svg = await fetch(`https://api.iconify.design/simple-icons:${slug}.svg`).then((r) => r.text());
  const d = svg.match(/<path[^>]*\sd="([^"]+)"/)?.[1];
  if (!d) {
    console.error("MISS", slug);
    continue;
  }
  const info = bySlug.get(slug) ?? FALLBACK[slug] ?? { title: slug, hex: "888888" };
  rows.push(
    `  ${JSON.stringify(slug)}: { title: ${JSON.stringify(info.title)}, ` +
      `hex: ${JSON.stringify("#" + info.hex)}, d: ${JSON.stringify(d)} },`,
  );
  console.error("ok", slug);
}

const out = `// Generated brand marks (path data from Simple Icons, CC0-1.0).
// Regenerate: node scripts/gen-logos.mjs

export type BrandMark = { title: string; hex: string; d: string };

export const BRANDS: Record<string, BrandMark> = {
${rows.join("\n")}
};
`;

writeFileSync(path.join(root, "src/data/brands.ts"), out);
console.error("wrote", rows.length, "marks");
