## Project rules (aayushict.space)

Astro + MDX on Vercel. Build plan: `../00-strategy/BUILD-PLAN.md`. Approved design: `../01-brand/reference-site.html`.
Brand rules in text: `../01-brand/brand-schema.md`. Tokens: `src/styles/tokens.css` (copy of `../01-brand/tokens.css` plus a few extras at the bottom).
v1 (27 Sep light theme build) is archived in `../_archive/2026-09-v1/`. Do not build from it.

Match `reference-site.html` exactly for layout, colour and type.

### Ground rules
1. Tokens only. No raw hex in components or pages. The one exception is the `theme-color` meta tag.
2. Never use em dashes or hyphens as connectors in any copy.
3. Direction is always an arrow plus a word. Never colour alone.
4. Check every page at 375px and 1280px.
5. Goal is audience, not sales. Affiliates only. No popups.
6. Sentences about 9 to 13 words. First person. Never "hawkish" or "dovish". Real numbers only.
7. Every market post ends with "Not advice. Stop loss on." (PostLayout renders it. Do not repeat it in MDX.)
8. Interactive controls are at least 44px tall and work by keyboard and touch.
9. Reading pages use a 760px column and 18px body (`--read-width`, `--read-body` in tokens.css), not the 900px and 21px in brand-schema. Aayush's call. Do not change without asking.
10. Small text on black uses `--rose-text`, not `--rose` (rose is 3.8:1 there, under the 4.5:1 minimum). Focus rings on wine bands are white.
11. Lean launch: the nav lists only real pages. Do not link to a page that does not exist. Build a section's index page first, then add it to `nav` in `src/config/site.ts` and the home tiles. While building a page, add its path to `pending` (noindex, out of the sitemap) and remove it when real.
12. Keep the skip link, the `#live` region (announce confirmations through it) and one h1 per page. Headings never skip a level.
13. Do not put two widgets in a row. About one widget per 120 to 180 words. Depth goes in tap boxes.

### Affiliates
- Firms live in `src/config/firms.ts` only. `/go/<slug>` redirects are built from it in `astro.config.mjs`.
- Never hardcode a partner URL in a page or MDX file.
- Every code shows the disclosure line and a last verified date beside it.
- No code above the first useful paragraph. At most one inline call to action per article.
- A firm with `active: false` gets no `/go` redirect. Apex is not an affiliate: it is `active: false` and the page links to its `url` directly with `rel="noopener"` and the line "Not an affiliate link."

### Email
Buttondown (newsletter `aayushict`, double opt-in). `src/config/email.ts` holds the public form action. The API key stays in `.env` and never goes in the site.

### Content
Collections: `macro`, `learn`, `journal` in `src/content/`. Schemas in `src/content.config.ts` follow BUILD-PLAN section 3.
Learn guides live at `src/content/learn/<category>/<slug>.mdx`.

### Commands
`npm run dev` (run in background), `npm run build`, `npm run check`. Deploy by pushing to `main` (GitHub is connected to Vercel). How to add a post: `PUBLISHING.md`.

### Current brief (Oct 2026 to Jan 2027)
Goal is Instagram follows first, email second. Read `../00-strategy/homepage-spec-2026-10.md` before touching the homepage, header, footer or email forms. Do not mention a course anywhere.
