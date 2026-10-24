// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { firms } from './src/config/firms.ts';
import { site } from './src/config/site.ts';

// /go/<slug> redirects come from the firms config. Inactive firms get none.
// 302 on purpose: partner links change, and a 301 would be cached by browsers.
const goRedirects = Object.fromEntries(
  firms
    .filter((f) => f.active && f.url)
    .map((f) => [`/go/${f.slug}`, { status: /** @type {302} */ (302), destination: /** @type {string} */ (f.url) }])
);

const google = fontProviders.google();

export default defineConfig({
  site: 'https://aayushict.space',
  output: 'static',
  adapter: vercel({ webAnalytics: { enabled: true } }),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        return !site.pending.includes(path) && path !== '/404';
      },
    }),
  ],
  redirects: goRedirects,
  fonts: [
    {
      provider: google,
      name: 'Source Serif 4',
      cssVariable: '--astro-source-serif',
      weights: [400, 600],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: google,
      name: 'Figtree',
      cssVariable: '--astro-figtree',
      weights: [600, 700, 800],
      styles: ['normal'],
      fallbacks: ['Segoe UI', 'sans-serif'],
    },
    {
      provider: google,
      name: 'Instrument Sans',
      cssVariable: '--astro-instrument-sans',
      weights: [500, 600],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: google,
      name: 'JetBrains Mono',
      cssVariable: '--astro-jetbrains-mono',
      weights: [400, 500],
      styles: ['normal'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
