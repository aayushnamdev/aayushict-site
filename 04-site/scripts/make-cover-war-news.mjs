// Home page cover for "War News, and Gold Fell. Why?" (1 Nov 2026): the seesaw rule, broken.
// Run: node scripts/make-cover-war-news.mjs   Output goes next to the post's charts. Same look as the banners and stories.
import sharp from 'sharp';

const page = '#141011', heading = '#F6F1EE', rose = '#B44C6C', wine = '#6E1A33', soft = '#8C7F82';
const down = '#FFB27A', surface = '#1E1719', line = '#4A3A3F';
const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "'Menlo', 'Courier New', monospace";
const out = 'src/assets/macro/war-news-and-gold-fell-2026-11-01/cover-seesaw-broke.png';

// Plank pieces as rotated rounded rects around the pivot at the top of the fulcrum.
const px = 600, py = 560;
const plank = (side) => {
  const a = side === 'L' ? -16 : 16; // both ends drop: nothing on the other side goes up
  const x = side === 'L' ? px - 520 : px + 14;
  return `<g transform="rotate(${a} ${px} ${py})"><rect x="${x}" y="${py - 22}" width="506" height="44" rx="10" fill="${heading}"/></g>`;
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="${page}"/>

  <!-- the old rule, as a ghost: one side up, one side down -->
  <g transform="rotate(-10 ${px} ${py})" opacity="0.9"><rect x="${px - 520}" y="${py - 22}" width="1040" height="44" rx="10" fill="none" stroke="${line}" stroke-width="4" stroke-dasharray="14 12"/></g>
  <text x="900" y="400" text-anchor="middle" font-family="${mono}" font-size="30" letter-spacing="6" fill="${soft}">THE OLD RULE</text>

  <!-- fulcrum and ground -->
  <polygon points="${px},${py + 22} ${px - 96},800 ${px + 96},800" fill="${wine}"/>
  <rect x="0" y="800" width="1200" height="14" fill="${wine}"/>

  <!-- the broken plank: two pieces, both dropping -->
  ${plank('L')}${plank('R')}

  <!-- gold and nasdaq on the ends -->
  <circle cx="132" cy="${py + 142}" r="74" fill="#E3B341"/>
  <circle cx="132" cy="${py + 142}" r="56" fill="none" stroke="#9C7A1E" stroke-width="6"/>
  <text x="132" y="${py + 164}" text-anchor="middle" font-family="${font}" font-weight="800" font-size="62" fill="#7A5C12">Au</text>
  <rect x="${1068 - 74}" y="${py + 68}" width="148" height="148" rx="22" fill="${surface}" stroke="${rose}" stroke-width="6"/>
  <text x="1068" y="${py + 160}" text-anchor="middle" font-family="${font}" font-weight="800" font-size="56" fill="${heading}">NQ</text>
  <polyline points="${1068 - 46},${py + 176} ${1068 - 14},${py + 196} ${1068 + 6},${py + 184} ${1068 + 46},${py + 206}" fill="none" stroke="${down}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- bitcoin, falling through the middle -->
  <circle cx="600" cy="170" r="70" fill="#F7931A"/>
  <text x="600" y="192" text-anchor="middle" font-family="${font}" font-weight="800" font-size="58" fill="#fff">BTC</text>
  <g stroke="${rose}" stroke-width="8" stroke-linecap="round"><line x1="552" y1="30" x2="552" y2="80"/><line x1="600" y1="12" x2="600" y2="70"/><line x1="648" y1="30" x2="648" y2="80"/></g>
  <text x="600" y="290" text-anchor="middle" font-family="${mono}" font-size="34" letter-spacing="6" fill="${soft}">BITCOIN</text>

  <!-- numbers -->
  <text x="60" y="130" font-family="${mono}" font-weight="700" font-size="76" fill="${down}">▼ 3.3%</text>
  <text x="60" y="186" font-family="${mono}" font-size="34" letter-spacing="6" fill="${soft}">GOLD</text>
  <text x="1140" y="130" text-anchor="end" font-family="${mono}" font-weight="700" font-size="76" fill="${down}">▼ 3.46%</text>
  <text x="1140" y="186" text-anchor="end" font-family="${mono}" font-size="34" letter-spacing="6" fill="${soft}">NASDAQ</text>
  <rect x="0" y="886" width="1200" height="14" fill="${wine}"/>
</svg>`;

await sharp(Buffer.from(svg), { density: 144 }).png().toFile(out);
console.log('wrote', out);
