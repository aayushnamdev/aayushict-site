// Phone crops for the FOMC night post. The desktop screenshots are 2600 to 2900px wide, so on a phone
// the candles and labels get tiny. Each crop keeps only the part the text talks about.
// Boxes are in original pixels. `axis` is the price scale strip on the right, joined onto the crop.
// Run: node scripts/make-phone-crops.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const dir = 'src/assets/journal/fomc-night-2026-10-28';
mkdirSync(`${dir}/phone`, { recursive: true });

const crops = {
  '01-mrkt-volatility-headline': { main: { left: 1288, top: 182, width: 765, height: 205 } },
  '02-nq-1h-gap-bsl-ssl': { main: { left: 896, top: 390, width: 637, height: 857 }, axis: { left: 2400, width: 170 } },
  '03-mrkt-information-rich-headline': { main: { left: 230, top: 378, width: 1460, height: 1946 } },
  '04-nq-1m-ifvg-entry': { main: { left: 899, top: 393, width: 547, height: 1011 }, axis: { left: 2612, width: 175 } },
  '05-nq-daily-range-box': { main: { left: 1348, top: 702, width: 477, height: 604 }, axis: { left: 2612, width: 175 } },
};

for (const [name, { main, axis }] of Object.entries(crops)) {
  const src = `${dir}/${name}.png`;
  const parts = [await sharp(src).extract(main).toBuffer()];
  let width = main.width;
  if (axis) {
    parts.push(await sharp(src).extract({ left: axis.left, top: main.top, width: axis.width, height: main.height }).toBuffer());
    width += axis.width;
  }
  const joined = await sharp({ create: { width, height: main.height, channels: 3, background: '#d1d5de' } })
    .composite(parts.map((input, i) => ({ input, left: i === 0 ? 0 : main.width, top: 0 })))
    .png().toBuffer();
  await sharp(joined).resize({ width: 1000, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(`${dir}/phone/${name}.png`);
  console.log('wrote', name);
}
