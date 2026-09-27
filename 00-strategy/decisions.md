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
