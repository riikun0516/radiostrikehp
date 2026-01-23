import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'りーろぐ',
    description: '鉄道・ガジェットなどの何でもブログ',
    // サイトのURL（astro.config.mjsのsite設定から取得）
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || '', // 説明文があれば
      // 記事へのリンク
      link: `/blog/${post.slug}/`,
    })),
    // カスタムXML（日本語環境などで必要であれば）
    customData: `<language>ja-jp</language>`,
  });
}