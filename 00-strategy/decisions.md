# Decisions log

Dated record of locked calls. Add to this, don't rewrite history.

## 2026-09-13
- Own hosting on Vercel, not a managed platform (WordPress, Substack-only, Ghost rejected).
- Macro notes are the lead content track. ICT guides and affiliate pages sit underneath.
- Affiliate-only revenue for now. No paid product or service.
- Bar: a visitor should feel the page is the best version of that topic on the internet, not an AI-slop copy of vedictrades.blog.

## 2026-09-27
- Stack: **Astro + MDX**, not Next.js. Aayush said the framework doesn't matter to him, he wants
  "a website with all the information, hosted on Vercel, connected to my domain." Astro is what
  the v2 build plan (`00-strategy/build-plan-v2.md`) specifies, is lighter for a content site, and
  still supports interactive islands (copy buttons, priced-in meter, later charts).
- Hero brand statement: **"Know what's priced in. Trade what changes."**
- v1 scope is a lean launch: Home, Macro (index + briefing), Learn (index + one guide), Journal,
  Start here, About, legal pages, `/go/[slug]` redirects. Watch and Tools ship as "coming soon."
  Everything else in the v2 plan (section 10, phases 5-8) comes after the site is live.
- Domain: aayushict.space, bought and connected to Vercel after the first deploy.

## 2026-10-03
- New design pack (`01-brand/`, `00-strategy/BUILD-PLAN.md`) replaces the 27 Sep v1 build. Dark first: black for reading, wine for brand, white for things you touch.
- v1 archived in `_archive/2026-09-v1/` (site, build-plan-v2, requirements, old brand docs, old templates). Kept live: drafts, Assets, front-page notes, site-brief, ops.
- Fresh Astro 7 + MDX project in `04-site/` with Vercel adapter, self-hosted Google fonts via the Astro Fonts API, content collections per BUILD-PLAN section 3. Pages are empty shells. Widgets and real pages come piece by piece.
- `/tools` page dropped. Tools live inside Start here.
- Affiliate redirects are built from `src/config/firms.ts`. Apex stays off until a code and link exist.
- Home page stays short (reference design). `/start-here` is the long reading page: the 7 Aug night, the firm picker with FundedNext, Apex and MRKT, and a short FAQ. There is no separate firms page and no `/tools` page.
- Apex is a plain non-affiliate link: no code, no `/go/apex` redirect.

- Reading pages (Start here, and later Macro, Learn, Journal posts) use a 760px column and 18px body text (17px phone), tighter paragraph gaps and smaller headings. Aayush compared them with the Claude chat and found the brand-schema size (900px, 21px) too big. Home page keeps the brand sizes. The header lines up with the text column on reading pages.
- Audit fixes (3 Oct): small text on black uses --rose-text #BF6581, white focus rings on wine, skip link, live region, noindex plus sitemap filter for shell pages (`pending` list in site.ts), share image, JSON-LD, robots.txt, llms.txt, favicon.ico, RSS autodiscovery, lang en-IN. `.claude/skills/` is git-ignored.
- Lean launch built (4 Oct): nav is About plus the Start here button. Empty Macro, Learn, Journal and Watch pages were removed (visitors get the real 404). Real pages: Home, Start here, About, Disclosure, Disclaimer, Privacy, 404. Email goes to Buttondown (newsletter aayushict, double opt-in). Contact is Instagram DM until a dedicated email exists. `pending` in site.ts is empty.
- When a section is ready (Macro, Learn, Journal, Watch): build its index page, add it to `nav` in site.ts and to the home tiles, and rely on the sitemap picking it up.
