import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const briefings = await getCollection('macro');
  return rss({
    title: 'Aayush ICT · Macro Desk',
    description: "Know what's priced in. Trade what changes.",
    site: context.site,
    items: briefings
      .sort((a, b) => b.data.updated.valueOf() - a.data.updated.valueOf())
      .map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.updated,
        link: `/macro/${entry.data.slug}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
