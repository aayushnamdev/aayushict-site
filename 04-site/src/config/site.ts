// Used for structured data. Only facts Aayush has stated on the site.
export const person = {
  '@type': 'Person',
  '@id': 'https://aayushict.space/#aayush',
  name: 'Aayush Namdev',
  url: 'https://aayushict.space',
  image: 'https://aayushict.space/og-default-v2.png',
  sameAs: ['https://www.instagram.com/aayush_ict/', 'https://x.com/AayushICT', 'https://substack.com/@aayushnamdev'],
} as const;

// Where to find Aayush. Used by the footer and the About page.
export const social = [
  { label: 'Instagram', handle: '@aayush_ict', href: 'https://www.instagram.com/aayush_ict/' },
  { label: 'X', handle: '@AayushICT', href: 'https://x.com/AayushICT' },
  { label: 'Substack', handle: '@aayushnamdev', href: 'https://substack.com/@aayushnamdev' },
] as const;

export const site = {
  name: 'aayushict',
  url: 'https://aayushict.space',
  tagline: "Know what's priced in. Trade what changes.",
  ogAlt: "aayushict. Know what's priced in. Trade what changes. Macro and Nasdaq futures, from India.",
  signOff: 'Not advice. Stop loss on.',
  footerLine: 'Not a signal service. Not advice. Stop loss on.',
  // Lean launch: only pages that are real. Add Macro, Learn, Journal, Watch back when each has content.
  nav: [
    { label: 'Learn', href: '/learn' },
    { label: 'Journal', href: '/journal' },
    { label: 'About', href: '/about' },
  ],
  cta: { label: 'Start here', href: '/start-here' },
  // Paths of pages that exist but are not ready. They get noindex and stay out of the sitemap.
  // Add a path while building a new page, remove it when the page is real. /confirmed stays here on purpose.
  pending: ['/confirmed'] as string[], // /confirmed is real but noindex: it is only for people who just confirmed
  legal: [
    { label: 'Disclosure', href: '/disclosure' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Privacy', href: '/privacy' },
  ],
} as const;
