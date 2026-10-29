// Makes the link preview card for one journal post: title on the left, the post's chart on the right.
// Run: node scripts/make-post-share.mjs
// Same brand colours as make-share-assets.mjs. JPEG so WhatsApp and Instagram accept it (small file).
import sharp from 'sharp';

const page = '#141011', heading = '#F6F1EE', rose = '#B44C6C', wine = '#6E1A33', muted = '#C9BEC1';
const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const post = {
  chart: 'src/assets/journal/fomc-night-2026-10-28/phone/02-nq-1h-gap-bsl-ssl.png',
  lines: [{ text: 'FOMC night.', size: 68 }, { text: 'One scalp, then', size: 52 }, { text: 'I closed the chart.', size: 52, fill: rose }],
  sub: 'Journal · 28 Oct 2026 · NQ',
  out: 'public/og-fomc-night-2026-10-28.jpg',
};

const W = 440, H = 440, X = 700, Y = 95;
const chart = await sharp(post.chart).resize(W, H, { fit: 'cover' }).png().toBuffer();
const round = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="18" fill="#fff"/></svg>`);
const framed = await sharp(chart).composite([{ input: round, blend: 'dest-in' }]).png().toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${page}"/>
  <rect x="0" y="606" width="1200" height="24" fill="${wine}"/>
  <rect x="${X - 10}" y="${Y - 10}" width="${W + 20}" height="${H + 20}" rx="26" fill="#1d1618" stroke="${wine}" stroke-width="3"/>
  <text x="70" y="130" font-family="${font}" font-weight="700" font-size="56" letter-spacing="-2" fill="${heading}">aayush<tspan fill="${rose}">ict</tspan></text>
  ${post.lines.map((l, i) => `<text x="70" y="${290 + i * 80}" font-family="${font}" font-weight="700" font-size="${l.size}" letter-spacing="-2" fill="${l.fill ?? heading}">${l.text}</text>`).join('\n  ')}
  <text x="70" y="${290 + (post.lines.length - 1) * 80 + 70}" font-family="${font}" font-size="30" fill="${muted}">${post.sub}</text>
</svg>`;
await sharp(Buffer.from(svg)).composite([{ input: framed, left: X, top: Y }]).flatten({ background: page }).jpeg({ quality: 82, mozjpeg: true }).toFile(post.out);
console.log('wrote', post.out);
