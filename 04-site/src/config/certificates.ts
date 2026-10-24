// Payout certificates, newest first. One list for the About grid and the home page stack.
// Add a new certificate here when a payout is paid, and add its row in payouts.ts.
import apex1051 from '../assets/proof/apex-1051-payout-2026-10-20.png';
import apex1534 from '../assets/proof/apex-1534-payout-2026-10-09.png';
import apex1500oct from '../assets/proof/apex-1500-payout-2026-09-30.png';
import apex1131 from '../assets/proof/apex-1131-payout-2026-08-05.png';
import apex1395 from '../assets/proof/apex-1395-payout-2026-07-07.png';
import apex1500jun from '../assets/proof/apex-1500-payout-2026-06-26.png';
import apex1366 from '../assets/proof/apex-1366-payout-2026-09-02.png';
import apex596 from '../assets/proof/apex-596-payout-2026-08-26.png';
import apex1446 from '../assets/proof/apex-payout-2026-08-12.png';
import apex536 from '../assets/proof/apex-536-dashboard-2025-06-13.png';
import apex1415 from '../assets/proof/apex-1415-dashboard-2025-03-13.png';
import alpha3006 from '../assets/proof/alpha-capital-lifetime-2025-02-14.png';

// kind 'dashboard' is a masked crop of the Apex payout history, for payouts with no certificate.
// Account numbers are covered (see scripts/make-payout-proof.mjs). Dashboard crops stay out of the home stack.
export type Certificate = { id: string; src: ImageMetadata; alt: string; caption: string; kind?: 'certificate' | 'dashboard' };

export const certificates: Certificate[] = [
  { id: 'proof-apex-1051', src: apex1051, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,051, approved 20 October 2026', caption: 'Apex, $1,051, 20 Oct 2026' },
  { id: 'proof-apex-1534', src: apex1534, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,534, approved 9 October 2026', caption: 'Apex, $1,534, 9 Oct 2026' },
  { id: 'proof-apex-1500-oct', src: apex1500oct, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,500, approved 30 September 2026', caption: 'Apex, $1,500, 30 Sep 2026' },
  { id: 'proof-apex-1366', src: apex1366, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,366, approved 2 September 2026', caption: 'Apex, $1,366, 2 Sep 2026' },
  { id: 'proof-apex-596', src: apex596, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $596, approved 26 August 2026', caption: 'Apex, $596, 26 Aug 2026' },
  { id: 'proof-apex-1446', src: apex1446, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,446, approved 12 August 2026', caption: 'Apex, $1,446, 12 Aug 2026' },
  { id: 'proof-apex-1131', src: apex1131, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,131, approved 5 August 2026', caption: 'Apex, $1,131, 5 Aug 2026' },
  { id: 'proof-apex-1395', src: apex1395, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,395, approved 7 July 2026', caption: 'Apex, $1,395, 7 Jul 2026' },
  { id: 'proof-apex-1500-jun', src: apex1500jun, alt: 'Apex Trader Funding rewards certificate for Aayush Namdev, $1,500, approved 26 June 2026', caption: 'Apex, $1,500, 26 Jun 2026' },
  { id: 'proof-apex-536', kind: 'dashboard', src: apex536, alt: 'Apex Trader Funding payout history row: $536, requested 13 June 2025, status Paid. Account number hidden.', caption: 'Apex, $536, 13 Jun 2025. Dashboard, no certificate' },
  { id: 'proof-apex-1415', kind: 'dashboard', src: apex1415, alt: 'Apex Trader Funding payout history row: $1,415, requested 13 March 2025, status Paid. Account number hidden.', caption: 'Apex, $1,415, 13 Mar 2025. Dashboard, no certificate' },
  { id: 'proof-alpha-3006', src: alpha3006, alt: 'Alpha Capital lifetime payouts certificate for Aayush Namdev, $3,006 across several payouts in 2024 and 2025, dated 14 February 2025', caption: 'Alpha Capital, $3,006 across several payouts, 2024 to 2025' },
];
