// Single source of truth for affiliate partners. See build-plan-v2.md §8.
// Human-readable mirror lives in 05-ops/affiliate-links.md · keep both in sync.

export type Partner = {
  slug: string;
  name: string;
  type: 'prop-firm' | 'tool' | 'software';
  market?: 'cfd' | 'futures';
  status?: 'trade-funded' | 'used-to' | 'recommend';
  code?: string;
  discount?: string;
  url: string;
  forWhat: string;
  pros: string[];
  cons: string[];
  indiaPayoutGuide: string | null;
  lastVerified: string;
  active: boolean;
};

export const partners: Partner[] = [
  {
    slug: 'fundednext',
    name: 'FundedNext',
    type: 'prop-firm',
    market: 'cfd',
    status: 'recommend',
    code: 'AAYUSH',
    discount: '10% off',
    url: 'https://fundednext.com/?fpr=AAYUSH',
    forWhat: 'Gold and forex traders on MT5',
    pros: [],
    cons: [],
    indiaPayoutGuide: null,
    lastVerified: '2026-10-02',
    active: true,
  },
  {
    slug: 'apex',
    name: 'Apex Trader Funding',
    type: 'prop-firm',
    market: 'futures',
    status: 'trade-funded',
    code: 'TODO',
    discount: 'TODO',
    url: 'TODO',
    forWhat: 'NQ and MNQ futures',
    pros: [],
    cons: [],
    indiaPayoutGuide: null,
    lastVerified: '',
    active: false, // switch on once a code exists
  },
  {
    slug: 'mrkt',
    name: 'MRKT (Market Edge AI)',
    type: 'tool',
    url: 'https://www.mrktedge.ai/?ref=aayush',
    forWhat: 'Macro terminal I use to see what is priced in',
    pros: [],
    cons: [],
    indiaPayoutGuide: null,
    lastVerified: '2026-09-27',
    active: true,
  },
];

export function getPartner(slug: string): Partner | undefined {
  return partners.find((p) => p.slug === slug);
}

export function activePartners(): Partner[] {
  return partners.filter((p) => p.active);
}
