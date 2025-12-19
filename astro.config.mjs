// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: 'https://yassineelidrissi.com',
  trailingSlash: 'never', // Gère nativement le retrait du slash final
  build: {
    format: 'file' // Génère 'about.html' au lieu de 'about/index.html' pour éviter les slashes
  },
  output: 'static',
  integrations: [tailwind(), mdx()],
  
  // Remplacement du .htaccess pour GitHub Pages
  redirects: {
    '/work': '/#projects',
    '/work/': '/#projects',
    '/projects': '/#projects',
    '/aboutme': '/about',
    '/logos': '/',
    '/photography': '/',
  }
});