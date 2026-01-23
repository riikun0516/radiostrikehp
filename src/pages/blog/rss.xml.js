import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // 日付で降順（新しい順）にソート
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'RadioStrike',
    description: 'ITインフラ、サーバー、開発に関する技術ブログ',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date), // Dateオブジェクトに変換
      description: post.data.description || '',
      // RSSリーダーで本文を読めるようにする場合（オプション）
      content: sanitizeHtml(parser.render(post.body)),
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>ja-jp</language>`,
  });
}