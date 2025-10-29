// src/content/config.ts

import { defineCollection, z } from 'astro:content';
// import { image } from 'astro/assets'; // Décommentez si vous utilisez l'intégration des images

const projectCollection = defineCollection({
    type: 'content', 
    schema: z.object({
        title: z.string(),
        client: z.string(),
        description: z.string().optional(),
        role: z.string(),
        
        // 🔴 NOUVEAU : Champ pour la description détaillée du rôle
        roleDescription: z.string(), 
        
        context: z.string(),
        problem: z.string(),
        keyInsights: z.array(z.string()),
        methodology: z.string(),
        designConception: z.string(),
        delivery: z.string(),
        metrics: z.string(),
        // cardImage: image().optional(), // Décommentez si vous utilisez l'image
        publishDate: z.string(), 
        isDraft: z.boolean().default(false),
    }),
});

export const collections = {
    projects: projectCollection,
};