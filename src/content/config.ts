import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    context: z.string(),
    problem: z.string(),
    role: z.string(),
    keyInsights: z.string(),
    methodology: z.string(),
    designConception: z.string(),
    delivery: z.string(),
    metrics: z.string(),
  })
});

export const collections = { projects };
