# Front page: project record

Single place to resume work on the aayushict.space front page. Written 2 Oct 2026 at the end of the first planning session.

## Status
Direction approved by Aayush. Copy and widget spec are drafted. Not yet built in Astro. Branding and colours are still being worked on separately, so all styling here is placeholder.

| What | Where |
|---|---|
| Copy plus widget spec (the working draft) | `../drafts/start-from-zero.md` (rename once the URL is set) |
| Clickable phone preview, version 3 | `preview-v3.html` here, and live at https://claude.ai/artifact/BpkFzFjtJJVtVgCViV71dd (private) |
| Screenshots and proof | `../Assets/` (see list below) |
| Raw planning notes, locked facts | `planning-notes-raw.md` here |
| Voice rules | `../../02-brand/voice-guide.md` |
| Existing design tokens | `../../02-brand/design-tokens.md` |

## What the page is
The front door. In seconds the reader must know who Aayush is, how he trades, what the site is, which gap it fills, and what they get. Both sides: macro (what is priced in) and futures (prop firm route from India). Short, built for low attention spans, in his spoken words. It must not echo abhifutures.com ("start from zero", "glossary").

Hero line: **Know what's priced in. Trade what changes.**

## Decisions made (and why)
1. **Anchor is one real NFP night, 7 Aug 2026.** Real trade, real payout, and it teaches the macro to chart link. Abhi's page teaches a technical model. This one teaches what is priced in.
2. **Format is a mix of short text and widgets.** Text carries the why, which readers remember. Widgets carry numbers and proof. Tiles only has no thread. Pure text loses phone readers. Rules: never two widgets in a row, about one per 120 to 180 words, depth only in tap boxes, never hide the main story behind taps.
3. **Both sides visible at the top.** No Macro/Futures tabs, because tabs hide half of who he is.
4. **He trades NQ/MNQ only.** Gold and the dollar are watched, never described as traded.
5. **Chain on the page is "fewer rate hikes priced"**, not "cuts". Source numbers are the calendar screenshot, 85K forecast and 20K previous, not the 80K / 57K from his preview post.
6. **Move is 102 points**, not 105. His Warsh draft says 105 and needs fixing.
7. **Wait rule:** after NFP data only, he never trades the number itself. No timer. He waits for new price action after the data.
8. **Firm fit, never "best".** FundedNext for beginners (affiliate, CFD plus futures). Apex for experienced (not an affiliate, plain link, intraday drawdown). MRKT for the macro read (affiliate). Plain disclosure beside each.
9. **No "Next big number" card for now.** He is still building the site. Ending is a line and a button to the Macro Desk. Parked to add later as `NextEvent`.
10. **Honesty rules.** Stop size not remembered, say so. About $600 is approximate. The Apex payout came from that week, not this one trade.

## Locked facts (never change without asking)
- Fri 7 Aug 2026. NFP 8:30 AM ET, 6 PM IST. Actual −23K, forecast 85K, previous 20K (revised down from 57K). Unemployment 4.1%. Hourly earnings 0.1%.
- Before the print: Sept hike odds fell from two hikes to one after ADP 44,000 vs 65,000. Gold +6% on the week, above $4,300, near 4,316. Nasdaq inside prior day range (PDH 29,686, PDL 29,241).
- 6 PM reaction was about 100 to 150 points. He usually sees about 300 on surprises this big. Untapped 1 hour liquidity above.
- Entry 6:04 PM inside a bullish 1 minute FVG, stop below it. 4 MNQ. One partial at about 30 to 40 points, three ran the full 102. Closed just below the 1 hour target. About $500 to 600.
- Apex Trader Funding payout $1,446, approved 12 Aug 2026, received 13 Aug.
- FundedNext link `https://fundednext.com/?fpr=AAYUSH`, code AAYUSH, 10% off. Already set in `04-site/src/data/partners.ts`, `lastVerified` 2026-10-02.
- MRKT link `https://www.mrktedge.ai/?ref=aayush`. One sale so far.

## Assets (all in `../Assets/`)
| File | What |
|---|---|
| `2026-08-07-nfp-calendar.png` | The data: −23K vs 85K |
| `2026-08-07-mnq-fvg-entry-tradingview.png` | TradingView 1 minute, FVG entry, target the 1 hour draw on liquidity |
| `2026-08-07-tradovate-execution.png` | Execution on Tradovate, entry, partial and exit |
| `2026-08-12-apex-payout-certificate.png` | Apex certificate, $1,446 (exported from the PDF) |
| `13 Aug Payout.pdf` | Original certificate PDF |

The execution screenshot is a photo of a screen at an angle. Consider a cleaner retake or a crop before it ships.

## Open items
- [ ] Rewrite in his own words: the two side cards on the first screen, "Most people learn one side", "The money is where they meet", the four "what you get here" tiles, the Macro/Futures card lines.
- [ ] Fix the Warsh draft (105 vs 102).
- [ ] Decide the final page URL and rename `start-from-zero.md`.
- [ ] Real internal links: /macro, /learn, /journal, /start, Warsh post. Affiliate links go via `/go/fundednext` and `/go/mrkt`. Check a `/go/apex` plain link is not needed, Apex stays a direct link.
- [ ] Add MRKT pros and cons, FundedNext pros and cons in his words (`partners.ts` has empty arrays).
- [ ] Build in Astro. Reuse existing components where the draft says so, build the NEW ones: `TermTip`, `TwoSides`, `ProofChips`/`StatChips`, `GapCards`, `NumberFlip`, `ShotFrame`, `MoreBox`, `GapMeter`, `ValueTiles`, `FirmFitPicker`.
- [ ] Voice check before publish: grep for em dashes and hyphen connectors, sentence length 9 to 13, one heading per 250 to 350 words, every number has a consequence.
- [ ] Add the "Next big number" card back once the Macro Desk has live events.
- [ ] Branding and colours: parallel track, not decided. Preview uses the tokens in `02-brand/design-tokens.md`.

## How we worked (reuse this process)
1. Read the inspiration page, break it down into structure, elements and what to avoid.
2. Ask one question at a time, with his real numbers and words, then lock the facts.
3. Go piece by piece: show the problem, a rewrite, and the widget. He approves before the next piece.
4. Show a clickable preview when words are not enough. He judged the widgets only after seeing them.
