// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Production URL — used to build absolute canonical / OG image URLs.
  site: 'https://manudev.vercel.app',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});