# aayushict.space: design brief

Paste this whole file into Claude Chat or Claude Design. It is the full picture of the site.

## 1. What this is
A trading site by one person, Aayush Namdev. Macro events (NFP, CPI, the Fed) linked to real Nasdaq futures trades, read through ICT.

Hero line: **Know what's priced in. Trade what changes.**

The site is the written home of his Instagram reels (@aayush_ict). It should feel like the best version of this topic on the internet. It must not feel like a generic trading blog or AI filler.

Structure reference only: abhifutures.com (guides, journal, start page). Take the idea of clear sections. Do not copy its look, its words or its opening.

## 2. Who he is
- Trades NQ and MNQ only, on funded prop accounts (Apex), from India.
- Watches gold and the dollar. Does not trade them.
- Method: ICT. Background: MA Psychology, 6 years in markets.
- Not a signal service. Says so on the site.

## 3. Who it is for
- Indian retail traders, 1 to 2 years in. Many trade gold on MT5. Many follow ICT.
- Many are not native English speakers.
- Most arrive from Instagram, on a phone.

## 4. The two pillars
**Macro comes first.** What the market already expects, what would change it, and three scenarios written before each release.

**Futures comes second.** How to trade US futures from India through prop firms, and ICT execution on real trades.

Both sides stay visible together on the first screen. No Macro/Futures tabs. Tabs hide half of who he is.

## 5. Content types and where they live
| Type | Section | What it is |
|---|---|---|
| Fundamentals | Macro Desk | Event briefings: preview, post release, review |
| Technicals | Learn | ICT concepts tied to macro, like daily bias and the first candle after news |
| Guides | Learn | Answers by need: macro events, ICT with macro, prop firms, India payouts, tools, psychology |
| Trading journals | Journal | Dated calls (target, invalidation, outcome) and NQ trading days. Losing calls are never hidden |
| Experiences | open, see section 14 | Personal stories and essays |
| Videos | Watch | Reel playlists as a course. Coming soon |
| Money page | Start here | Firms by fit, codes, honest pros and cons, disclosure |

Guides teach through one real event first, then explain the terms. Never a glossary first.

## 6. Sitemap
Nav: **Macro · Learn · Journal · Watch · Start here (button) · About**

```
/                     Home
/macro                Macro Desk, newest first
/macro/[slug]         One briefing
/learn                Library, organised by need
/learn/[category]/[slug]   One guide
/journal              Call scorecard and trading days
/journal/[slug]       One entry
/watch                Playlists
/start-here           Firms, codes, tools
/tools                Software partners
/about                Operating model
/disclosure /disclaimer /privacy
/go/[partner]         Affiliate redirects
```

## 7. Page by page
**Home (approved flow).** Short text and widgets mixed.
1. Hero: label "MACRO · FUTURES · FROM INDIA", the hero line, two lines about him, a "priced in" tap tip, two side cards (macro side, futures side), proof chips (102 points, 4 MNQ, Apex payout).
2. The gap: "Most people learn one side." Four cards: chart only, news only, trading from India, and here (highlighted).
3. One real night: Friday 7 August, 6 PM India time. Three scenarios, the number flip, the chart entry, the result.
4. The honest part: "This night was rare." Most releases land near forecast and price chops.
5. What you get here, then a line and a button to the Macro Desk.

**Briefing page.** Event header (time in IST and ET, badge) → route summary → 3 to 6 context lines → numbers table (expected, previous, actual) → priced in meter → scenario cards → "what most people miss" → his direction (optional) → reel → link to the matching guide → small firm CTA with disclosure → next in series, disclaimer.

**Guide page.** Breadcrumbs → title → one line subtitle → updated date and read time → short intro → condensed route → numbered sections → tables → personal note → caveats → related.

**Journal.** Totals at top. Call entries: date, asset, direction, target, invalidation, status (Hit, Invalidated, Open, Dropped).

**Start here.** Disclosure first. Then two paths: "I trade gold on MT5" and "I trade NQ or futures". Firm cards with code copy button, discount, pros and cons, last verified date. Then tools, then FAQ.

**About.** Photo, who he is, the operating model, "not a signal service", all channels.

## 8. Signature widgets
- **PricedInMeter:** probability path, for example rate hike odds moving over days.
- **ScenarioCard:** a condition, a meaning, then Gold, NQ and Dollar each with an arrow and a word.
- **NumbersTable:** expected, previous, actual.
- **NumberFlip:** counts from 85K down to −23K when scrolled into view.
- **GapMeter:** two bars on one scale. Usual move about 300 points, this night about 100 to 150. Label "Room left".
- **TermTip:** dotted blue word that opens one short box.
- **MoreBox:** closed tap box for optional depth only.
- **ProofChips and StatChips:** mono font numbers. One chip opens the payout certificate.
- **ShotFrame:** real screenshot, caption, tap to enlarge.
- **TwoSides and GapCards:** side by side cards, stack on phone.
- **Route:** condensed flow at the top of guides and briefings.
- **CallBox, KeyPointCallout, PersonalNote:** small labelled blocks.
- **AffiliateCard and CodePill:** firm card and copy button for codes.

Flow rules: never two widgets in a row. About one widget per 120 to 180 words. Depth lives only in tap boxes. Never hide the main story behind a tap.

## 9. Look and feel
Principles: readability beats decoration. Calm and editorial, like a trading desk notebook, not a hype prop firm ad. Phone first. Big type, generous line height, narrow text column.

**Branding and colours are still open. Treat the tokens below as a starting point. Design is free to explore.**

| Token | Value | Use |
|---|---|---|
| bg | #FAFAF7 | page |
| surface | #FFFFFF | cards |
| surface muted | #F2F1EC | muted blocks |
| border | #E4E2DA | hairlines |
| text | #1A1A18 | body |
| text muted | #5C5B55 | secondary |
| accent | #1F4FD1 | links, primary buttons |
| cta | #C98A06 | affiliate CTAs only |
| up / down / neutral | #117A45 / #B42318 / #6B6A63 | always with arrow and word |

Fixed rules, whatever the palette:
- One accent for links. One separate colour used only for affiliate CTAs.
- Up and down are never shown by colour alone. Always an arrow and a word.
- Every price, percentage and level uses a mono font (JetBrains Mono).
- Body 18px, line height 1.7, text width about 68 characters. Contrast 4.5:1 minimum.
- Sticky slim header. "Start here" is a button. Radius 10px.
- Light theme first. Dark theme is open to explore.

## 10. Voice (for any copy you write)
- First person, like the reader sits next to him.
- Sentences of 9 to 13 words. One idea each.
- No em dashes. No hyphens as connectors.
- Plain Indian English words. No "glossary", no jargon without a tap tip.
- Every number carries a consequence, not just a value.
- Never say "hawkish" or "dovish". Say "rate hike probability" or "priced in".
- Market posts end with: "Not advice. Stop loss on."
- If you write placeholder copy, mark it as placeholder. He rewrites it in his own words.

## 11. Trust and money rules
- Firms are shown by fit, never ranked as "best".
- A plain disclosure sits beside every code: affiliate link, you get a discount, he earns a commission, it does not change what he writes.
- No code above the first useful paragraph. Max one inline CTA per article.
- "Last verified" date on every code.
- Partners: **FundedNext** (beginners, CFD and futures, affiliate, code AAYUSH, 10% off), **Apex Trader Funding** (experienced, plain link, he trades funded here), **MRKT** (macro tool he uses, affiliate).

## 12. Must not
- No abhifutures wording or opening ("start from zero", "no glossary").
- No lambos, fake screens, hype or profit screenshots without context.
- No made up numbers. Use the real facts below.
- No blog feed as the home page.
- No colour only signals.

## 13. Real facts for mockups
- Fri 7 Aug 2026, NFP at 8:30 AM ET, 6 PM IST.
- Actual −23K. Forecast 85K. Previous 20K. Unemployment 4.1%.
- Before the print: September hike odds fell from two hikes to one after ADP 44,000 vs 65,000. Gold up 6% on the week, near $4,316.
- Entry 6:04 PM in a bullish 1 minute fair value gap, stop below it. 4 MNQ. One partial early, three ran the full 102 points. About $500 to 600.
- Apex payout $1,446, approved 12 Aug 2026. It came from that week, not one trade.
- He does not remember the exact stop size. The page says so.

## 14. Build reality and open items
Stack: Astro + MDX on his own Vercel. Output from Design should be HTML and CSS that can become Astro components. Mobile checked at 375px.

Open, please explore and suggest:
- Branding, colours, logo or wordmark.
- Where **Experiences** lives: its own nav item, or a kind of entry inside Journal.
- Dark theme.
- Lines on the home page he has not yet rewritten in his own words: the two side cards, "Most people learn one side", "The money is where they meet", the four "what you get here" tiles.
