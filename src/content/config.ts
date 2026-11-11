// src/content/config.ts
//
// One YAML file per case study: src/content/projects/<name>.yaml
//   - shared, language-neutral fields at the top level (slug, date, images, credits)
//   - translated copy under `en:` / `fr:` blocks (same shape)
//   - `fr` absent  ⇒  no /fr/work/<slug> page is generated (not a bug)
// The Zod schema is the contract: a file that fails it fails the build.

import { defineCollection, z } from "astro:content";

// A section field: a paragraph, or a bulleted list. ProjectLayout hides the
// section entirely when the value is missing or empty.
const section = z.union([z.string(), z.array(z.string())]).optional();

// A string that is normally language-neutral but occasionally differs per locale.
const i18nString = z.union([z.string(), z.object({ en: z.string(), fr: z.string() })]);

// Main + optional secondary image for one case-study section.
const figure = z
  .object({
    main: z.string().default(""),
    secondary: z.string().default(""),
  })
  .default({});

const localeContent = z.object({
  title: z.string(),
  client: z.string(),
  description: z.string().optional(),
  role: z.string(),
  roleDescription: section,
  context: section,
  problem: section,
  keyInsights: section,
  methodology: section,
  designConception: z
    .object({
      paragraph: z.string().optional(),
      listItems: z.array(z.string()).optional(),
    })
    .optional(),
  delivery: section,
  metrics: section,
});

const creditEntry = z.object({
  name: z.string().optional(),
  link: z.string().url().optional(),
  role: i18nString.optional(),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    semanticSlug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "semanticSlug must be kebab-case (lowercase, digits, hyphens).",
      ),
    publishDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "publishDate must be an ISO date (YYYY-MM-DD)."),
    isDraft: z.boolean().default(false),

    cover: z.string(),
    images: z.object({
      context: figure,
      role: figure,
      conception: figure,
      results: figure,
      carousel: z.array(z.string()).default([]),
    }),

    credits: z
      .object({
        // Displayed name comes from `<locale>.client`; only the link lives here.
        client: z.object({ link: z.string().url().optional() }).optional(),
        team: z.array(creditEntry).default([]),
        references: z.array(creditEntry).default([]),
      })
      .default({}),

    en: localeContent,
    fr: localeContent.optional(),
  }),
});

// ---------------------------------------------------------------------------
// Workflow page: one entry per step (src/content/workflow/step-<n>.yaml).
// `order`, `teaserTools` and the project/status/tool-id skeleton are shared;
// all prose lives under `en:` and `fr:` (both required, same shape).
// ---------------------------------------------------------------------------
const projectId = z.enum(["tenon", "food-journal", "portfolio"]);

const screen = z.object({
  caption: z.string(),
  // Second line under the caption (device, state, step).
  sub: z.string().optional(),
  // Optional until the screenshot is supplied; a screen without `src` renders a
  // placeholder. When `src` is set, `alt` is required (checked below).
  src: z.string().optional(),
  alt: z.string().optional(),
  callouts: z.array(z.string()).default([]),
  // Device frame (DeviceFrame.astro). Used by the "pairs", "rail" and "spotlight" galleries.
  device: z.enum(["phone", "tablet", "desktop"]).default("phone"),
  platform: z.enum(["android", "apple"]).default("android"),
  theme: z.enum(["light", "dark"]).default("light"),
  landscape: z.boolean().default(false),
  browser: z.boolean().default(false),
  // "pairs" gallery: the earlier version (wireframe) shown next to `src` (the final screen).
  before: z.object({ src: z.string(), alt: z.string() }).optional(),
});

// Tool diagram of step 1 ("Tools and how they connect"). Geometry is in SVG user units
// inside a 640-wide viewBox; it is per locale because French labels are longer.
const diagramNode = z.object({
  tool: z.string().optional(), // catalogue id for the logo; omit for a dashed placeholder
  label: z.string(),
  sub: z.string().optional(),
  x: z.number(),
  y: z.number(),
});
const diagramEdge = z.object({
  d: z.string(), // SVG path
  dotted: z.boolean().default(false),
  arrow: z.boolean().default(false),
  label: z.string().optional(),
  lx: z.number().optional(),
  ly: z.number().optional(),
});
const diagram = z.object({
  height: z.number(),
  alt: z.string(),
  caption: z.string(),
  nodes: z.array(diagramNode).min(1),
  edges: z.array(diagramEdge).default([]),
});

const toolEntry = z.object({
  // Catalogue id (src/data/workflow.tools.ts). Omit for a tool with no logo/filter.
  id: z.string().optional(),
  label: z.string(),
  note: z.string().optional(),
});

const workflowBlock = z.object({
  project: projectId,
  status: z.enum(["active", "not-applicable"]).default("active"),
  // Heading of a sub-block, only when a step splits a project in two (steps 3 and 5).
  heading: z.string().optional(),
  approachLabel: z.string().optional(),
  approach: z.string().optional(),
  tools: z.array(toolEntry).default([]),
  constraints: z.string().optional(),
  correction: z.string().optional(),
  callToAction: z.string().optional(),
  link: z.string().url().optional(),
  linkLabel: z.string().optional(),
  // grid = 4:3 captures (default); pairs = wireframe next to final screen; rail = real-scale
  // rail of devices; spotlight = one screen at a time, neighbours dimmed.
  gallery: z.enum(["grid", "pairs", "rail", "spotlight"]).default("grid"),
  // Spotlight only: 1-based screen shown on arrival (neighbours on the left stay reachable).
  startAt: z.number().int().min(1).optional(),
  screens: z.array(screen).default([]),
  // When set, replaces the tool list (step 1: which tools frame the work and how they connect).
  diagram: diagram.optional(),
});

const workflowLocale = z.object({
  title: z.string(),
  globalText: z.string(),
  blocks: z.array(workflowBlock),
});

const workflow = defineCollection({
  type: "data",
  schema: z
    .object({
      order: z.number().int().min(1).max(5),
      // Tool catalogue ids shown under the node in the home teaser (3 or 4).
      teaserTools: z.array(z.string()).min(3).max(4),
      en: workflowLocale,
      fr: workflowLocale,
    })
    .superRefine((step, ctx) => {
      // EN and FR must describe the same structure: same blocks, statuses and tool ids.
      const sig = (l: typeof step.en) =>
        l.blocks.map((b) => `${b.project}:${b.status}:${b.tools.map((t) => t.id ?? "-").join(",")}:${b.screens.length}:${b.gallery}:${b.diagram ? 1 : 0}`);
      if (JSON.stringify(sig(step.en)) !== JSON.stringify(sig(step.fr))) {
        ctx.addIssue({ code: "custom", message: "en and fr blocks must have the same structure (projects, statuses, tool ids, screens)." });
      }
      for (const lang of ["en", "fr"] as const) {
        for (const b of step[lang].blocks) {
          if (b.status === "not-applicable") continue;
          if (!b.approachLabel || !b.approach) {
            ctx.addIssue({ code: "custom", message: `${lang}: an active block needs approachLabel and approach.` });
          }
          for (const sc of b.screens) {
            if (sc.src && !sc.alt) ctx.addIssue({ code: "custom", message: `${lang}: a screen with src needs alt text.` });
            if (b.gallery === "pairs" && !sc.before) ctx.addIssue({ code: "custom", message: `${lang}: a "pairs" screen needs a before image.` });
          }
        }
      }
    }),
});

export const collections = { projects, workflow };
