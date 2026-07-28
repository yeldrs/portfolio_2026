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

  // i18n: English is the default locale and stays unprefixed at the root
  // (matches existing canonical URLs); French lives under /fr/.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-FR',
        },
      },
    }),
  ],
  redirects: {
    '/work': '/#projects',
    '/projects': '/#projects',
    '/aboutme': '/about',
    '/logos': '/',
    '/photography': '/',
    '/fr/work': '/fr/#projects',
    '/fr/projects': '/fr/#projects',
    '/fr/aboutme': '/fr/about',
    '/fr/logos': '/fr',
    '/fr/photography': '/fr',
  }
});
// Fichier : astro.config.mjs
