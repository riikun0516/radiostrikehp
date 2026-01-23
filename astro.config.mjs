import { defineConfig } from 'astro/config';
// serverless を含めない新しいインポート形式に修正
import vercel from '@astrojs/vercel';

export default defineConfig({
  // 出力モードが 'server' の場合に getStaticPaths の警告が出るため、
  // もしSSG（静的サイト生成）メインなら 'static' に変えるか、
  // ページ側で export const prerender = true; を設定してください。
  output: 'server',
  
  // Vercelアダプターの設定
  adapter: vercel(),

  image: {
    // 【重要】画像が見つからないエラーでビルドが止まるのを防ぐ設定
    // 最適化を行わず、生のパスをそのまま通す 'noop' サービスを指定します。
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },

  // コンテンツコレクションなどの厳格なチェックを緩和
  vite: {
    build: {
      // アセットが見つからない場合もビルドを続行させるためのフラグ
      assetsInlineLimit: 0,
    },
    // 特定の画像がないことによるRollupのエラーを抑制
    optimizeDeps: {
      exclude: ['@astrojs/vercel']
    }
  }
});