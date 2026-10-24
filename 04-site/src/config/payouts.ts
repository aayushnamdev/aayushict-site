// Every payout, from Aayush's own dashboards and certificates. One source for the table and the total.
// Amounts in US dollars. Source for each row: the Apex payout history page (screenshot, 24 Oct 2026)
// and the Alpha Capital lifetime payouts certificate. Update this file when a new payout is paid.
// `proof` is the id of the image in certificates.ts that shows the row's "View proof" button.
export type Payout = {
  date: string; // YYYY-MM-DD, the date shown on the dashboard or certificate
  firm: 'Apex Trader Funding' | 'Alpha Capital';
  amount: number;
  status: 'paid' | 'approved';
  note?: string;
  proof?: string;
};

export const payouts: Payout[] = [
  { date: '2026-10-20', firm: 'Apex Trader Funding', amount: 1051, status: 'paid', proof: 'proof-apex-1051' },
  { date: '2026-10-09', firm: 'Apex Trader Funding', amount: 1534, status: 'paid', proof: 'proof-apex-1534' },
  { date: '2026-10-01', firm: 'Apex Trader Funding', amount: 1500, status: 'paid', proof: 'proof-apex-1500-oct' },
  { date: '2026-09-03', firm: 'Apex Trader Funding', amount: 1366, status: 'paid', proof: 'proof-apex-1366' },
  { date: '2026-08-27', firm: 'Apex Trader Funding', amount: 596, status: 'paid', proof: 'proof-apex-596' },
  { date: '2026-08-13', firm: 'Apex Trader Funding', amount: 1446, status: 'paid', proof: 'proof-apex-1446' },
  { date: '2026-08-06', firm: 'Apex Trader Funding', amount: 1131, status: 'paid', proof: 'proof-apex-1131' },
  { date: '2026-07-08', firm: 'Apex Trader Funding', amount: 1395, status: 'paid', proof: 'proof-apex-1395' },
  { date: '2026-06-29', firm: 'Apex Trader Funding', amount: 1500, status: 'paid', proof: 'proof-apex-1500-jun' },
  { date: '2025-06-13', firm: 'Apex Trader Funding', amount: 536, status: 'paid', proof: 'proof-apex-536', note: 'No certificate. Dashboard row' },
  { date: '2025-03-13', firm: 'Apex Trader Funding', amount: 1415, status: 'paid', proof: 'proof-apex-1415', note: 'No certificate. Dashboard row' },
  { date: '2025-02-14', firm: 'Alpha Capital', amount: 3006, status: 'paid', proof: 'proof-alpha-3006', note: 'Lifetime total on the certificate' },
];

export const asOf = '24 Oct 2026';
export const paidTotal = payouts.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
export const pendingTotal = payouts.filter((p) => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);
export const paidShort = `$${(paidTotal / 1000).toFixed(1)}K`; // 16476 becomes $16.5K
export const money = (n: number) => `$${n.toLocaleString('en-US')}`;
