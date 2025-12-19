// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
// On ne l'importe plus car on utilise un sitemap manuel dans /public
// import sitemap from "@astrojs/sitemap"; 

export default defineConfig({
  // ✅ 1. Domaine final
  site: 'https://yassineelidrissi.com',
  
  // ✅ 2. Forcer l'absence de slash final
  trailingSlash: 'never',

  // ✅ 3. Configuration du build pour les URLs propres
  build: {
    format: 'file'
  },
  
  // ✅ 4. Sortie statique
  output: 'static', 
  
  // ✅ 5. Intégrations (sitemap retiré pour éviter les doublons)
  integrations: [tailwind(), mdx()],
});