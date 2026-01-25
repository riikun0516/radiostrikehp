import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const response = await rss({
    title: 'りーろぐ',
    description: 'ITインフラ、サーバー、開発に関する技術ブログ',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description || "",
      link: `/blog/${post.slug}/`,
      content: post.body,
    })),
    // XML宣言に encoding="UTF-8" を明示的に追加
    customData: `<language>ja-jp</language>`,
  });

  // レスポンスヘッダーを上書きして UTF-8 を強制する
  return new Response(response.body, {
    headers: {
      ...response.headers,
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}