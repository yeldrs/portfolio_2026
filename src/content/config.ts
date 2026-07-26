// src/content/config.ts

import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
 type: "content",
 schema: z.object({
  semanticSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'The semantic slug must be lowercase, without spaces, and use hyphens (kebab-case).'),
  title: z.string(),
  client: z.string(),
  description: z.string().optional(),
  role: z.string(),
  roleDescription: z.string(),
  context: z.string(),
  problem: z.string(),
  keyInsights: z.union([z.string(), z.array(z.string())]),
  methodology: z.string(),
  designConception: z
   .object({
    paragraph: z.string().optional(),
    listItems: z.array(z.string()).optional(),
   })
   .optional(),
  delivery: z.string(),
  metrics: z.union([z.string(), z.array(z.string())]),
  // Images are declared once, in the en/ entry. Other locales omit both fields
  // entirely and inherit them at build time (see src/content/resolveImages.ts) —
  // this keeps image edits to a single file regardless of how many languages exist.
  cardImage: z.string().optional(),
  projectImages: z.array(z.string()).min(1).optional(),
  publishDate: z.string(),
  isDraft: z.boolean().default(false),

  // NEW DYNAMIC FIELDS FOR CREDITS

  clientDetails: z
   .object({
    name: z.string().optional(), // 🎯 MADE OPTIONAL
    link: z.string().url().optional(), // 🎯 MADE OPTIONAL
   })
   .optional(),

  teamMembers: z
   .array(
    z.object({
     name: z.string().optional(), // 🎯 MADE OPTIONAL
     link: z.string().url().optional(), // 🎯 MADE OPTIONAL
          role: z.string().optional(), // 🎯 MADE OPTIONAL (for the comma)
    }),
   )
   .optional(),

  references: z
   .array(
    z.object({
     name: z.string().optional(), // 🎯 MADE OPTIONAL
     link: z.string().url().optional(), // 🎯 MADE OPTIONAL
     role: z.string().optional(),
    }),
   )
   .optional(),
 }),
});

export const collections = {
 projects: projectCollection,
};