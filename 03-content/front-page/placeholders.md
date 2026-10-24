# Lines not yet in Aayush's words

Built as placeholders. Rewrite these, then update the page. Search "PLACEHOLDER" in the code.
Source wording: `../drafts/start-from-zero.md`.

## Home page (`04-site/src/pages/index.astro`)
- Both side cards (macro side, futures side). Links go to /macro and /journal for now.
- Gap heading "Most people learn one side." and the line under it.
- The four gap cards (draft wording, not on the original unrewritten list).
- Punch line "The money is where they meet. Here is one real night."
- Hero intro: "so it's already priced in" reads slightly stiff.
- Short night band and honest part: shortened from the draft, check the wording.
- The four "What you get here" tiles and the question under the heading.

## Start here page (`04-site/src/pages/start-here.astro`)
- Subtitle "One real Friday night, why it was rare, and how I trade US futures from India." and the meta line (read time is an estimate).
- Linking lines in the night story ("Here is what most people miss...", "So the market was not done...").
- Firm text: FundedNext, Apex and MRKT paragraphs are the draft's wording. Pros and cons in `04-site/src/config/firms.ts` are still empty.
- The FAQ answers come from the approved reference design. Rewrite in your voice if needed.
- The "Open the Macro Desk" closing lines are the draft's.

## Also check
- The Tradovate screenshot is a tilted photo of a screen. Consider a cleaner retake.
- The FundedNext card label comes from `fit` in `firms.ts` ("Gold and forex traders on MT5"), but the text says "my pick for beginners".
- The draft put the calendar screenshot right after the number flip. The page puts one line between them so no two widgets sit in a row.

## Home band 4 (changed 4 Oct)
- The "Room left" meter was replaced by a "Read it in this order" card (Start here, Macro Desk, Journal). Its three one-line descriptions are the draft's wording, not yet in Aayush's words. The meter still lives on /start-here.

## About page (built 4 Oct 2026)
- All copy is drafted from Aayush's own notes (real trader, scalping model on the 1 minute chart in the New York morning session, macro for direction and conviction, no jargon, no mentorship, affiliate links only). He has not read and edited it yet. His phrase "I strip down every jargon" was kept as he said it.
- Facts to confirm: "six years in markets" and "MA in Psychology" (from the site brief and his Instagram bio), "mostly with Apex" and "some from Alpha Capital".
- Payout numbers live in `04-site/src/config/payouts.ts`. Paid total is computed ($16,476 as of 24 Oct 2026, shown as $16.5K), checked against the Apex payout history page. Aayush confirmed every payout is paid. The $536 and $1,415 rows have no certificate, so their proof is a dashboard crop with the account number covered (scripts/make-payout-proof.mjs). All other payouts have certificates (added 24 Oct 2026). Update the file when a payout is paid.
- Originals saved in `03-content/Assets/payouts/`. The Apex dashboard screenshot is not published, only the typed table and the certificates.

## Legal pages (drafted 4 Oct 2026, need Aayush's read)
- Disclosure, Disclaimer and Privacy are drafted from how the site works today and his notes. Not yet read by him.
- **Confirm:** "I am not a financial adviser" (Disclaimer). If any SEBI or local rule applies to him, get a legal read before launch.
- **Privacy says no analytics and no cookies.** If analytics, a chat widget or any tracker is added later, update the Privacy page the same day.
- Contact is Instagram DM or replying to any email. No email address is published. Add a dedicated address when he has one.
- The Disclosure partner list is built from `04-site/src/config/firms.ts`, so codes and verified dates stay in sync.

## 24 Oct 2026 changes (need Aayush's read)
- Home: new "The proof" band with the 3D certificate stack. Hero shows his photo once `04-site/src/assets/photos/portrait.(jpg|png|webp)` exists. Instagram photos named `ig-*.jpg` in the same folder join the stack. Until then the two side cards stay.
- Start here: new "The tool I open every morning" section (MRKT, code AAYUSH) before the prop firm picker. Lines are built from his earlier MRKT text and are not yet in his own words. MRKT is the main affiliate: code AAYUSH, 10% off.
- Privacy page already mentions Vercel Analytics. It now also says signups pass through the site's server to Buttondown.
- Email signup now goes through `/api/subscribe`. The Buttondown key must be set in Vercel (BUTTONDOWN_API_KEY) or signup fails on the live site.
