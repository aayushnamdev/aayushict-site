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
