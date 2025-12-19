// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: 'https://yassineelidrissi.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
    redirects: true // Force la génération des fichiers HTML de redirection
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