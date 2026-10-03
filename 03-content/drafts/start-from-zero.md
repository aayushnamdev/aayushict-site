# Front page: v2 working draft

Status: approved in direction by Aayush (flow of short text plus widgets). Live preview of the same copy: https://claude.ai/artifact/BpkFzFjtJJVtVgCViV71dd

Title of the page is NOT "Start from zero". The H1 is the hero line below. Rename this file once the URL is decided.

## Open items before final
- [x] Wait rule settled: it applies after the NFP data only. No timer. He waits for new price action after the data. (Drops the "10 to 15 minutes" figure everywhere.)
- [x] No "Next big number" card for now, he is still building the site. Ending is a plain link to the Macro Desk.
- [ ] Save 3 screenshots to 03-content/Assets/ (they were pasted in chat, not on disk):
  - 2026-08-07-nfp-calendar.jpg (the data)
  - 2026-08-07-mnq-fvg-entry.jpg (TradingView, 1 minute, FVG entry, target is the 1 hour draw on liquidity)
  - 2026-08-07-tradovate-execution.jpg (execution on Tradovate, 6:35 PM marker)
  Apex certificate is there as `13 Aug Payout.pdf` (needs a PNG/JPG export for the web).
- [ ] Words I wrote that Aayush has not rewritten yet: the two "side" cards, "Most people learn one side", "The money is where they meet", the piece 3 linking lines, the "What you get here" tiles.
- [ ] Warsh draft says 105 handles. This page uses 102. Fix the Warsh draft.
- [ ] Real URLs for the page links and /go/ slugs. FundedNext URL is already set in partners.ts. Apex stays a plain link.

---

## Piece 1. First screen

Label: MACRO · FUTURES · FROM INDIA

H1: Know what's priced in. Trade what changes.

I'm Aayush. I trade Nasdaq futures from India. Before every big number, I know what the market already expects, so it's already [priced in]. When the number surprises, I trade it.

Tap tip on "priced in": Priced in means the market already expects it. The expected number does not move price. The surprise does.

Two side cards.
- The macro side: I read the news before the chart. NFP, CPI, the Fed. / I watch gold and the dollar too. I don't trade them.
- The futures side: I trade Nasdaq futures, mostly MNQ, on funded accounts. / The number gives me direction. The 1 minute chart gives me my entry.

Proof chips: 102 points · 4 MNQ · Apex payout (tap).
Payout tap opens the certificate with: This is from that week, not one trade. I traded 3 to 4 more days after it.

| Element | Component | Behaviour |
|---|---|---|
| Tap tip | NEW `TermTip` | Button styled as dotted blue link. Toggles one short box. `aria-expanded`. |
| Side cards | NEW `TwoSides` | Two cards, side by side, stack under 520px. Not tabs, both always visible. |
| Proof chips | NEW `ProofChips` | Mono font. Two static, one button that opens the certificate image. |

## Piece 2. The gap

H2: Most people learn one side.

Some learn only the chart. Some only read the news. Both feel stuck in the same place.

Four cards:
- Chart only: You learn setups. FVG, order blocks. But at 6 PM price moves 300 points and you don't know why.
- News only: You read headlines. Jobs weak, Fed this, Fed that. But nobody shows you the trade.
- From India: You can't easily trade US futures from here. Prop firms are the way in. I show you which ones, honestly.
- Here: both (highlighted): The number tells me the direction. The chart tells me where to get in. I show you both, on real trades.

Punch line: The money is where they meet. Here is one real night.

| Element | Component | Behaviour |
|---|---|---|
| 4 cards | NEW `GapCards` | Last card has an accent border. Equal heights, 1 column on phone. |

## Piece 3. One real night

H2: Friday 7 August. 6 PM India time.

That week, everyone was on the same side. The market thought the Fed would raise rates in September. Then a weak ADP report came and two hikes became one.

Gold ran 6% in a week. Nasdaq just sat there, waiting. Same story, two different markets.

I don't guess on days like this. The day before, I write three scenarios.

[SCENARIO CARDS]
- Near 85K → Flat. Priced in. Nothing changes.
- 150K or more ↓ Down. Nasdaq falls hard.
- Below 40K ↑ Up. Nasdaq rises.

Then I wait. After NFP, I never trade the number itself. Fills can slip 50 to 100 points in that window. That is gambling, not trading. I wait for new price action after the data, and let that show me the direction.

[NUMBER FLIP] Expected 85K → Came −23K
[SCREENSHOT] NFP calendar. Actual −23K, Forecast 85K, Previous 20K.

The US lost jobs. Weak jobs means fewer rate hikes. Fewer hikes is good for Nasdaq and gold. My scenario had already told me this.

[TAP BOX] Why do gold and Nasdaq move together here? Both were trading the same story, the rate hike story. Fewer hikes means cheaper money later. That helps both. Most days they don't move together. This week they did, because one thing drove both.

Here is what most people miss. The number was huge. But the move was small.

[GAP METER] Usual move on a surprise this big: ~300 points. This night: ~100 to 150. ↑ Room left.

So the market was not done. There was still room. If it had moved 300 already, I would not have taken this trade.

A few minutes later, a gap formed on the 1 minute chart. I entered inside it, at 6:04 PM. Stop below it.

[SCREENSHOT] TradingView, NQ 1 minute. Bullish FVG, entry inside it. Target: the 1 hour draw on liquidity. Previous day high 29,686.25 is visible.
[TAP BOX] What is an FVG? A gap price leaves behind when it moves too fast. Price often comes back to it, then continues.

[STAT CHIPS] 4 MNQ · 102 points · ~$600
[SCREENSHOT] Execution on Tradovate. The entry, the partial and the exit, marked on the chart.

One contract came off early. Three ran the full 102. I don't remember my exact stop. It was an old trade and I have no data, so I won't make one up.

[CALLOUT] Read the size of the reaction against the size of the surprise.

| Element | Component | Behaviour |
|---|---|---|
| Scenario cards | existing `ScenarioCard` x3 | Arrow plus word on every card, never colour alone. |
| Number flip | NEW `NumberFlip` | Counts 85K down to −23K when scrolled to 60% in view. Static final value if reduced motion. Mono font. |
| Calendar and chart screenshots | NEW `ShotFrame` | Real image, caption line, tap to enlarge. |
| Tap boxes | NEW `MoreBox` (details/summary) | Closed by default. Only for optional depth, never the main story. |
| Gap meter | NEW `GapMeter` | Two bars on one scale. Fill animates once in view. "Room left" label with arrow. |
| Stat chips | NEW `StatChips` (shared with ProofChips) | Mono. |
| Callout | existing `KeyPointCallout` | One per page in this flow. |

Rule for the flow: never two widgets in a row, about one widget per 120 to 180 words.

## Piece 4. The honest part

H2: This night was rare.

Most releases land near the forecast. Then price just chops, up and down, taking everyone's stops. That is okay.

About 90% of days, I can't read the direction. I take my 1 to 1 and go home. About 10% of days are clear. 7 August was one.

The difference between a small win and 102 points was not my chart reading. It was whether the news was readable.

Some days you don't need a thesis. You just need to read the number and respect the direction.

| Element | Component |
|---|---|
| Note block | existing `PersonalNote` |

## Piece 5. What you get here

H2: Everything on this site comes back to one question.
What is priced in, and what would change it?

Four tiles:
- Macro Desk →: What is priced in before every big event. Scenarios written before the number.
- Learn →: The news and the chart together, in simple words.
- Journal →: My real trades. Wins and losses, with numbers.
- Start here →: Trading futures from India with prop firms. Honest notes on each.

| Element | Component |
|---|---|
| 4 tiles | NEW `ValueTiles`, each a full tile link to /macro, /learn, /journal, /start |

## Piece 6. Futures from India

H2: How do I do this from India?

Prop firms give you their money to trade after you pass a test. You keep a share of the profit. If you fail, you lose the fee, not your savings.

Which one fits depends on you.

Picker: I'm new / I know my edge.

I'm new → FundedNext. My pick for beginners. Small 5K and 10K accounts, so you can trade Nasdaq as a CFD without much at stake. Futures with end of day drawdown too. In my opinion the payout structure is great.
Button: See FundedNext · code AAYUSH, 10% off (via /go/fundednext).
Disclosure: Affiliate link. The code gives you a discount and I earn a commission. It does not change what I write.

I know my edge → Apex Trader Funding. My payout came from here. But it is not for beginners. The drawdown is intraday and it follows your open profit. Say a trade goes to 2.5R, then falls back to breakeven. You made nothing, but your drawdown still ate away.
Link: ApexTraderFunding.com, plain link.
Disclosure: Not an affiliate link. I'm not affiliated with Apex.

For the macro side, I open MRKT every morning. It shows me what is priced in, and which events carry more weight right now. It saves me hours on Nasdaq.
Disclosure: MRKT is an affiliate link. I earn a commission if you sign up. I use it daily either way. This is my honest opinion, not advice.

| Element | Component | Behaviour |
|---|---|---|
| Picker | NEW `FirmFitPicker` | Two toggle buttons, `aria-pressed`. Shows one firm card at a time. |
| FundedNext CTA | existing `InlineFirmCTA` + `CodePill` | Link through `/go/fundednext`, `rel="sponsored nofollow noopener"`. Gold CTA colour is for affiliate CTAs only. |
| MRKT line | existing `InlineFirmCTA` | Link through `/go/mrkt`. |

Affiliate rules (04-site/CLAUDE.md): one inline firm CTA per article plus the end one, no code above the first useful paragraph, compare by fit, never "best".

## Piece 7. The ending (the bookmark)

Before every big number, I write my scenarios. Same as I did on 7 August. They live on the Macro Desk.
Button: Open the Macro Desk.

Not advice. Stop loss on.

The "Next big number" card is parked until the site has real events to show. Add it back later as NEW `NextEvent`, reading from the Macro Desk data so it never goes stale.

| Element | Component | Behaviour |
|---|---|---|
| Macro Desk button | existing link styling | Plain button to /macro. |
| Disclaimer | existing `Disclaimer` | Do not also type the line by hand. |

## Page-level rules
- Scroll progress bar at the top.
- All motion off under `prefers-reduced-motion`.
- Up and down always arrow plus word. Numbers in the mono font.
- Phone first, 16px gutters, text column under 68ch.
- Visible text target about 1,000 words. Tap box text does not count.
