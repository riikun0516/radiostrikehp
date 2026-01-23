import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // 新しい順にソート（日付が文字列でも動くように工夫）
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'RadioStrike',
    description: 'ITインフラ、サーバー、開発に関する技術ブログ',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      // descriptionが空なら本文の冒頭を少し入れる
      description: post.data.description || post.body.substring(0, 160).replace(/[#*`]/g, '') + '...',
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>ja-jp</language>`,
  });
}