// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react(), mdx(), sitemap()],
  site: 'https://june.kim',
  base: '/reading/',
  server: { port: 12345 },
  vite: {
    plugins: [tailwindcss()],
  },
});
