// src/content/config.ts

import { defineCollection, z } from 'astro:content'; 

const projectCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    // ... Champs existants ...
    title: z.string(),
    client: z.string(),
    description: z.string().optional(),
    role: z.string(),
    roleDescription: z.string(), 
    context: z.string(),
    problem: z.string(),
    keyInsights: z.union([z.string(), z.array(z.string())]),
    methodology: z.string(),
    // 🚨 MODIFICATION : designConception devient un OBJET
  designConception: z.object({
   paragraph: z.string().optional(), // Paragraphe d'introduction optionnel
   listItems: z.array(z.string()).optional(), // Liste à puces optionnelle
  }).optional(), // Rendre l'objet designConception lui-même optionnel
    delivery: z.string(),
    metrics: z.union([z.string(), z.array(z.string())]),
    cardImage: z.string(), 
    projectImages: z.array(z.string()).min(1).optional(),
    publishDate: z.string(), 
    isDraft: z.boolean().default(false),
    
    // NOUVEAUX CHAMPS DYNAMIQUES POUR LES CRÉDITS
    teamMembers: z.array(z.object({
        name: z.string(),
        link: z.string().url(),
    })).optional(),
    clientDetails: z.object({
        name: z.string(),
        link: z.string().url(),
    }).optional(),
    references: z.array(z.object({
        name: z.string(),
        link: z.string().url(),
        role: z.string().optional(), // ex: "Encadrement"
    })).optional(),
  }),
});

export const collections = {
  projects: projectCollection,
};