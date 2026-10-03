# aayushict.space build plan for Claude Code

Version 1, 3 October 2026. Give this file to Claude Code together with `brand-schema.md`, `tokens.css` and `reference-site.html`.

## 0. Ground rules

1. Match `reference-site.html` exactly for layout, colour and type. It is the approved design.
2. Use only the tokens in `tokens.css`. No raw hex values in components.
3. Copy in the reference site is approved, except anything marked placeholder or sample.
4. Never use em dashes or hyphens as connectors in any copy you write.
5. Every direction shows an arrow plus a word. Never colour alone.
6. Check every page at 375px wide and at 1280px.
7. Goal of the site is audience, not sales. Affiliates only. No popups.

## 1. Stack

Astro with MDX, deployed on Vercel. Content lives in Astro content collections as MDX files, so a new post is one new file.

Fonts: Source Serif 4, Figtree, Instrument Sans and JetBrains Mono from Google Fonts. Headings use the stack `Aptos, "Figtree", "Segoe UI", sans-serif`.

## 2. Sitemap and nav

Nav: Macro · Learn · Journal · Watch · About · Start here (wine button). On phone, logo plus Start here button plus menu icon.

| Route | Page |
|---|---|
| `/` | Home |
| `/macro` | Macro Desk feed, newest first |
| `/macro/[slug]` | One Macro post (week ahead, briefing or review) |
| `/learn` | Guide library, by need |
| `/learn/[category]/[slug]` | One guide |
| `/journal` | Call scorecard, trading days and stories |
| `/journal/[slug]` | One journal entry |
| `/watch` | Reel playlists, coming soon |
| `/start-here` | Prop firms by fit, codes, tools, FAQ |
| `/about` | Who he is, how it works |
| `/disclosure` `/disclaimer` `/privacy` | Fine print |
| `/go/fundednext` `/go/apex` `/go/mrkt` | Affiliate redirects |

There is no separate `/tools` page. Tools live inside Start here.

## 3. Content collections

**macro**

| Field | Type | Notes |
|---|---|---|
| title | string | |
| subtitle | string | |
| kind | `week-ahead` \| `briefing` \| `review` | Shown as a small label |
| date | date | |
| eventTimeIST, eventTimeET | string | Optional, for briefings and reviews |
| badges | string[] | For example "High impact", "Released" |
| route | string[] | The steps shown in the Route widget |
| readMinutes | number | |
| relatedJournal | reference | Optional |

**learn**

| Field | Type | Notes |
|---|---|---|
| title, subtitle | string | |
| category | `macro-events` \| `ict-with-macro` \| `prop-firms` \| `payouts` \| `tools` \| `psychology` | |
| updated | date | |
| readMinutes | number | |
| route | string[] | |

**journal**

| Field | Type | Notes |
|---|---|---|
| title | string | |
| kind | `call` \| `trading-day` \| `story` | |
| date | date | |
| asset | `NQ` | Calls only |
| direction | `long` \| `short` | Calls only |
| target, invalidation | string | Calls only |
| status | `hit` \| `invalidated` \| `open` \| `dropped` | Calls only. Losing calls are never hidden |
| review | reference to macro | Trading days link to their review |

**firms** (data, not pages): name, fit, code, discount, link slug, pros, cons, lastVerified, isAffiliate.

## 4. Components

Build each as an Astro component, usable inside MDX.

| Component | What it does | Seen in reference |
|---|---|---|
| Header | Sticky, nav, mobile drawer | Every page |
| Footer | Sign off, fine print links, email signup (hidden on home) | Every page |
| Band | Full width section, `black`, `white` or `wine` | Home |
| ProofChips | Mono chips, one opens the payout proof | Home hero |
| TermTip | Dotted rose underline, tap opens a short box | Home, guides, posts |
| SideCard | Linked card on black | Home hero |
| GapCards | Four cards, last one wine | Home white band |
| NumbersTable | White card, key number in wine | Home, briefing |
| NumberFlip | Counts 85K to −23K when scrolled into view | Home |
| RoomLeft | Two bars on one scale in the wine band | Home |
| Route | Step pills at the top of posts and guides | Posts, guides |
| ScenarioToggle | White card, Beat · Near · Miss, shows NQ, gold, odds | Guide |
| PricedInSlider | White card, slider, room left to run | Guide |
| Quiz | White card, three answers, marks right and wrong | Guide |
| ModesToggle | White card, 90% unclear vs 10% clear | Jackson Hole review |
| WeekAheadDaily | White card, dollar and gold context, NQ in wine, odds bars | Week ahead |
| JobsToggle | White card, strong vs weak jobs | Week ahead |
| ScenarioCards | Three cards on black, the one that happened has a wine border | Briefing |
| MoreBox | Closed tap box for optional depth | Guides |
| NoteBox | Rose left bar, small label | Posts |
| PullLine | Italic serif, wine bar, one per page | Guides |
| ShotFrame | Chart frame, caption, tap to enlarge | Posts |
| EventList | Dated events with IST and ET | Week ahead, review |
| CallsTable | Journal calls with status pills | Journal |
| FirmCard + CodePill | White firm card, copy button, disclosure, last verified | Start here |
| EmailSignup | Email field and button, three variants: band, on wine, footer | Home, end of posts, footer |
| SignOff | Mono line at the end of every market post | Posts |

Flow rules from the brief: never two widgets in a row, about one widget per 120 to 180 words, depth only inside tap boxes.

## 5. Email signup

Copy: "Get the week ahead every Sunday. One email, plus big release briefings."

Placement: home band after "What you get here", end of every post, footer on every page except home.

The provider is not chosen yet. Build EmailSignup so the form action is one setting in a config file. Until a provider is chosen, the form shows a thank you message and stores nothing.

## 6. Affiliate redirects

Add redirects in `vercel.json` so `/go/fundednext`, `/go/apex` and `/go/mrkt` send readers to the partner links. Links stored in one config file. Every code shows the disclosure line and a last verified date beside it. No code above the first useful paragraph of any article, and at most one inline call to action per article.

## 7. Build order

1. Project setup, tokens, fonts, Header, Footer, Band.
2. Home page, matching the reference exactly.
3. Macro Desk feed and the post layout, with the three sample posts: week ahead, NFP briefing, Jackson Hole review.
4. Learn library and the guide layout, with the priced in guide.
5. Journal with calls, trading days and stories.
6. Start here with firm cards and redirects.
7. About, Watch, fine print pages.
8. Email signup wiring, once a provider is chosen.
9. Final check at 375px and 1280px, keyboard focus on every control, Lighthouse pass.

## 8. Done means

Every page matches the reference at both widths. No raw hex values outside tokens. Every interactive control works by keyboard and touch, at least 44px tall. Every market post ends with the sign off line. Every affiliate code has its disclosure and last verified date.
