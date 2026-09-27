## Project rules (Aayush ICT)

This is the Astro site for aayushict.space. Full plan: `../00-strategy/build-plan-v2.md`.
Full voice/design detail: `../02-brand/voice-guide.md` and `../02-brand/design-tokens.md`.
The three rules below are the ones most likely to get broken by accident, so they're repeated here.

### Voice (every page, every label)
- Average sentence length 9-13 words. Short. One idea per line where possible.
- Never em dashes or hyphens as sentence connectors. Commas, periods, or restructure instead.
- First person ("I watch...", "here's what happens..."). Every number carries a consequence.
- Never "hawkish"/"dovish" — say "rate hike probability" or "priced in".
- Keep real uncertainty in the text ("I could not tell you", "my read was 50/50"). Never fake
  hindsight confidence.
- Market posts end with "Not advice. Stop loss on." (already rendered by the `Disclaimer`
  component on macro/journal layouts — don't duplicate it by hand in the MDX body).
- Heading density: 1 per 250-350 words for essays/macro notes, denser (6-8 per 1,800-2,500
  words) is fine for reference guides.

### Design
- Light theme only for v1. Tokens live in `src/styles/global.css`, mirrored in
  `../02-brand/design-tokens.md`. Change both together.
- Up/down is never colour alone — always an arrow plus the word ("↓ Down"), see `ScenarioCard`.
- Body copy in `--font-body`, numbers/prices/percentages in `--font-num` (mono).
- Mobile-first. Most traffic is Instagram → phone.

### Affiliate rules
- Every partner link goes through `/go/[slug]` (see `src/pages/go/[slug].astro`), reading
  from `src/data/partners.ts` — never hardcode a partner URL inline in a page or MDX file.
- Every link to `/go/[slug]` carries `rel="sponsored nofollow noopener"`.
- Inline disclosure next to every code/CTA ("affiliate link, code gives a discount, I get a
  commission, it does not change what I write").
- Max one inline firm CTA per article, plus the end-of-article one.
- Never place a code above the first useful paragraph of an article.
- Firms are compared by fit, never ranked "best".
- `lastVerified` on every partner must be a real date, updated when terms change.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
