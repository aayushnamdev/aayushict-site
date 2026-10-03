// One source of truth for affiliate partners. /go/[slug] redirects are built from this file.
// Every code shows the disclosure line and lastVerified date beside it.
// Human readable mirror: 05-ops/affiliate-links.md. Keep both in sync.

export type Firm = {
  slug: string;
  name: string;
  fit: string;
  code: string | null;
  discount: string | null;
  url: string | null; // partner link. null until a real link exists
  pros: string[];
  cons: string[];
  lastVerified: string | null; // YYYY-MM-DD, a real date
  isAffiliate: boolean;
  active: boolean; // false = no redirect is built and no card is shown
};

export const firms: Firm[] = [
  {
    slug: 'fundednext',
    name: 'FundedNext',
    fit: 'Gold and forex traders on MT5',
    code: 'AAYUSH',
    discount: '10% off',
    url: 'https://fundednext.com/?fpr=AAYUSH',
    pros: [],
    cons: [],
    lastVerified: '2026-10-02',
    isAffiliate: true,
    active: true,
  },
  {
    slug: 'apex',
    name: 'Apex Trader Funding',
    fit: 'NQ and MNQ futures',
    code: null, // TODO real code
    discount: null,
    url: null, // TODO real link
    pros: [],
    cons: [],
    lastVerified: null,
    isAffiliate: true,
    active: false, // switch on once a code and link exist
  },
  {
    slug: 'mrkt',
    name: 'MRKT (Market Edge AI)',
    fit: 'Macro terminal I use to see what is priced in',
    code: null,
    discount: null,
    url: 'https://www.mrktedge.ai/?ref=aayush',
    pros: [],
    cons: [],
    lastVerified: '2026-09-27',
    isAffiliate: true,
    active: true,
  },
];

export const disclosureLine =
  'Affiliate link. The code gives you a discount and I earn a commission. It does not change what I write.';

export const liveFirms = () => firms.filter((f) => f.active && f.url);
export const getFirm = (slug: string) => firms.find((f) => f.slug === slug);
