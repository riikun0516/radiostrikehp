import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // SSR用

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://www.radiostrike.jp',
});