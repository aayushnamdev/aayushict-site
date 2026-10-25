# aayushict.space: Homepage and Structure Rework

Spec for Claude Code. Site is built with Astro. Read this whole file before editing anything.

## 1. Context

Almost every visitor arrives from the Instagram bio link of @aayush_ict, on a phone, inside Instagram's in-app browser, right after watching a reel. They give the page 10 to 20 seconds. The site is not indexed on Google yet, so search traffic is zero for now.

Audience: mostly Indian retail traders. Gold and forex traders on MT5, Indian options traders, people already on forex prop firms, and students who cannot afford an evaluation yet. Many do not know what NQ, ADP or Apex are.

Goals for the next 2 to 3 months, in order:

1. **Follow on Instagram.** The visitor understands who Aayush is and taps follow. This is the main conversion.
2. **Email signup.** Secondary, for the more interested visitor.
3. Returning readers. Not a goal yet. Do not optimise for it.

The follow promise is the journey: Aayush takes prop firm accounts from evaluation to payout, on real trades, and shows it on Instagram.

## 2. Ground rules

1. **Do not touch article bodies.** Pages under /learn/ and /journal/ (the actual posts) stay as they are. Only shared components (header, footer, email form) may change on those pages.
2. **Keep the design system.** Black base (#141011), wine #6E1A33, accent deep rose #B44C6C, white for interactive elements, headings in Aptos SemiBold, body in Source Serif 4, wordmark "aayushict" with "ict" in the accent. Reuse existing tokens and components. Do not redesign.
3. **Copy style.** Short sentences, plain words. No em dashes. No hyphens used as punctuation between clauses. Use commas and periods. Use the copy in this file exactly unless something breaks layout.
4. **Do not mention a course** anywhere. "How I trade, coming soon" stays as it is worded.
5. **Mobile first.** Test at 375 x 640 and 390 x 844. The in-app browser shows a top bar, so assume roughly 560px of visible height on first load.
6. Do not delete any page or route. Only the homepage loses sections.

## 3. Global changes (all pages)

### 3.1 Header

Current: wordmark, then Learn, Journal, About, Start here, plus a second "Start here" button on mobile.

New:

* Left: wordmark (links to /).
* Right: "About" text link, then a small white pill button **"Follow"** with the Instagram glyph, linking to `https://www.instagram.com/aayush_ict/`.
* Remove Learn, Journal and Start here from the header. They move to the footer.
* Remove the duplicate mobile "Start here" button and the mobile menu if it only held these links.

Reason: Learn and Journal each have one post right now. Thin sections in the top nav make the site look empty and pull visitors away from the follow.

### 3.2 Reusable Follow button component

Create one component, for example `FollowButton.astro`, with two sizes (pill for the header, large for page sections).

* Link: `https://www.instagram.com/aayush_ict/`
* Open in the same tab (no `target="_blank"`). Inside Instagram's in-app browser this returns the visitor straight to the profile.
* Large version label: **Follow the journey on Instagram**, with a small line under it: **@aayush_ict**
* Add a `data-cta` attribute with a location value (`header`, `home-hero`, `home-why`, `home-sticky`, `start-here`, `about`) for analytics (see section 7).

### 3.3 Email form, one per page

Right now several pages render two email forms stacked at the bottom (the page form and the global footer form). Fix this:

* If a page already has its own email form, do not render the global footer form on that page.
* Keep the existing email provider and submit handler. Do not change where emails go.
* Single field: email. Button: **Sign me up**. Add `autocomplete="email"`, `inputmode="email"`, `type="email"`.
* Microcopy under the form: **One email on Sunday. Unsubscribe anytime.**
* If the provider supports a hidden field or tag for signup source, pass the page name (e.g. `home`, `how-i-trade`). If not, skip it.

### 3.4 Footer

* Row 1, page links: **Start here · About · Learn · Journal · How I trade**
* Row 2, socials: Instagram · X · Substack (keep current links)
* Row 3: Disclosure · Disclaimer · Privacy
* Keep the line: **Not a signal service. Not advice. Stop loss on.**

## 4. Homepage: new structure

The whole page should be about three phone screens long. Order:

1. Hero
2. Proof
3. Why follow
4. Email
5. Footer

Plus a sticky follow bar on mobile.

### 4.1 Hero (screen 1)

**Changed by Aayush, 25 Oct 2026:** the hero primary button is **About me →** (links to /about), not Follow. Visitors come from the Instagram bio and want to know who he is first. Follow is the main button on the About page. Do not put the large Follow button back in the hero.

Requirement: the large primary button (About me) must be visible without scrolling at 375 x 640.

Layout on mobile: small round portrait (about 72 to 88px) next to or above the name, not the current large portrait. On desktop the larger portrait can sit to the right.

Copy:

* Eyebrow: **Funded Nasdaq futures trader**
  (replaces "Macro · Futures · From India")
* H1: **I'm Aayush. I trade Nasdaq futures from India.**
* Line 1: **$16.5K paid out by prop firms so far. Every payout is shown below.**
* Line 2: **On Instagram, I take prop firm accounts from evaluation to payout, step by step.**
* Primary: large Follow button (`data-cta="home-hero"`)
* Secondary, small text link under it: **Or get the Sunday email ↓** (anchor to the email section `#email-home`)

Remove from the hero: the three bullet list (ICT strategies, Macro news, Prop firms), the "About me" and "Start here" buttons.

### 4.2 Proof (screen 2)

Keep the existing payout pile component. Change:

* Heading: **9 Apex payouts since June 2026.**
* Subline: **Plus earlier payouts from Apex and Alpha Capital. $16.5K in total, as of 24 Oct 2026.**
* The top card must show face up on load with its label (firm, amount, date) visible without tapping.
* Keep "Tap to flip through" as a small hint.
* Link under the pile: **See the full list →** pointing to `/about#payouts` (add that id to the payout table section on About if missing).
* One honest line below: **Most days are a small 1 to 1 and done. Big nights are rare. I show both.**

Keep the "as of" date in a single config value so it updates in one place.

### 4.3 Why follow (screen 3)

Heading: **What you get by following**

Three short items, no cards with long text, one line each with a bold lead:

1. **Evaluation to payout.** Watch accounts go from the test to the payout, on real trades.
2. **The news, simply.** Before NFP, CPI and the Fed, what is priced in and what could move NQ and gold.
3. **ICT without the jargon.** FVGs, liquidity and sessions, in plain words.

Then a large Follow button (`data-cta="home-why"`).

Then one small text link: **New here? Read one real night, 7 min →** linking to `/start-here`.

### 4.4 Email (bottom, id `email-home`)

* Small label: **Coming soon**
* Heading: **How I trade, every day.**
* Copy: **The model behind about 95% of my trades. I will show all of it. Email subscribers get it first, plus the week ahead every Sunday.**
* Keep the existing "Asia · London · New York, same model, every session" visual if it fits in one line. Otherwise drop it.
* Email form (section 3.3), source `home`.
* Small link: **See what's coming →** to `/how-i-trade`.

### 4.5 Sticky follow bar (mobile only, homepage only)

* Appears only after the hero Follow button scrolls out of view (use IntersectionObserver on the hero button).
* Hides again when the "Why follow" Follow button or the email section is in view, so two follow buttons never show at once.
* Slim bar at the bottom: portrait thumbnail, **@aayush_ict**, and a white **Follow** pill (`data-cta="home-sticky"`).
* Respect `env(safe-area-inset-bottom)`.
* No close button needed, but it must not cover the email input when the keyboard is open (hide it on input focus).

### 4.6 Remove from the homepage

Delete these sections from the homepage only. Their content already lives on other pages.

| Section | Where it lives now |
|---|---|
| "The gap: Most people learn one side" (4 cards) | Drop. The idea is already in Start here. |
| "One real night: Friday 7 August" + NFP numbers card | Start here (already there in full) |
| "The honest part: This night was rare" | Start here (already there). One line kept in 4.2. |
| "Read it in this order" (3 steps) | Drop. Duplicates the grid below it. |
| "What you get here" grid (Start here, Learn, MRKT, Sunday email) | Drop. Links move to footer. |
| MRKT affiliate card | Start here (already there with code AAYUSH) |
| Separate "Coming soon: How I trade" block | Merged into the email section 4.4 |

Do not delete the components themselves if Start here or other pages use them.

## 5. Other pages

### 5.1 Start here

* Keep all content.
* It already has a "Follow on Instagram" button near the end. Swap it for the shared Follow component (`data-cta="start-here"`).
* Remove the duplicate second email form at the bottom (section 3.3).

### 5.2 About

* Add the Follow component right after the intro paragraphs and before the payout pile (`data-cta="about"`).
* Add `id="payouts"` to the payout section.
* **Change this line:** "I do not sell mentorship. I do not sell courses or signals."
  **To:** "I do not sell signals."
  Keep the next sentences about affiliate links and the disclosure as they are.
* **Payout dates must match.** The table and the certificates show different dates for the same payouts (e.g. certificate "approved 30 September", table "1 Oct"). Use the certificate date everywhere: pile labels, table, alt text. Move all payout data into one data file (e.g. `src/data/payouts.ts`) that the homepage pile, the About pile and the About table all read from, along with the total and the "as of" date.
* Remove the duplicate second email form at the bottom.

### 5.3 Learn and Journal

* Index pages stay. They are now reached from the footer, not the header.
* No changes to posts.

### 5.4 How I trade

* Remove the duplicate global email form under the page's own "Get it first" form. Source tag `how-i-trade`.

## 6. Instagram in-app browser checks

* Test the homepage by opening it from an Instagram bio link on a real phone (Android and iOS if possible), not only in desktop dev tools.
* Follow links must open the Instagram profile, not a login wall. The plain `https://www.instagram.com/aayush_ict/` URL in the same tab does this.
* The payout pile tap interaction must work with touch. No hover only behaviour.
* Images: keep using the optimised webp from Astro. Lazy load every payout image except the top card.
* First load target: the hero renders with fonts and the button in under 2 seconds on a mid range Android on 4G. Preload the heading and body font files used above the fold.

## 7. Analytics

* Check what analytics the site already uses. If there is one, send an event on click of any element with `data-cta`, with the attribute value as the label, and an event on email form submit with the source.
* If there is no analytics, do not add a heavy tool. Leave a single `trackCta(label)` helper that is a no op for now, wire it to the buttons, and note in your summary that a tool still needs to be chosen.

## 8. Done checklist

* [ ] Homepage is about three phone screens tall.
* [ ] Follow button visible on first screen at 375 x 640.
* [ ] Header shows only wordmark, About and Follow.
* [ ] Footer holds Start here, About, Learn, Journal, How I trade.
* [ ] Every page has at most one email form.
* [ ] Sticky follow bar shows only between the hero and the "Why follow" section, mobile only.
* [ ] Payout data comes from one file. Dates match the certificates. Total and "as of" date set in one place.
* [ ] About no longer says "I do not sell courses".
* [ ] No em dashes or hyphen connectors in any new copy.
* [ ] No article body under /learn/ or /journal/ changed.
* [ ] Build passes, no console errors, Lighthouse mobile performance and accessibility both 90 or higher on the homepage.

When finished, give a short summary of what changed, anything you could not do, and screenshots of the homepage at 375px width.

## Addendum 25 Oct 2026: model preview (decided by Aayush)

Goal: raise curiosity about how he trades without giving the entry model away. Wording is "Preview, then more". Never say "all of it". The word course appears nowhere on the site.

Three steps, each a little deeper:
1. Home: one hook line beside the payouts ("Each one came from 20 to 30 minutes of trading a day") plus a link to the preview. The email band teases the preview.
2. About: a short "How I trade" gist.
3. /how-i-trade: "My model, a preview". A tap-through day routine, a "Would I trade today?" check, and locked cards for what is kept back.

Shown: NQ only, mostly New York AM, macro for correlation, the order daily then 1 hour then 5 minute then 1 minute entry, the skip rules (choppy daily, chopping 5 minute), one trade a day then lock the account, 20 to 30 minutes a day.

Sealed (locked, blurred card with a one line teaser only): the entry model, exits, stop, risk sizing, what he does after a loss, and any number that points at them. Details live only in local memory, never in this public repo.

## Addendum 25 Oct 2026: Buttondown confirm page and email

The Buttondown page and email that visitors see after signing up are Buttondown's own. On the current plan, custom CSS and custom confirmation emails are blocked (Standard plan needed).

Done in the account: icon replaced (the old Substack link was dead), tint colour changed from Substack orange to wine `#6E1A33`, icon alt text `aayushict`.

Open choice for Aayush: upgrade to Standard and apply a dark wine theme plus a written confirmation email, confirm on his own site, skip the confirm step, or leave it as it is.

