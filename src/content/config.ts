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
        keyInsights: z.array(z.string()), // 👈 Doit être un Array
        methodology: z.string(),
        designConception: z.string(),
        delivery: z.string(),
        metrics: z.string(),
        cardImage: z.string(), // 👈 Doit être un String (Contournement)
        projectImages: z.array(z.string()).min(1).optional(),
        publishDate: z.string(), 
        isDraft: z.boolean().default(false),
    }),
});

export const collections = {
    projects: projectCollection,
};