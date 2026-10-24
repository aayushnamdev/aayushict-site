// Makes the proof images for the two Apex payouts that have no certificate (13 Jun 2025 and 13 Mar 2025).
// Each one is the dashboard table header plus that payout's row. The account number is covered with a
// solid box, not a blur, because a blurred short number can be guessed. The originals stay private in
// 03-content/Assets/payouts and are never published.
// Run: node scripts/make-payout-proof.mjs
// Uses sharp, which Astro already installs. Coordinates are from the 2000px wide view of the 3104px
// screenshots, so they are multiplied by k. Re-check them if the screenshots are ever replaced.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../../03-content/Assets/payouts/', import.meta.url));
const out = fileURLToPath(new URL('../src/assets/proof/', import.meta.url));
const top = `${dir}apex-dashboard-payout-history-2026-10-24-top.png`;
const bottom = `${dir}apex-dashboard-payout-history-2026-10-24-bottom.png`;
const k = 3104 / 2000;
const px = (n) => Math.round(n * k);

const left = 491, width = 1299; // table edges
const header = { y: 125, h: 61 };
const rows = [
  { file: 'apex-536-dashboard-2025-06-13.png', y: 766, h: 83 },
  { file: 'apex-1415-dashboard-2025-03-13.png', y: 850, h: 83 },
];
// The account number is the second line of the first column, below "PA-APEX-".
const mask = { x: 498, dy: 38, w: 112, h: 30 };

const headerBuf = await sharp(top).extract({ left: px(left), top: px(header.y), width: px(width), height: px(header.h) }).toBuffer();

for (const r of rows) {
  const w = px(width), h = px(r.h);
  const box = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect x="${px(mask.x - left)}" y="${px(mask.dy)}" width="${px(mask.w)}" height="${px(mask.h)}" rx="6" fill="#1b1b22"/>
    <text x="${px(mask.x - left + 8)}" y="${px(mask.dy + 22)}" font-family="Helvetica, Arial, sans-serif" font-size="${px(18)}" fill="#f6f1ee">••••••••</text>
  </svg>`;
  // Crop first, then cover the account number. Doing both in one pipeline gets the order wrong.
  const cropped = await sharp(bottom).extract({ left: px(left), top: px(r.y), width: w, height: h }).toBuffer();
  const rowBuf = await sharp(cropped).composite([{ input: Buffer.from(box) }]).toBuffer();
  const full = await sharp({ create: { width: w, height: px(header.h) + h, channels: 3, background: '#ffffff' } })
    .composite([{ input: headerBuf, top: 0, left: 0 }, { input: rowBuf, top: px(header.h), left: 0 }])
    .png()
    .toBuffer();
  // Resize in its own step: sharp resizes before it composites, which would shrink the canvas first.
  await sharp(full)
    .resize({ width: 1600 })
    .png({ compressionLevel: 9 })
    .toFile(out + r.file);
  console.log('wrote', r.file);
}
