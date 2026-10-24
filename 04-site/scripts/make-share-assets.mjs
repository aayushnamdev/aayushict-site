// Makes public/og-default-v2.png (1200x630 share image), favicon.ico and the home screen icons from brand colours.
// The share image has a version in its name so Instagram and Facebook fetch it fresh, not from their cache.
// Run: node scripts/make-share-assets.mjs
// Uses sharp, which Astro already installs. Text uses system fonts, so the wordmark is not Aptos or Figtree.
// Colours here are copies of tokens.css (an image cannot read CSS variables).
import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'node:fs';

const page = '#141011', heading = '#F6F1EE', rose = '#B44C6C', wine = '#6E1A33', muted = '#C9BEC1';
const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${page}"/>
  <rect x="0" y="606" width="1200" height="24" fill="${wine}"/>
  <text x="80" y="150" font-family="${font}" font-weight="700" font-size="64" letter-spacing="-2" fill="${heading}">aayush<tspan fill="${rose}">ict</tspan></text>
  <text x="80" y="330" font-family="${font}" font-weight="700" font-size="84" letter-spacing="-2" fill="${heading}">Know what's priced in.</text>
  <text x="80" y="430" font-family="${font}" font-weight="700" font-size="84" letter-spacing="-2" fill="${heading}">Trade what changes.</text>
  <text x="80" y="520" font-family="${font}" font-size="34" fill="${muted}">Macro and Nasdaq futures, from India</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og-default-v2.png');

// Share cards with his photo. Versioned names so Instagram, WhatsApp and X fetch them fresh.
// The portrait sits in a rounded frame on the right, the headline on the left.
const portraitBuf = await sharp('src/assets/photos/portrait.jpg').resize(380, 475, { fit: 'cover', position: 'top' }).png().toBuffer();
const round = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="380" height="475"><rect width="380" height="475" rx="26" fill="#fff"/></svg>`);
const framed = await sharp(portraitBuf).composite([{ input: round, blend: 'dest-in' }]).png().toBuffer();
const card = (lines, sub) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${page}"/>
  <rect x="0" y="606" width="1200" height="24" fill="${wine}"/>
  <rect x="738" y="62" width="404" height="499" rx="34" fill="#1d1618" stroke="${wine}" stroke-width="3"/>
  <text x="70" y="130" font-family="${font}" font-weight="700" font-size="56" letter-spacing="-2" fill="${heading}">aayush<tspan fill="${rose}">ict</tspan></text>
  ${lines.map((l, i) => `<text x="70" y="${300 + i * 92}" font-family="${font}" font-weight="700" font-size="${l.size ?? 76}" letter-spacing="-2" fill="${l.fill ?? heading}">${l.text}</text>`).join('\n  ')}
  <text x="70" y="${300 + lines.length * 92 + 24}" font-family="${font}" font-size="32" fill="${muted}">${sub}</text>
</svg>`;
const withPhoto = async (svg, file) => sharp(Buffer.from(svg)).composite([{ input: framed, left: 750, top: 74 }]).png().toFile(file);
await withPhoto(card([{ text: "Know what's priced in." }, { text: 'Trade what changes.' }], 'Macro and Nasdaq futures, from India'), 'public/og-default-v3.png');
await withPhoto(card([{ text: 'How I trade.', size: 84 }, { text: 'Coming soon.', size: 84, fill: rose }], 'The model behind about 95% of my trades'), 'public/og-how-i-trade-v1.png');
console.log('wrote og-default-v3.png, og-how-i-trade-v1.png');

// favicon.ico: one 48x48 PNG inside an ICO container (valid for every current browser).
const png = await sharp(readFileSync('public/favicon.svg'), { density: 384 }).resize(48, 48).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4); // ICONDIR: reserved, type icon, 1 image
header.writeUInt8(48, 6); header.writeUInt8(48, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([header, png]));

// Home screen icons: a full square (the phone rounds the corners itself), same mark as the favicon.
const square = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${page}"/>
  <text x="32" y="43" text-anchor="middle" font-family="${font}" font-weight="800" font-size="34" letter-spacing="-1" fill="${heading}">a<tspan fill="${rose}">i</tspan></text>
</svg>`;
for (const [name, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(Buffer.from(square(size)), { density: 384 }).resize(size, size).png().toFile(`public/${name}`);
}
console.log('wrote og-default-v2.png, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png');
