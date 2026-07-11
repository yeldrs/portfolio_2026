// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://yassineelidrissi.com',
  // ✅ 2. Slash handling: 'ignore' allows responding to both versions
  trailingSlash: 'ignore',

  // ✅ 3. 'directory' format to create /about/index.html (better for SEO and compatibility)
  build: {
    format: 'file'
  },
  output: 'static',
  integrations: [tailwind(), mdx(), sitemap()],
  redirects: {
    '/work': '/#projects',
    '/projects': '/#projects',
    '/aboutme': '/about',
    '/logos': '/',
    '/photography': '/',
  }
});
// Fichier : astro.config.mjs