// Used for structured data. Only facts Aayush has stated on the site.
export const person = {
  '@type': 'Person',
  name: 'Aayush Namdev',
  url: 'https://aayushict.space',
  sameAs: ['https://www.instagram.com/aayush_ict/'],
} as const;

export const site = {
  name: 'aayushict',
  url: 'https://aayushict.space',
  tagline: "Know what's priced in. Trade what changes.",
  signOff: 'Not advice. Stop loss on.',
  footerLine: 'Not a signal service. Not advice. Stop loss on.',
  nav: [
    { label: 'Macro', href: '/macro' },
    { label: 'Learn', href: '/learn' },
    { label: 'Journal', href: '/journal' },
    { label: 'Watch', href: '/watch' },
    { label: 'About', href: '/about' },
  ],
  cta: { label: 'Start here', href: '/start-here' },
  // Pages that exist only as "coming next" shells. They get noindex and stay out of the sitemap.
  // Remove a path from this list when its real page is built.
  pending: ['/macro', '/learn', '/journal', '/watch', '/about', '/disclosure', '/disclaimer', '/privacy'] as string[],
  legal: [
    { label: 'Disclosure', href: '/disclosure' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Privacy', href: '/privacy' },
  ],
} as const;
