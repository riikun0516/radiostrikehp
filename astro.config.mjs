import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind'; // こちらをインポート
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://radiostrike.jp',
  output: 'server',
  adapter: vercel(),

  // Viteのpluginsではなく、ここでintegrationsとして登録します
  integrations: [tailwind(),
    sitemap(),
  ], 

  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },

  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    optimizeDeps: {
      exclude: ['@astrojs/vercel']
    },
    // ここにあった plugins: [tailwindcss()] は不要になります
  }
});