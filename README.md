# Aayush ICT Website

Trading and macro site at **aayushict.space**. Angle: what's priced in, and what would change it.
Macro events (CPI, FOMC, NFP) connected to real price in Gold, NQ and the Dollar, read through ICT.

## Folder map
| Folder | What it's for |
|---|---|
| `00-strategy/` | `BUILD-PLAN.md` (the current plan), `site-brief.md`, and the dated `decisions.md` log |
| `01-brand/` | The approved design pack: `reference-site.html`, tokens, brand schema, guide, page mockups. Read before styling anything |
| `03-content/` | Writing workspace: drafts, `Assets/` proof screenshots, front page notes. **Not published directly.** |
| `04-site/` | The actual Astro website. This is the only folder Vercel deploys. |
| `05-ops/` | Affiliate link tracking and the launch checklist |
| `_archive/` | Old work. `2026-09-v1/` is the first build (light theme). `source-zips/` holds the original zips. Never deployed |

## How to publish a post
Draft in `03-content/drafts/` in Aayush's voice (`01-brand/brand-schema.md` section 7), then follow `04-site/PUBLISHING.md`.
Pushing to `main` deploys to https://aayushict.space in about a minute.

## Local dev
```
cd 04-site
npm install
npm run dev
```

## Deploy
```
cd 04-site
vercel --prod
```
See `05-ops/launch-checklist.md` for the domain connection steps.
