import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // 日付でソート（新しい順）
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'りーろぐ',
    description: 'ITインフラ、サーバー、開発に関する技術ブログ',
    site: context.site,
    items: sortedPosts.map((post) => {
      // 本文がない場合の安全策
      const bodyText = post.body ? post.body.substring(0, 160).replace(/[#*`]/g, '') : "";
      
      return {
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.description || bodyText + '...',
        link: `/blog/${post.slug}/`,
      };
    }),
    customData: `<language>ja-jp</language>`,
  });
}