import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind'; // こちらをインポート

export default defineConfig({
  output: 'server',
  adapter: vercel(),

  // Viteのpluginsではなく、ここでintegrationsとして登録します
  integrations: [tailwind()], 

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