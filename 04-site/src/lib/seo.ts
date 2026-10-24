import { site, person } from '../config/site';

// Article structured data for a post. The author and publisher point at the one Person on the site.
export function articleLd(opts: { title: string; description: string; path: string; published: Date; modified?: Date }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    author: { '@id': person['@id'] },
    publisher: { '@id': person['@id'] },
    datePublished: opts.published.toISOString(),
    dateModified: (opts.modified ?? opts.published).toISOString(),
    inLanguage: 'en-IN',
    mainEntityOfPage: `${site.url}${opts.path}`,
    image: `${site.url}/og-default-v2.png`,
  };
}
