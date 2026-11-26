// Makes public/og-style-test-v1.jpg (1200x630 link preview for /test, shown in Telegram, Instagram and WhatsApp).
// The name has a version so apps fetch it fresh, not from their cache. Bump v1 to v2 if the card changes.
// Run: node scripts/make-test-og.mjs
// Same pattern as make-share-assets.mjs. Uses sharp. Colours are copies of tokens.css (an image cannot read CSS variables).
import sharp from 'sharp';

const page = '#141011', heading = '#F6F1EE', rose = '#B44C6C', roseText = '#BF6581', wine = '#6E1A33', muted = '#C9BEC1', raised = '#1d1618';
const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// Three style chips, names only (no sample numbers on a public card).
const chip = (x, name, top) => `
  <rect x="${x}" y="470" width="330" height="76" rx="38" fill="${top ? wine : raised}" stroke="${top ? rose : wine}" stroke-width="2"/>
  <text x="${x + 165}" y="518" text-anchor="middle" font-family="${font}" font-weight="700" font-size="32" fill="${heading}">${name}</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${page}"/>
  <rect x="0" y="606" width="1200" height="24" fill="${wine}"/>
  <text x="70" y="120" font-family="${font}" font-weight="700" font-size="56" letter-spacing="-2" fill="${heading}">aayush<tspan fill="${rose}">ict</tspan></text>
  <text x="70" y="190" font-family="${font}" font-weight="700" font-size="28" letter-spacing="3" fill="${roseText}">TRADING STYLE TEST</text>
  <text x="70" y="290" font-family="${font}" font-weight="700" font-size="76" letter-spacing="-2" fill="${heading}">Is your trading style</text>
  <text x="70" y="380" font-family="${font}" font-weight="700" font-size="76" letter-spacing="-2" fill="${rose}">fighting your mind?</text>
  <text x="70" y="440" font-family="${font}" font-size="30" fill="${muted}">Free test, 3 minutes. From my psychology training.</text>
  ${chip(70, 'Scalper', false)}
  ${chip(430, 'Intraday', false)}
  ${chip(790, 'Swing', false)}
</svg>`;

// JPEG, not PNG: WhatsApp and others skip preview images over about 300 KB.
await sharp(Buffer.from(svg)).flatten({ background: page }).jpeg({ quality: 84, mozjpeg: true }).toFile('public/og-style-test-v1.jpg');
console.log('wrote og-style-test-v1.jpg');
