import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import vercel from '@astrojs/vercel';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});