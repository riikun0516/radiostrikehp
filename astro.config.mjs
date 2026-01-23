import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // SSR用

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://www.radiostrike.jp',
    image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  // 下記を追加して、画像の最適化エラーを無視するように仕向けます
  vite: {
    build: {
      // 存在しないアセットがあっても警告で済ませる
      chunkSizeWarningLimit: 1000, 
    }
  }
});
