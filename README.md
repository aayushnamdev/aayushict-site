# Aayush ICT Website

Trading and macro site at **aayushict.space**. Angle: what's priced in, and what would change it.
Macro events (CPI, FOMC, NFP) connected to real price in Gold, NQ and the Dollar, read through ICT.

## Folder map
| Folder | What it's for |
|---|---|
| `00-strategy/` | The build plan, requirements, and a dated decisions log |
| `02-brand/` | Voice rules and design tokens — read before writing or styling anything |
| `03-content/` | Writing workspace: drafts, content ideas, MDX templates. **Not published directly.** |
| `04-site/` | The actual Astro website. This is the only folder Vercel deploys. |
| `05-ops/` | Affiliate link tracking and the launch checklist |

## How to publish a post
1. Draft in `03-content/drafts/`, in Aayush's voice (see `02-brand/voice-guide.md`).
2. Pick the right template in `03-content/templates/` (briefing / guide / journal entry) and
   fill in the frontmatter.
3. Run it against the voice checklist: sentence length, no em dashes, heading density.
4. Copy the finished MDX into `04-site/src/content/<collection>/` (`macro`, `learn`, or `journal`).
5. `cd 04-site && npm run dev`, check it renders, then commit and `vercel --prod` to publish.

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
