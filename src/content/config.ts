import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // WordPressからの日付は文字列かDateオブジェクトで来るため、柔軟に受け取れるようにします
    date: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
    // もしXML変換時に description や tags が含まれているならここに追加します
  }),
});

export const collections = {
  'blog': blog,
};