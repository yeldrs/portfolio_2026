// src/content/config.ts

import { defineCollection, z } from 'astro:content'; 

const projectCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    client: z.string(),
    description: z.string().optional(),
    role: z.string(),
    roleDescription: z.string(), 
    context: z.string(),
    problem: z.string(),
        // 🚨 FLEXIBILITÉ : Accepte Array (liste) OU String (paragraphe)
    keyInsights: z.union([z.string(), z.array(z.string())]),
    methodology: z.string(),
    designConception: z.string(),
    delivery: z.string(),
        // 🚨 FLEXIBILITÉ : Accepte Array (liste) OU String (paragraphe)
    metrics: z.union([z.string(), z.array(z.string())]),
    cardImage: z.string(), 
    projectImages: z.array(z.string()).min(1).optional(),
    publishDate: z.string(), 
    isDraft: z.boolean().default(false),
  }),
});

export const collections = {
  projects: projectCollection,
};