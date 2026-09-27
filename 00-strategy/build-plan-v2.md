# Aayush ICT Website: Build Plan for Claude Code (v2)

Reference site: https://abhifutures.com (Abhinav Murjani)
Owner: Aayush Namdev, Instagram @aayush_ict
Goal: a light, highly readable site that teaches concepts, publishes macro briefings (CPI, FOMC, NFP → Gold, NQ, Dollar), and converts readers through prop firm affiliate codes and future software partners.

Hand this whole file to Claude Code. Build phase by phase (section 10). Do not skip ahead.

v2 merges a second, deeper page by page analysis of abhifutures (guides, journal, watch, about, payout and platform pages).

---

## 1. Teardown: how abhifutures works

### 1.1 The person is the brand
Abhinav → Abhi → AbhiFutures → website, YouTube, Instagram. One identity, no separate "company". Trust comes from a named person with a specific operating model.

Hero, three lines:
* Brand statement: "Trade with rules. Trade with measure."
* Specificity: notes from trading 1 NQ across 25+ funded accounts
* Promise: everything learned about getting funded, written down, free

Then two doors: "Start from zero" and "Already trading? Skip to the guides."

### 1.2 Navigation (compact, one tab per content mode)
| Section | Mode |
|---|---|
| Home | Orientation, a directory into everything |
| Guides | Evergreen library, organized by need, not by date |
| Journal | Real, dated trading days |
| Watch | Video playlists run as a curriculum |
| Start Here | Structured entry, firms, codes |
| About | Founder and operating model |

### 1.3 Home sections in order
Hero → two doors → The path (4 steps) → What's new (date, title, category) → Where the money comes from (eval → funded → gates → payout, repeated in cycles) → popular guides → journal → watch → footer.

### 1.4 The path
01 Learn the game → 02 Pick a firm → 03 Pass the eval → 04 Get paid. The visitor is given a sequence instead of a blog feed.

### 1.5 Guides
* Categories map to real questions: Getting started, Prop firms, Concepts, Platforms/data, Copy trading, Payouts, India
* Titles are direct answers to searches ("Which prop firm and which account to start with", "How a prop firm payout reaches your Indian bank account")
* Visible "Updated September 2026" dates, because rules and prices change

Guide page template:
Breadcrumbs → category → title → one line subtitle → updated date → read time → short intro → **condensed route** (e.g. Qualify → Request → Approval → Portal → KYC → Bank) → numbered sections → examples → tables → personal experience → caveats → related content.

### 1.6 Teaching technique
"Your first 20 points" teaches through one real journal trade: real event → what happened → the terms. Not glossary first. This is the single most useful pattern for Aayush, because every reel is already a real event.

### 1.7 Progressive depth (hub and spoke)
* TradeSyncer: What is it → Setup → In depth
* Payouts: general India payout guide → Apex, Lucid, Tradeify specific pages
Every page stays short because depth lives one click down.

### 1.8 Journal vs Guides
Guides = general knowledge. Journal = the concept in practice on a specific day. They link to each other.

### 1.9 Watch
Playlists as a curriculum. Each playlist page says who should watch, what you will know by the end, what you need first, and what to watch next.

### 1.10 About
Identity, instrument (NQ), structure (1 contract per account), method (ICT), risk (20 point stop, about 1:1), single session window. States clearly it is not a signal service. The whole site is anchored to one operating model.

### 1.11 Money and trust
* Affiliate codes sit at decision points: education → firm fit → firm info → code
* Disclosure is inside the article, not only in the footer ("some links are affiliate links, code gives you a discount, I get a commission, it does not change what I write")
* Firm choice framed by fit (budget, account size, drawdown type, platform, style), never "best firm" ranking
* Personal numbers labelled as personal ("my timings", not the firm's FAQ)
* Commercial pages are separated from educational pages so the site still feels editorial

### 1.12 India layer
INR payouts, KYC, Indian banks, Indian trading hours. The audience is addressed as Indian, not generic global.

---

## 2. What Aayush's site does differently

Abhi's angle: **how to get funded.**
Aayush's angle: **what is priced in, and what would change it.** The site is the written home of the reels: macro events connected to real price in Gold, NQ and the Dollar, then read through ICT.

Brand statement options (pick one, like "Trade with rules. Trade with measure."):
* "Know what's priced in. Trade what changes."
* "Read the macro. Trade the chart."
* "The number is expected. The surprise is the trade."

Specificity line (draft): Macro, explained like I'm sitting next to you. How CPI, NFP and the Fed move Gold, NQ and the Dollar, read through ICT.

Operating model for About (mirror of 1.10, fill honestly):
* Instrument: NQ and MNQ only. Gold and the Dollar watched for correlation, not traded
* Method: ICT and Smart Money Concepts
* Process: confirm what is priced in on the daily, then drop to intraday for the entry
* Risk rule: TODO (your stop and R:R, in your words)
* Funded with: Apex Trader Funding
* Statement: not a signal service

Audience:
* Indian retail traders, 1 to 2 years in, many trading gold on MT5, many ICT traders
* Many non native English speakers, some from Africa
* They come for the story that connects an event to the chart

Voice rules (every page, every label):
* First person, like the reader is sitting next to you ("I watch...", "Here is what happens...", "The way I read it...")
* Short sentences, one idea per line where possible
* Every number carries a consequence
* Never "hawkish" or "dovish". Say "rate hike probability", "priced in", or describe what is happening
* No em dashes or hyphens as sentence connectors. Use commas, periods, or restructure
* Market posts end with "Not advice. Stop loss on." or "My opinion, not advice."

---

## 3. Navigation and sitemap

Top nav (mirrors abhi's content modes):
**Macro** · **Learn** · **Journal** · **Watch** · **Start here** (styled as a button) · **About**

```
/                          Home
/macro                     Macro Desk: event briefings, newest first
/macro/[slug]              Single briefing (preview, post release, review)
/macro/series/[slug]       Story arc, e.g. "Sept 2026: Jackson Hole → NFP → CPI → FOMC"
/learn                     Library, organized by need
/learn/[category]          Category page
/learn/[category]/[slug]   Single guide
/journal                   Scorecard of calls + NQ trading days
/journal/[slug]            Single journal entry
/watch                     Playlists (curriculum)
/watch/[playlist]          Single playlist page
/start-here                Firms, codes, tools, honest notes (the money page)
/tools                     Software partners (MRKT now, more later)
/about                     Founder and operating model
/disclosure  /disclaimer  /privacy
/go/[partner]              Affiliate redirects
```

---

## 4. Content clusters (hub and spoke)

Build these as hubs with spokes, copying 1.7.

**Macro events cluster** (the core, abhi has nothing like this)
Hub: "How macro news moves Gold, NQ and the Dollar"
Spokes: CPI explained · Headline vs core CPI · NFP explained · FOMC decision vs press conference · What "priced in" means · Rate hike probability and where to read it · Oil and inflation · Jackson Hole · PCE
Each spoke links to every live briefing of that event type.

**ICT with macro cluster**
Hub: "From macro bias to ICT entry"
Spokes: Daily bias from the macro story · Why the first candle after news fools people · Trading around a release with a stop · When not to trade (inside the range)

**Prop firm cluster**
Hub: "Which firm fits you" (by fit, never a ranking)
Spokes: Gold/MT5 firms vs futures firms · Evaluation rules · Drawdown types · Consistency rules · News trading rules per firm

**India payouts cluster** (only write what you have actually done)
Hub: "How a prop firm payout reaches your Indian bank"
Spokes: Apex → Indian bank · FundedNext → Indian bank · TODO others

**Tools cluster** (progressive depth, like TradeSyncer)
MRKT: What is it → How I set it up → How I use it before every event

---

## 5. Page by page spec

### 5.1 Home
1. **Hero**: brand statement, specificity line, promise line. Two doors:
   * "New to macro? Start from zero" → /learn
   * "Already trading? This week's briefing" → latest /macro post
2. **This week in macro**: next event, date and time in IST and ET, current priced in number (PricedInMeter), one "umbrella" line, button to briefing
3. **The path** (4 numbered steps with read times):
   1. Read the market: what Gold, NQ and the Dollar react to
   2. Read the macro: what priced in means and why the expected number does not move price
   3. Get funded: trade a firm's capital, not yours → /start-here
   4. Execute with ICT: daily bias down to intraday entry, with a stop
4. **What's new**: date, title, category (briefings and guides mixed)
5. **How one event plays out** (my "Where the money comes from"). Worked example from September 2026:
   1. Positioning: hike odds 49% → 72% after NFP
   2. The release: headline vs core, which number mattered
   3. The reaction: which scenario played out
   4. The trade: direction, target, invalidation → /journal
   Inline CTA in step 4: "To trade this without risking your own capital, here are the firms I use" → /start-here
6. **Popular guides** (4 to 6)
7. **Journal** (latest 3 entries)
8. **Watch** (featured playlist)
9. **Footer**: disclaimer summary, disclosure link, Instagram, Substack, YouTube

### 5.2 Macro Desk
Index: filter chips by event (CPI, FOMC, NFP, PCE, Jackson Hole, Earnings) and by asset (Gold, NQ, Dollar). Current series strip on top.

Single briefing, same order as the reels:
1. EventHeader: event, release time in IST and ET, badge (Preview / Post release / Review), updated date
2. Route summary (e.g. NFP beat → hike odds 72% → CPI → FOMC)
3. Quick context, 3 to 6 short lines
4. NumbersTable: Expected, Previous, Actual
5. PricedInMeter: probability path
6. Umbrella line: where the crowd is standing
7. ScenarioCards (2 to 3)
8. What most people miss (KeyPointCallout)
9. My direction (optional): target, invalidation, timing → auto listed in /journal
10. Reel embed
11. "Learn the concept behind this" → matching /learn spoke
12. Small InlineFirmCTA with inline disclosure
13. Next in series, follow CTA, disclaimer

### 5.3 Learn
* Top: the 4 step path again
* Intro line in the abhi style: "Organized by what you need, not by when it was written."
* Categories: Start here basics · Macro events · ICT with macro · Prop firms · Payouts (India) · Tools and platforms · Psychology
* Every guide uses the guide template (1.5) and the teaching technique (1.6): open with a real briefing from the Macro Desk, then explain the terms
* Example: "Headline CPI vs core CPI" opens with Friday 11 Sep 2026, headline 0.4% as expected, core 0.3% vs 0.2%, then explains why core was the number that mattered

### 5.4 Journal
Two entry types:
* **Call**: from a briefing. Date, asset, direction, target, invalidation, outcome (Hit / Invalidated / Open / Dropped). Never delete a losing call
* **Trading day**: an NQ day. Time (IST), market read, the level, entry, stop, result, what it shows, link to the concept
Top of page: simple totals for calls.

### 5.5 Watch
Playlists as curriculum. Each playlist page:
* Who should watch
* What you will know by the end
* What you need first
* The videos in order (numbered)
* What to watch or read next

Starter playlists:
* "Sept 2026: the Fed path" (the CPI and FOMC reels in order)
* "Macro basics for traders" (NFP, CPI, FOMC explainer reels)
* The MRKT masterclass on fundamentals and ICT, once recorded

### 5.6 Start here (the money page)
1. Disclosure paragraph up front, in your own words
2. **Which one is for you**:
   * "I trade gold or forex on MT5" → CFD firm cards (FundedNext)
   * "I trade NQ or futures" → futures firm cards (Apex)
3. Firm cards (AffiliateCard full): what it is for, my status (trade funded here / used to / recommend only), code with copy button, discount, honest pros and cons, payout route to India if known, last verified date
4. Tools (MRKT, future software)
5. FAQ: What is an evaluation? Does the code cost me more? Why do you list cons?

### 5.7 Tools
MRKT card with referral link and its three depth pages. Hidden "coming soon" slots for future software, switched on from the data file.

### 5.8 About
Photo, who you are (MA Psychology, 6 years in markets, funded futures trader), the operating model from section 2, why psychology and markets are one topic for you, "not a signal service", links to all channels.

---

## 6. Design system (light theme, readability first)

### 6.1 Principles
* Readability beats decoration
* Big type, generous line height, narrow text column
* One accent colour for links, one reserved colour for affiliate CTAs only
* Up and down never shown by colour alone. Always arrow + word
* Small scannable blocks: short paragraphs, tables, summary boxes, routes

### 6.2 Tokens
```css
:root {
  --bg:            #FAFAF7;
  --surface:       #FFFFFF;
  --surface-muted: #F2F1EC;
  --border:        #E4E2DA;

  --text:          #1A1A18;
  --text-muted:    #5C5B55;

  --accent:        #1F4FD1;  /* links, primary buttons */
  --accent-hover:  #173CA3;
  --cta:           #C98A06;  /* ONLY affiliate / code CTAs */
  --cta-text:      #1A1A18;

  --up:            #117A45;
  --down:          #B42318;
  --neutral:       #6B6A63;

  --font-body: "Inter", "Source Sans 3", system-ui, sans-serif;
  --font-num:  "JetBrains Mono", ui-monospace, monospace;

  --text-base: 1.125rem;  /* 18px */
  --leading:   1.7;
  --measure:   68ch;
  --radius:    10px;
}
```
Dark theme later via `[data-theme="dark"]`. Not in v1.

### 6.3 Type and layout
* Body 18px, line height 1.7, max 68ch
* H1 40 to 48px, H2 28 to 32px, H3 22px
* Prices, percentages and levels in the mono font
* Contrast 4.5:1 minimum
* Mobile first (traffic comes from Instagram on phones)
* Sticky slim header, Start here as a button

---

## 7. Component list

| Component | Used on |
|---|---|
| Breadcrumbs | Guides, briefings, journal |
| MetaRow (category, updated date, read time) | All content pages |
| Route (condensed flow at top) | Guides, briefings |
| EventHeader (auto IST + ET) | Briefings |
| NumbersTable | Briefings |
| PricedInMeter | Home, briefings |
| ScenarioCard (arrow + word) | Briefings |
| KeyPointCallout | Briefings, guides |
| CallBox (target, invalidation) | Briefings, journal |
| PersonalNote ("my experience, not official") | Guides |
| Caveat box | Guides |
| RelatedContent | All content pages |
| PathSteps (numbered 01 to 04) | Home, Learn |
| PlaylistBlock (who, by the end, before, next) | Watch |
| AffiliateCard (full + compact) | Start here, Home |
| CodePill (copy button) | Anywhere a code shows |
| InlineFirmCTA + inline disclosure line | Briefings, guides |
| Disclaimer | Footer, market posts |

---

## 8. Affiliate system

### 8.1 Single source of truth
```ts
// src/data/partners.ts
export const partners = [
  {
    slug: "fundednext",
    name: "FundedNext",
    type: "prop-firm",          // prop-firm | tool | software
    market: "cfd",              // cfd (gold/MT5) | futures
    status: "recommend",        // trade-funded | used-to | recommend
    code: "AAYUSH",
    discount: "10% off",
    url: "TODO real affiliate URL",
    forWhat: "Gold and forex traders on MT5",
    pros: [], cons: [],
    indiaPayoutGuide: null,     // slug of payout guide if written
    lastVerified: "2026-09-27",
    active: true,
  },
  {
    slug: "apex",
    name: "Apex Trader Funding",
    type: "prop-firm",
    market: "futures",
    status: "trade-funded",
    code: "TODO", discount: "TODO", url: "TODO",
    forWhat: "NQ and MNQ futures",
    pros: [], cons: [],
    indiaPayoutGuide: null,
    lastVerified: "",
    active: false,              // switch on once a code exists
  },
  {
    slug: "mrkt",
    name: "MRKT (Market Edge AI)",
    type: "tool",
    url: "https://www.mrktedge.ai/?ref=aayush",
    forWhat: "Macro terminal I use to see what is priced in",
    active: true,
  },
];
```

### 8.2 Rules
* Every partner link goes through `/go/[slug]` (302 redirect), with `rel="sponsored nofollow noopener"`
* Inline disclosure next to every code, same idea as abhi's ("affiliate link, you get a discount, I get a commission, it does not change what I write")
* Max one inline CTA per article plus the end of article CTA
* Never place a code above the first useful paragraph
* "Last verified" date on every code
* Firms compared by fit, never ranked

---

## 9. Content model (MDX frontmatter)

### 9.1 Briefing
```yaml
---
title: "CPI Today: What's Priced In"
slug: cpi-preview-aug-2026
type: preview              # preview | post-release | review
event: CPI
series: sept-2026-fed-path
releaseAt: 2026-09-11T12:30:00Z
updated: 2026-09-11
assets: [gold, nq, dxy]
route: ["NFP 162K vs 55K", "Hike odds 49% → 72%", "CPI today", "FOMC next week"]
numbers:
  - { label: "CPI m/m",  expected: "0.4%", previous: "0.1%", actual: null }
  - { label: "Core m/m", expected: "0.2%", previous: "0.2%", actual: null }
pricedIn: { label: "September rate hike probability", path: [49, 72] }
scenarios:
  - { condition: "Core 0.2%", meaning: "As expected. No fuel.", gold: flat, nq: flat, dxy: flat }
  - { condition: "Core 0.1% or lower", meaning: "Cooler. Hike bets break.", gold: up, nq: up, dxy: down }
  - { condition: "Core 0.3% or higher", meaning: "Hotter. Hike almost locked.", gold: down, nq: down, dxy: up }
call: null
learn: headline-vs-core-cpi
reel: "TODO instagram reel URL"
---
```

### 9.2 Guide
```yaml
---
title: "Headline CPI vs core CPI: which one moves price"
subtitle: "Why the scary number is usually already expected"
category: macro-events
updated: 2026-09-27
readTime: 6
order: 2
route: ["Headline released", "Already expected", "Core surprises", "Price reacts"]
anchorBriefing: post-cpi-aug-2026
related: [what-priced-in-means, fomc-decision-vs-press-conference]
---
```

### 9.3 Journal entry
```yaml
---
kind: call                 # call | day
date: 2026-09-12
asset: gold
direction: down
target: 4220
invalidation: "Close above 4436"
status: open               # hit | invalidated | open | dropped
briefing: post-cpi-aug-2026
---
```

### 9.4 Seed content
Series "Sept 2026: The Fed path" from the three existing scripts:
1. `cpi-preview-aug-2026` (Reel 1, Fri 11 Sep, preview)
2. `post-cpi-aug-2026` (Reel 2, Sat 12 Sep, post release, with the gold call: target 4,220, invalidation close above 4,436)
3. `fomc-briefing-sep-2026` (Reel 3, Mon 14 Sep, preview, three press conference outcomes)
4. `fomc-review-sep-2026` (write after, closes the series and updates the call in /journal)

Starter guides (one per path step, each anchored to a real briefing):
* What Gold, NQ and the Dollar react to
* What "priced in" means (anchored to hike odds 49% → 92%)
* Headline vs core CPI (anchored to 11 Sep)
* FOMC decision vs press conference (anchored to 14 Sep)

Keep teleprompter wording where possible. It is already in the right voice.

---

## 10. Build phases for Claude Code

One phase at a time. After each, run the site and check it at phone width.

**Phase 0: Setup**
Astro + MDX, content collections for `macro`, `learn`, `journal`, `watch`. Base layout, header with nav from section 3, footer. A `CLAUDE.md` containing sections 2 (voice), 6 (design) and 8.2 (affiliate rules).

**Phase 1: Design system**
Tokens, type, buttons, cards, a `/styleguide` page showing every component.

**Phase 2: Components**
Everything in section 7.

**Phase 3: Partner system**
`partners.ts`, AffiliateCard, CodePill, InlineFirmCTA, `/go/[slug]` redirects.

**Phase 4: Pages**
Home, Macro (index, single, series), Learn (index, category, single), Journal, Watch, Start here, Tools, About, legal.

**Phase 5: Seed content**
Section 9.4.

**Phase 6: SEO**
Titles written as direct answers to searches, meta descriptions, auto OG image per briefing (event + priced in number), sitemap, RSS for /macro.

**Phase 7: Analytics and deploy**
Plausible or Umami, events on CodePill copy and /go clicks. Deploy to Vercel or Cloudflare Pages, connect domain.

**Phase 8: Polish**
Lighthouse 95+ on performance and accessibility, contrast check, test on a slow Android phone.

---

## 11. Compliance and trust
* Inline disclosure at every code plus a /disclosure page
* "Not financial advice" on every market post and in the footer
* Personal experience labelled as personal
* Honest cons on every firm card
* Journal never hides losing calls
* India: check current SEBI rules on finfluencers before launch and keep everything framed as education and personal opinion (not legal advice, verify independently)

---

## 12. Open items
* Site name and domain
* Brand statement (section 2)
* Your risk rule for the About page
* Apex affiliate code, if any
* Real FundedNext affiliate URL
* Honest pros and cons per firm, in your words
* Which payouts to India you have actually done (only those get guides)
* Profile photo
* Reel URLs for each briefing
