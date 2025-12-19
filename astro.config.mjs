// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: 'https://yassineelidrissi.com',
  // ✅ 2. Gestion des slashs : 'ignore' permet de répondre aux deux versions
  trailingSlash: 'ignore',

  // ✅ 3. Format 'directory' pour créer /about/index.html (meilleur pour SEO et compatibilité)
  build: {
    format: 'file'
  },
  output: 'static',
  integrations: [tailwind(), mdx()],
  redirects: {
    '/work': '/#projects',
    '/projects': '/#projects',
    '/aboutme': '/about',
    '/logos': '/',
    '/photography': '/',
  }
});
// Fichier : astro.config.mjs