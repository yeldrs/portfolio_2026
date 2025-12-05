// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  // ✅ 1. Définir le domaine final pour le SEO (sitemap et URL canoniques)
  site: 'https://yassineelidrissi.com',
  
  // ✅ 2. Assure la génération statique (Obligatoire pour l'hébergement de fichiers)
  output: 'static', 
  
  // 🚫 3. SUPPRIMER 'base'. Le domaine personnalisé annule le besoin de ce préfixe.
  // base: '/', // <-- C'EST SUPPRIMÉ

  integrations: [tailwind(), mdx()],
});