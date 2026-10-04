// Every payout, from Aayush's own dashboards and certificates. One source for the table and the total.
// Amounts in US dollars. Source for each row: the Apex payout dashboard (screenshot, 4 Oct 2026)
// and the Alpha Capital lifetime payouts certificate. Update this file when a new payout is paid.
export type Payout = {
  date: string; // YYYY-MM-DD, the date shown on the dashboard or certificate
  firm: 'Apex Trader Funding' | 'Alpha Capital';
  amount: number;
  status: 'paid' | 'approved';
  note?: string;
};

export const payouts: Payout[] = [
  { date: '2026-10-01', firm: 'Apex Trader Funding', amount: 1500, status: 'approved', note: 'not paid yet' },
  { date: '2026-09-03', firm: 'Apex Trader Funding', amount: 1366, status: 'paid' },
  { date: '2026-08-27', firm: 'Apex Trader Funding', amount: 596, status: 'paid' },
  { date: '2026-08-13', firm: 'Apex Trader Funding', amount: 1446, status: 'paid' },
  { date: '2026-08-06', firm: 'Apex Trader Funding', amount: 1131, status: 'paid' },
  { date: '2026-07-08', firm: 'Apex Trader Funding', amount: 1395, status: 'paid' },
  { date: '2026-06-29', firm: 'Apex Trader Funding', amount: 1500, status: 'paid' },
  { date: '2025-06-13', firm: 'Apex Trader Funding', amount: 536, status: 'paid' },
  { date: '2025-03-13', firm: 'Apex Trader Funding', amount: 1415, status: 'paid' },
  { date: '2025-02-14', firm: 'Alpha Capital', amount: 3006, status: 'paid', note: 'Lifetime total on the certificate' },
];

export const asOf = '4 Oct 2026';
export const paidTotal = payouts.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
export const pendingTotal = payouts.filter((p) => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);
export const paidShort = `$${(paidTotal / 1000).toFixed(1)}K`; // 12391 becomes $12.4K, same as the Instagram bio
export const money = (n: number) => `$${n.toLocaleString('en-US')}`;
