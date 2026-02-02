import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // nodeアダプターに変更
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://radiostrike.jp',
  output: 'server', // SSRを維持
  
  // アダプターを node に変更し、standalone モードに設定
  adapter: node({
    mode: 'standalone',
  }),

  integrations: [
    tailwind(),
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
    // vercel 固有の最適化設定は不要なので削除または整理
    optimizeDeps: {
      exclude: [] 
    },
  }
});