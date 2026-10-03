import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

export async function GET(context) {
  const posts = (await getCollection('macro')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: site.name,
    description: site.tagline,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.subtitle,
      pubDate: p.data.date,
      link: `/macro/${p.id}/`,
    })),
  });
}
