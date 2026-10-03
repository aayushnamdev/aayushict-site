# First page v2: the front door of aayushict.space

## Context
Draft v1 (`03-content/drafts/start-from-zero.md`) was rejected. Its language was basic
and not his. The opening echoed Abhi ("start from zero", "glossary"). It was too long, and it
only covered macro. New brief from Aayush:
- This is the first thing a reader sees. In seconds they must know who he is, how he
  trades, what the whole site is, which gap it fills, and what value they get.
- It covers BOTH sides: macro (what is priced in, NFP/CPI/FOMC) AND futures (prop firm
  route from India).
- The core idea is that fundamentals and technicals fit together, built around priced in vs surprise.
- It is short, low attention span, Twitter style. Interactive widgets and real screenshots
  carry the numbers. Depth goes into tap-to-open boxes.
- His spoken language, simple words. No Abhi lookalike structure or vocabulary.
- Process: go piece by piece and get his feedback on each, then assemble. Do not dump a full draft.

Positioning already in 00-strategy/build-plan-v2.md section 2. Abhi = "how to get funded".
Aayush = "what is priced in, and what would change it", read through ICT. Brand line
candidates there: "Know what's priced in. Trade what changes." / "Read the macro. Trade
the chart." / "The number is expected. The surprise is the trade."

Deliverable: rewrite `03-content/drafts/start-from-zero.md` (rename later once the title is
settled). Copy plus a detailed widget spec per section. Each widget names the
existing component to reuse where one fits (`04-site/src/components/`: `ScenarioCard`,
`PricedInMeter`, `PathSteps`, `KeyPointCallout`, `PersonalNote`, `InlineFirmCTA`,
`CodePill`, `Disclaimer`) or is marked NEW.

Also suggest he saves the pasted images as `03-content/Assets/2026-08-07-nfp-calendar.jpg`
and `2026-08-07-mnq-fvg-entry.jpg`. I can't save them myself because they are not on disk.

## DECISION v3: flow of text + widgets (he asked me to decide as a reader)
Preview v1 (https://claude.ai/artifact/BpkFzFjtJJVtVgCViV71dd) was all tiles. He liked it but
asked which reads best: tiles only, pure text, or a mix like Abhi.
Decision: a mix. Text carries the thinking, widgets carry the numbers.
- Tiles only give facts but no thread. Readers remember the reasoning, the "why", and that
  is what makes them come back. Pure text loses the skimmers on phones.
- Rule: text paragraphs (2 to 4 short lines, his voice) explain why. A widget appears only
  where a number, a comparison or a real screenshot is the point. Never two widgets in a
  row. Roughly one widget per 120 to 180 words.
- Don't hide the main story behind taps. Readers skip hidden content. The 5-tap stepper
  becomes a scroll story with the widgets inline. Taps only for optional depth (priced in,
  FVG, Apex drawdown).
- Hero: replace the Macro/Futures toggle with both sides visible as two short columns.
  Tabs hide half of who he is.
- The bookmark: end on an open loop. A "Next big number" card (event, date, IST time, what is
  priced in, "I'll write the scenarios before it lands") + a link to the Macro Desk. Also a
  "What you get here" tile row so the reader sees the whole site. The event/date is a
  placeholder for him to fill.

Page flow v3 (target 900 to 1,100 visible words):
1. Hero: label, title, 2 lines of text, two columns (Macro | Futures, 2 lines each), proof chips.
2. Gap: 2 lines of text in his voice, then 4 cards, then the punch line.
3. The night as a scroll story: text (Friday, 6 PM, what the market believed) → scenario cards
   → text (why I wait, never trade the print) → number flip + calendar shot → text (the
   chain, gold and Nasdaq together) → gap meter → text (room left, "if it had moved 300, no
   trade") → MNQ chart shot + FVG tap box → result chips + honest stop line → callout.
4. Honest part: text only, PersonalNote style (90/10 modes).
5. What you get here: 4 tiles.
6. Futures from India: text + firm fit picker + disclosure.
7. Bookmark ending: "Next big number" card + one line + Macro Desk link. Disclaimer.

Action: rebuild the preview as v3 at the same scratchpad file path (same URL), then ask for
his feedback in simple words, one piece at a time.

## (done) clickable preview v1
He couldn't picture the widgets from text descriptions, so build a quick private preview page:
- One HTML file in the scratchpad, published as a private Artifact (load the
  `artifact-design` skill first). Mobile first, light theme, simple neutral styling.
  Branding is not final, so no brand claims.
- Contents: piece 1 (hero with the "priced in" tap tooltip, Macro/Futures toggle, proof
  chips), piece 2 (4 gap cards), piece 3 (the 5-step NightStepper: scenario cards, the
  85K -> -23K number flip, GapMeter bars, FVG step with a tap-to-open box, result chips,
  then the callout).
- Images: the calendar and MNQ chart screenshots are not on disk yet. Use labelled
  placeholder boxes ("calendar screenshot goes here") until he saves them to
  03-content/Assets/. The Apex PDF stays a placeholder as well (no new tools to convert it).
- Copy exactly as approved in the skeleton below. Steps 1 to 5 use the stepper copy shown
  to him, marked as draft for his edits.
- Then send him the link and ask piece 3 feedback in very simple words. Show, don't describe.

## Locked facts (never change)
- Fri 7 Aug 2026. NFP at 8:30 AM ET = 6 PM IST. Actual -23K, forecast 85K, previous 20K
  (revised down from 57K). Unemployment 4.1%. Avg hourly earnings 0.1%.
- Backdrop: market had priced OUT a Sept rate hike, 2 hikes down to 1 that week after ADP
  44,000 vs 65,000. Gold +6% on week, above $4,300, new high near 4,316 (+7.4% from swing
  low), extended. Nasdaq inside prior day range, PDH 29,686, PDL 29,241, coiled.
  "One market running. One coiled. Same catalyst." "Everyone is on the same side."
- Chain: weak jobs -> fewer HIKES priced -> Nasdaq and gold up, dollar down. Gold and
  Nasdaq move together here, not opposite. Both trade the rate hike story.
- Scenarios: near 85K priced in, small move then fades. 150K+ consensus wrong, gold and
  Nasdaq down hard, dollar up. Below 40K move continues, gold and Nasdaq up, dollar down.
- Rule: never trades before the print ("that's gambling"). Waits 10 to 15 min. Print
  slippage of 50 to 100 points is normal.
- The read: the 6 PM repricing was only ~100 to 150 points. Surprises like this usually move
  ~300. Untapped 1H liquidity above, not yet taken, so there was room left. If ~300 had
  already printed, no trade.
- Execution: bullish 1 min FVG (BISI) on MNQ, entry 6:04 PM inside it, stop below the FVG.
  4 MNQ. 1 partial at ~30 to 40 points, 3 ran the full **102 points**. Closed just below
  the 1H liquidity target, because price often retraces deep near it. Roughly $500 to 600
  (math: 3 x 102 x $2 = $612). Stop size not remembered, say so honestly.
- Proof: Apex Trader Funding certificate, $1,446, approved 12 Aug 2026. It came from this
  trade plus 3 to 4 more days of clean post-NFP price action. Say that plainly.
- Lines to keep: "Some days you don't need a thesis. You just need to read the number and
  respect the direction." 90% / 10% modes and the "38 handles vs 102" line, from
  `03-content/drafts/substack-draft-warsh-friday.md` (that draft says 105, flagged to him).
- Terminology: "points" on the page, not "pips".

## Page skeleton v2 (target 700 to 900 words of visible text, 5 to 6 H2s)
Each piece gets approved by him before moving on. Status in brackets.

1. **Hero** [APPROVED]. Label "MACRO · FUTURES · FROM INDIA". Title "Know what's priced
   in. Trade what changes." Lines: "I'm Aayush. I trade Nasdaq futures from India. Before
   every big number, I know what the market already expects. When the number surprises, I
   trade it." Add a tap tooltip on "priced in" (one line: what the market already expects,
   so it is already in the price). Markets: he trades NQ/MNQ only. Gold and dollar are
   watched for correlation, never described as traded.
   Original spec: Small label, title, 2 lines on who he is (macro + futures, from
   India). Widget NEW `TwoSidesToggle`: tabs "Macro" / "Futures". Each shows 3 lines on what
   he does there and one real screenshot (Macro: the NFP calendar card. Futures: the MNQ
   chart). Proof chips: 102 points · 4 MNQ · Apex payout (tap opens certificate, labelled
   "payout that week").
2. **The gap** [APPROVED, 4 cards]. Copy: Chart only "You learn setups. FVG, order
   blocks. But at 6 PM price moves 300 points and you don't know why." · News only "You
   read headlines. Jobs weak, Fed this, Fed that. But nobody shows you the trade." · From
   India "From India, you can't easily trade US futures. Prop firms are the way in. I show
   you which ones, honestly." · Here: both "The number tells me the direction. The chart
   tells me where to get in. I show you both, on real trades." Line under: "Most people
   learn one side. The money is where they meet."
   Original spec: Why this site exists. Widget NEW `GapCompare`: 3 cards. "Chart only"
   (setups, no idea why price moved) · "News only" (headlines, no trade) · "Here: both"
   (the number tells you direction, the chart tells you where). 3 lines max under it.
3. **One real night, in 5 taps.** The NFP demo of fundamentals + technicals together.
   Widget NEW `NightStepper`, 5 steps, each = 1 screenshot or mini widget + 2 lines:
   (1) scenarios written the day before, `ScenarioCard` x3 · (2) 6 PM: -23K vs 85K, number
   flip + calendar image · (3) the reaction was too small, NEW `GapMeter` (usual ~300 vs
   this night ~100-150, "room left") · (4) 6:04 PM entry in 1 min FVG, MNQ chart image +
   tap-to-open "What is an FVG" · (5) 102 points, stat chips + honest line (stop not
   remembered, ~$600). Below it, one `KeyPointCallout`: "Read the size of the reaction
   against the size of the surprise."
4. **Honest part.** `PersonalNote`, 4 to 5 lines: 90/10 modes, most releases chop, never
   trade before the print, fundamentals alone are not a trade.
5. **What you get here.** NEW `ValueTiles`, 4 tiles linking to site sections: Macro Desk
   (what is priced in before every event) · Learn (news + chart, simple words) · Journal
   (real trades, wins and losses) · Start here (futures from India via prop firms).
6. **Futures from India.** Short. `PathSteps` 3 steps: learn the read → pass an
   evaluation → trade funded. NEW `FirmFitPicker`: "I'm new" → FundedNext; "I have an edge
   and can handle intraday drawdown" → Apex. MRKT tile for the macro read. Disclosure
   inline. Then `Disclaimer`.

Tap-to-open boxes (NEW `MoreBox`) hold depth: why gold and Nasdaq move together, what
"priced in" means, Apex intraday drawdown example, Warsh speech link.

### Firm notes for piece 6 (from his answers)
    - FundedNext (affiliate, CFD + futures): beginners. Cheap 5k/10k NAS100 CFD accounts.
      Futures with EOD drawdown. Strong payout structure.
    - Apex (plain link, NOT affiliate): intermediate/experienced. Intraday trailing drawdown
      follows unrealized profit, so a 1:3 trade reversing to breakeven still eats drawdown.
    - MRKT / mrktedge.ai (affiliate): his daily pre-market tool for what is priced in,
      especially Nasdaq where AI optimism, Trump, Fed, CPI and NFP all compete for weight.
    - `[DISCLOSURE]` plain statement: FundedNext and MRKT are affiliate links, Apex is not,
      this is my honest opinion.

## Affiliate rules applied (04-site/CLAUDE.md)
FundedNext affiliate URL is `https://fundednext.com/?fpr=AAYUSH` (covers CFD and futures).
Set it as the `url` in the fundednext entry of `04-site/src/data/partners.ts` (replacing
the TODO) and bump `lastVerified` to 2026-10-02. The page links via `/go/fundednext` and `/go/mrkt`. Apex gets a
direct site link and `partners.ts` stays inactive. No code above the first useful paragraph.
FundedNext code AAYUSH 10% off only in section 10. Inline disclosure next to each CTA.

## Verification
- Run `grep "—"` and check for hyphen connectors in the draft. Must be zero.
- Average sentence length check (target 9 to 13 words) with a quick word/sentence count script.
- H2 count within 5 to 6. Visible text 700 to 900 words (tap-to-open boxes excluded).
- Opening shares no phrase or structure with abhifutures "start from zero".
- Each piece approved by Aayush before the next is written.
- Every number in the draft matches "Locked facts" above, and each has a stated consequence.
- Disclosure and disclaimer lines present. Aayush reads it and marks lines to keep in his
  spoken grammar.
