import rss from '@astrojs/rss';
import { published } from '../lib/content';
import { site } from '../config/site';

export async function GET(context) {
  const [macro, journal, learn] = await Promise.all([published('macro'), published('journal'), published('learn')]);
  const posts = [
    ...macro.map((p) => ({ title: p.data.title, description: p.data.subtitle, date: p.data.date, link: `/macro/${p.id}/` })),
    ...journal.map((p) => ({ title: p.data.title, description: p.data.description ?? site.tagline, date: p.data.date, link: `/journal/${p.id}/` })),
    ...learn.map((p) => ({ title: p.data.title, description: p.data.subtitle, date: p.data.updated, link: `/learn/${p.id}/` })),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());
  return rss({
    title: site.name,
    description: site.tagline,
    site: context.site,
    items: posts.map((p) => ({ title: p.title, description: p.description, pubDate: p.date, link: p.link })),
  });
}
