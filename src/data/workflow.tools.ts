// src/data/workflow.tools.ts
//
// Tool catalogue for the workflow page: id -> display name + optional logo.
// Logos live in src/assets/logos/<id>.svg (simple-icons with the brand colour applied,
// SVGO-optimised; Optimal Workshop is the vendor's own favicon). A tool without a file has
// no logo yet and renders a dashed placeholder square.

import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/logos/*.{svg,webp,png}", {
  eager: true,
});

export const toolLogos: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(files)) {
  const id = path.split("/").pop()!.replace(/\.(svg|webp|png)$/, "");
  toolLogos[id] = mod.default;
}

export const toolNames: Record<string, string> = {
  "claude-code": "Claude Code",
  opencode: "OpenCode",
  "claude-design": "Claude Design",
  gemini: "Gemini",
  notion: "Notion",
  git: "Git",
  typeform: "Typeform",
  uxtweak: "UXtweak",
  "optimal-workshop": "Optimal Workshop",
  umami: "Umami",
  wixstudio: "WixStudio",
  figma: "Figma",
  tailwind: "Tailwind CSS",
  shadcn: "shadcn/ui",
  cva: "class-variance-authority",
  astro: "Astro",
  zod: "Zod",
  godot: "Godot",
  nextjs: "Next.js",
  eslint: "ESLint",
  "axe-core": "axe-core",
  github: "GitHub",
  datadog: "Datadog",
  metabase: "Metabase",
  "github-actions": "GitHub Actions",
  "github-pages": "GitHub Pages",
  vercel: "Vercel",
  "google-play": "Google Play Console",
  "app-store": "App Store",
};
