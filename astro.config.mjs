// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // ...既存の設定
  adapter: vercel(),
  image: {
    // 画像が見つからなくてもビルドを続行する設定
    service: {
      entrypoint: 'astro/assets/services/sharp', 
    },
  },
  // 以下の設定を追記して、画像エラーを無視するようにします
  assets: {
    // 存在しない画像へのリンクがあってもエラーにしない
    strict: false 
  },
  // もしContent Collectionsで画像アセットとして扱っている場合、
  // エラーを無視する標準設定がないため、以下の「根本解決」が必要です。
});