import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Pure static marketing site for Calorie Cownter. No CMS, no React, no
// server routes — builds to plain HTML for GitHub Pages on a custom domain.
// https://astro.build/config
export default defineConfig({
  site: 'https://caloriecownter.com',
  base: '/',
  integrations: [mdx(), sitemap()],
});
