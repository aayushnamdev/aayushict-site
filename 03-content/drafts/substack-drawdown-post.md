# INSTRUCTIONS FOR CLAUDE CODE

Everything above the `---ARTICLE START---` marker is instruction. Do not publish any of it. Everything below `---NOTES START---` at the bottom is also instruction, not article body. Only the section between the two markers is the post.

## Field mapping
- **Post title:** the line under `## Title`
- **Subtitle:** the line under `## Subtitle`
- **Body:** everything under `## Body`, down to `---NOTES START---`

## Formatting rules
1. `##` inside the body becomes Substack Heading 2. Do not convert headings to bold paragraphs.
2. Preserve every paragraph break exactly as written. Short paragraphs are intentional.
3. Preserve `**bold**` only where it already exists. Add none.
4. No italics, blockquotes, pull quotes, or horizontal rules.
5. Never use em dashes or hyphens as connectors. Hard rule.
6. Do not tighten, formalise, smooth, or add transitions. The grammar is deliberately spoken. The author is an Indian English speaker writing for non-native English readers.
7. Two diagrams are referenced inline as `[DIAGRAM A: ...]` and `[DIAGRAM B: ...]` placeholders, plus one screenshot as `[DIAGRAM C: ...]`. Replace each with the actual uploaded image markdown (`![alt](https-url "caption")`) when pushing to Substack. Do not publish the placeholder text itself.
8. Keep the disclaimer as the final line.

---ARTICLE START---

## Title

Your account is charging you for profit you never took

Alternates if you want to test: "The cheapest account is a bet on your trading style" and "Nobody tells you which trader the account was built for"

## Subtitle

A break even trade can cost you $250. The account type you bought decides whether it does.

## Body

Here is a trade that does not exist on a normal account.

You risk $100 going for $300. Price runs to $250 in your favour, stalls, turns, and you come out at break even. Nothing gained, nothing lost. On your own broker account, or on an end of day drawdown account, that trade never happened. Your balance is exactly where it started.

On an intraday trailing account you are now down $250 and you never made a dollar.

Most traders find this out the way I did, which is afterwards. So it gets filed under hidden rules, the thing everyone warns you about on Twitter without ever explaining. But it is not hidden. It is printed on the pricing page of every firm that sells it. I could have read it before I bought.

What is actually hidden is something else.

[DIAGRAM A: Two panels, same trade. Left panel intraday trailing, threshold ratchets from $47,500 to $47,750 on the peak and stays there, ending room $2,250. Right panel end of day, threshold flat at $47,500, ending room $2,500. Caption: "Same trade, same flat result. Intraday trailing quietly took $250 of buffer."]

## What the trailing number is measuring

An intraday trailing drawdown does not follow your closed profit. It follows the highest point your equity touched during the session, including profit you never took. Price moves in your favour, the drawdown line moves up behind it. It does not come back down when the trade does.

That means the account is not really measuring your results. It is measuring your unrealized highs. Those are two different things, and the gap between them is the exact space a high risk to reward trader lives in.

If your edge is built on letting a runner go, holding through a retracement, waiting for a second leg. Then every one of those decisions is charged to you at its peak value. It does not matter whether you collect. The account was never designed to punish you. It just quietly prices the one behaviour your whole method depends on.

The account type is a bet on your trading style, and nobody tells you which style it is betting against.

Two traders buy the same 50K account on the same day. One scalps, books in points, never lets a position float far from entry. The other takes three trades a week at 1 to 3 risk to reward, and sits through drawdown inside the trade to get there. Same fee, same rules, same platform. One of them is trading on a model that matches how they make money. The other is trading a model that fines them for their own edge.

Neither is a better trader. The mismatch is not a skill problem. It will not show up in your journal as one. It shows up as a string of break even days that somehow left you closer to the line.

## The finish line most people do not know about

There is a detail here that almost nobody mentions, and it changes how brutal this actually is.

This part applies once you are funded, not while you are still in the evaluation. In the evaluation the intraday trail keeps trailing your peak for as long as you are in it, with no freeze.

On a funded Apex 50K, the freeze is real but further out than most people think. The trailing threshold locks once it reaches $50,100, your starting balance plus $100. That happens once your balance hits $52,600. Everything above applies until you cross that line, and then it is over.

[DIAGRAM B: Horizontal scale from $50,000 to $52,600, threshold rising behind the balance and freezing at $50,100. Caption: "The threshold trails your balance up to $52,600, then locks at $50,100 for good."]

[DIAGRAM C: Apex's own help center table. Caption: "Straight from Apex's own help center. Safety net $52,100, minimum balance to request a payout $52,600."]

That reframes the whole thing. You are not fighting an account that hunts you forever once you are funded. You are surviving a defined stretch. The style question is really a question about whether your method can cross $2,600 while being charged for its own floating profit. Some methods can. Some can, but not in the way they normally trade.

Go and look at yours. Most people holding one of these accounts have never checked where their threshold currently sits.

## Fit is not edge

I trade an intraday trailing account. It costs me almost nothing, because I scalp Nasdaq, take small points and book them fast. My profit rarely floats far enough for the trailing line to catch anything I did not already collect.

That is not me being good at prop firm rules. That is my style happening to line up with the product. I want to be precise about it. The version of this post where I explain how I beat the trailing drawdown would be a lie. I did not beat it. Most days it never has the chance to.

The useful move is not to find the cheapest account. Look at your last 30 trades. Work out how much profit you typically leave floating before you close. Buy the drawdown model that does not charge you for it.

If you read the break even trade at the top and recognised yourself, the model you want is end of day.

End of day trailing works on your closing balance, not your intraday peak. Your trade can run to $250, come back, and close flat, and the floor does not move. Same trade, no charge. It still trails upward as you post new daily highs, and it still locks once your profit equals the drawdown amount. The structure is the same. It just stops pricing the part of the trade you never collected.

FundedNext runs end of day on every one of their futures models, which is why I point people there when the style question comes up. Worth knowing before you buy: positions have to be flat by 3:10 PM Central, so nothing holds overnight.

For most people the harder problem is not passing. It is what happens after. Most traders who buy one of these accounts pass the evaluation without much trouble. Very few of them ever collect a payout. The days between passing and payout are where accounts actually die, not the evaluation itself.

My link is [fundednext.com/?fpr=AAYUSH](https://fundednext.com/?fpr=AAYUSH) (affiliate link) and the code is AAYUSH for 10% off futures. I earn if you use it, and the account I trade myself is Apex. Use it only if end of day is the model you actually need.

These are simulated accounts on real exchange data.

Not financial advice. Trade with a stop loss.

---NOTES START---

## Notes on how this is built

The first two lines carry double duty. Substack sends the post as an email, and most inboxes show the opening sentences as preview text next to the subject line. Starting on the trade itself rather than on a greeting or a housekeeping line means the preview reads as a hook, not as admin.

The subtitle is doing the job of extending the title rather than repeating it. The title raises a claim, the subtitle puts a number on it.

Headings are H2 only, and cut down to three from the original five sections, since the section word count was running well under the 250 to 350 word per heading target. The sections that lost their own heading became paragraph transitions instead, nothing in them was deleted.

No bullet lists anywhere in the body. The argument here is sequential, and breaking it into bullets would flatten the one thing that makes it work, which is that each section reframes the last one.

Diagram C is Apex's own help center table, not a screenshot of Aayush's personal account dashboard. The post's positioning depends on honesty about uncertainty being the moat, so a caption claiming "my own dashboard" over a public documentation page would be a false claim and was rejected during the audit in favour of citing the source honestly.

One CTA maximum. The closing line is already the CTA, which is go and check your own threshold. Do not stack a subscribe prompt on top of it inside the body. Substack appends its own subscribe button.

The affiliate sits near the end and only after the post has spent most of its length explaining why most people buy the wrong model. Put the same link in paragraph two and the whole essay reads as a setup for it. Put it where it is now and it reads as the answer to a problem you just proved exists. Verify the 10% and the 3:10 PM cutoff on your own dashboard before publishing, since both are the kind of detail firms change quietly.

Numbers corrected during the 2026-09-19 audit: the opening trade now costs $250, not $50, matching the trail mechanic (cost = peak minus realized, not a flat $50). The Apex 50K freeze point was $2,100 in the original draft; corrected to $2,600 (threshold locks at $50,100) against Aayush's own trading notes and Apex's public rules, since $2,100 is the end of day variant's number, not the intraday trailing one this post is about. The evaluation versus funded distinction was added because the freeze does not apply during the evaluation. The failed-evaluations line was replaced with the payout gap line since the original was unsourced and his notes describe the opposite pattern, passing easily but not reaching payout.
