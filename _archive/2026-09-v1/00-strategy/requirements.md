# Requirements: v1 (lean launch)

Source of truth is `build-plan-v2.md`. This file narrows it to what ships now vs later,
so nothing gets built twice and nothing gets forgotten.

## Must have for v1 (go-live)
- [ ] Astro site scaffolded in `04-site/`, deployed to Vercel
- [ ] Design tokens from plan §6.2 applied (light theme only)
- [ ] Header (sticky, nav from plan §3, "Start here" styled as a button), Footer with disclaimer + socials
- [ ] Home page: hero (two doors), this week in macro, the path (4 steps), what's new, one worked
      "how one event plays out" example, popular guides stub, journal preview, footer
- [ ] Macro Desk index + one full briefing page template, 3 seeded briefings
- [ ] Learn index + one category + one full guide (headline vs core CPI)
- [ ] Journal index with call totals, 1 seeded call
- [ ] Start here page: disclosure first, firm split (CFD vs futures), FundedNext card live,
      Apex card present but inactive, MRKT tool link, FAQ
- [ ] About page with the operating model from plan §2 (risk rule left visible as TODO)
- [ ] /disclosure /disclaimer /privacy pages
- [ ] `/go/[slug]` redirects wired to `partners.ts`
- [ ] 404 page
- [ ] Mobile-first, checked at 375px
- [ ] No em dashes anywhere in shipped copy

## Ships as "coming soon" in v1
- [ ] /watch (playlists) — page exists, says content is coming
- [ ] /tools depth pages — MRKT top-level link only
- [ ] /macro/series/[slug] — not built yet, no series page needed until 2+ briefings link to one

## Explicitly deferred (do not build now)
See build-plan-v2.md phases 5-8 and section 12 "Open items":
- Filter chips on Macro Desk, OG image generation, sitemap/RSS polish, analytics wiring
- Dark theme
- Real FundedNext affiliate URL + Apex code (using TODO placeholders until he supplies them)
- Profile photo, reel embed URLs
- His personal risk rule for the About page
- India payout guides (only write ones for payouts he's actually done)

## Open items blocking full content (plan §12, carried over)
- [ ] Apex affiliate code, if any
- [ ] Real FundedNext affiliate URL
- [ ] Honest pros/cons per firm, in his words
- [ ] Which payouts to India he's actually done
- [ ] Profile photo
- [ ] Reel URLs per briefing
- [ ] His risk rule (stop size, R:R) for About
