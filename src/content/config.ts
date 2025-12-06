// src/content/config.ts

import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
 type: "content",
 schema: z.object({
  semanticSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Le slug sémantique doit être en minuscules, sans espaces, et utiliser des tirets (kebab-case).'),
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
  cardImage: z.string(),
  projectImages: z.array(z.string()).min(1).optional(),
  publishDate: z.string(),
  isDraft: z.boolean().default(false),

  // NOUVEAUX CHAMPS DYNAMIQUES POUR LES CRÉDITS

  clientDetails: z
   .object({
    name: z.string().optional(), // 🎯 RENDU OPTIONNEL
    link: z.string().url().optional(), // 🎯 RENDU OPTIONNEL
   })
   .optional(),

  teamMembers: z
   .array(
    z.object({
     name: z.string().optional(), // 🎯 RENDU OPTIONNEL
     link: z.string().url().optional(), // 🎯 RENDU OPTIONNEL
          role: z.string().optional(), // 🎯 RENDU OPTIONNEL (pour la virgule)
    }),
   )
   .optional(),

  references: z
   .array(
    z.object({
     name: z.string().optional(), // 🎯 RENDU OPTIONNEL
     link: z.string().url().optional(), // 🎯 RENDU OPTIONNEL
     role: z.string().optional(),
    }),
   )
   .optional(),
 }),
});

export const collections = {
 projects: projectCollection,
};