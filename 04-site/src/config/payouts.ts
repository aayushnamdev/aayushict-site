// Every payout, from Aayush's own dashboards and certificates. ONE source for the home pile, the About grid,
// the About table, the total and the "as of" date. Update this file when a new payout is paid, nothing else.
// Dates are the certificate dates (approved date). Rows with no certificate use the dashboard date.
// Amounts in US dollars. Newest first.
import apex1051 from '../assets/proof/apex-1051-payout-2026-10-20.png';
import apex1534 from '../assets/proof/apex-1534-payout-2026-10-09.png';
import apex1500oct from '../assets/proof/apex-1500-payout-2026-09-30.png';
import apex1366 from '../assets/proof/apex-1366-payout-2026-09-02.png';
import apex596 from '../assets/proof/apex-596-payout-2026-08-26.png';
import apex1446 from '../assets/proof/apex-payout-2026-08-12.png';
import apex1131 from '../assets/proof/apex-1131-payout-2026-08-05.png';
import apex1395 from '../assets/proof/apex-1395-payout-2026-07-07.png';
import apex1500jun from '../assets/proof/apex-1500-payout-2026-06-26.png';
import apex536 from '../assets/proof/apex-536-dashboard-2025-06-13.png';
import apex1415 from '../assets/proof/apex-1415-dashboard-2025-03-13.png';
import alpha3006 from '../assets/proof/alpha-capital-lifetime-2025-02-14.png';

export type Payout = {
  id: string; // also the id of the large-view dialog
  date: string; // YYYY-MM-DD, the date on the certificate (or on the dashboard row when there is no certificate)
  firm: 'Apex Trader Funding' | 'Alpha Capital';
  amount: number;
  status: 'paid' | 'approved';
  note?: string;
  src: ImageMetadata;
  kind?: 'certificate' | 'dashboard'; // dashboard = masked crop of the Apex payout history (scripts/make-payout-proof.mjs)
  alt?: string; // only for rows that are not a plain Apex certificate
  caption?: string;
};

export const payouts: Payout[] = [
  { id: 'proof-apex-1051', date: '2026-10-20', firm: 'Apex Trader Funding', amount: 1051, status: 'paid', src: apex1051 },
  { id: 'proof-apex-1534', date: '2026-10-09', firm: 'Apex Trader Funding', amount: 1534, status: 'paid', src: apex1534 },
  { id: 'proof-apex-1500-oct', date: '2026-09-30', firm: 'Apex Trader Funding', amount: 1500, status: 'paid', src: apex1500oct },
  { id: 'proof-apex-1366', date: '2026-09-02', firm: 'Apex Trader Funding', amount: 1366, status: 'paid', src: apex1366 },
  { id: 'proof-apex-596', date: '2026-08-26', firm: 'Apex Trader Funding', amount: 596, status: 'paid', src: apex596 },
  { id: 'proof-apex-1446', date: '2026-08-12', firm: 'Apex Trader Funding', amount: 1446, status: 'paid', src: apex1446 },
  { id: 'proof-apex-1131', date: '2026-08-05', firm: 'Apex Trader Funding', amount: 1131, status: 'paid', src: apex1131 },
  { id: 'proof-apex-1395', date: '2026-07-07', firm: 'Apex Trader Funding', amount: 1395, status: 'paid', src: apex1395 },
  { id: 'proof-apex-1500-jun', date: '2026-06-26', firm: 'Apex Trader Funding', amount: 1500, status: 'paid', src: apex1500jun },
  {
    id: 'proof-apex-536', date: '2025-06-13', firm: 'Apex Trader Funding', amount: 536, status: 'paid', src: apex536, kind: 'dashboard',
    note: 'No certificate. Dashboard row',
    alt: 'Apex Trader Funding payout history row: $536, requested 13 June 2025, status Paid. Account number hidden.',
    caption: 'Apex, $536, 13 Jun 2025. Dashboard, no certificate',
  },
  {
    id: 'proof-apex-1415', date: '2025-03-13', firm: 'Apex Trader Funding', amount: 1415, status: 'paid', src: apex1415, kind: 'dashboard',
    note: 'No certificate. Dashboard row',
    alt: 'Apex Trader Funding payout history row: $1,415, requested 13 March 2025, status Paid. Account number hidden.',
    caption: 'Apex, $1,415, 13 Mar 2025. Dashboard, no certificate',
  },
  {
    id: 'proof-alpha-3006', date: '2025-02-14', firm: 'Alpha Capital', amount: 3006, status: 'paid', src: alpha3006,
    note: 'Several payouts in 2024 and 2025. Lifetime total on the certificate',
    alt: 'Alpha Capital lifetime payouts certificate for Aayush Namdev, $3,006 across several payouts in 2024 and 2025, dated 14 February 2025',
    caption: 'Alpha Capital, $3,006 across several payouts, 2024 to 2025',
  },
];

export const asOf = '24 Oct 2026';
export const paidTotal = payouts.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
export const pendingTotal = payouts.filter((p) => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);
export const paidShort = `$${(paidTotal / 1000).toFixed(1)}K`; // 16476 becomes $16.5K
export const money = (n: number) => `$${n.toLocaleString('en-US')}`;

// "9 Apex payouts since June 2026": Apex certificates dated 2026.
export const apex2026Count = payouts.filter((p) => p.firm === 'Apex Trader Funding' && p.kind !== 'dashboard' && p.date.startsWith('2026')).length;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const parts = (d: string) => d.split('-').map(Number) as [number, number, number];
export const shortDate = (d: string) => { const [y, m, day] = parts(d); return `${day} ${months[m - 1]} ${y}`; };
export const longDate = (d: string) => { const [y, m, day] = parts(d); return `${day} ${longMonths[m - 1]} ${y}`; };

export type Certificate = { id: string; src: ImageMetadata; alt: string; caption: string; kind?: 'certificate' | 'dashboard' };
// Pile and grid read this. Alt text and captions follow the row, so they cannot drift from the table.
export const certificates: Certificate[] = payouts.map((p) => ({
  id: p.id,
  src: p.src,
  kind: p.kind,
  alt: p.alt ?? `Apex Trader Funding rewards certificate for Aayush Namdev, ${money(p.amount)}, approved ${longDate(p.date)}`,
  caption: p.caption ?? `Apex, ${money(p.amount)}, ${shortDate(p.date)}`,
}));
