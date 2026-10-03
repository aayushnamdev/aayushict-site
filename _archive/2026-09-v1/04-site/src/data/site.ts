// Single source of truth for site-wide copy and nav. Update here, not inline in pages.
// See build-plan-v2.md §2 and §3.

export const site = {
  name: 'Aayush ICT',
  domain: 'aayushict.space',
  brandStatement: "Know what's priced in. Trade what changes.",
  specificityLine:
    'Macro, explained like I\'m sitting next to you. How CPI, NFP and the Fed move Gold, NQ and the Dollar, read through ICT.',
  promiseLine: 'Everything I read before a trade, written down, free.',
  instagram: 'https://instagram.com/aayush_ict',
  substack: 'https://TODO.substack.com',
  youtube: 'https://youtube.com/@TODO',
};

export const nav = [
  { label: 'Macro', href: '/macro' },
  { label: 'Learn', href: '/learn' },
  { label: 'Journal', href: '/journal' },
  { label: 'Watch', href: '/watch' },
  { label: 'About', href: '/about' },
];

export const startHereCta = { label: 'Start here', href: '/start-here' };

export const pathSteps = [
  {
    n: '01',
    title: 'Read the market',
    body: 'What Gold, NQ and the Dollar react to.',
    href: '/learn',
  },
  {
    n: '02',
    title: 'Read the macro',
    body: 'What priced in means, and why the expected number does not move price.',
    href: '/macro',
  },
  {
    n: '03',
    title: 'Get funded',
    body: 'Trade a firm\'s capital, not yours.',
    href: '/start-here',
  },
  {
    n: '04',
    title: 'Execute with ICT',
    body: 'Daily bias down to the intraday entry, with a stop.',
    href: '/learn/macro-events/headline-vs-core-cpi',
  },
];
