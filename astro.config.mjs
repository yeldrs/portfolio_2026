import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

export default defineConfig({
  output: 'static', 
  // Base est vide si vous déployez à la racine du domaine
  base: '/',
  integrations: [tailwind(), mdx()],
});