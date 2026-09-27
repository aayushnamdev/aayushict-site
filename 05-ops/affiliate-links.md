# Affiliate links

Human-readable mirror of `04-site/src/data/partners.ts`, the actual source of truth the site
reads from. Update both when a code or URL changes. "Last verified" must be real, not copy-pasted
forward, per build-plan-v2.md §8.2.

| Partner | Type | Status | Code | URL | Last verified |
|---|---|---|---|---|---|
| FundedNext | prop firm (CFD/MT5) | recommend | AAYUSH | TODO real affiliate URL | 2026-09-27 |
| Apex Trader Funding | prop firm (futures) | trade-funded | TODO | TODO | inactive until code exists |
| MRKT (Market Edge AI) | tool | active | — | https://www.mrktedge.ai/?ref=aayush | 2026-09-27 |

## Rules (build-plan-v2.md §8.2)
- Every link goes through `/go/[slug]`, `rel="sponsored nofollow noopener"`.
- Inline disclosure next to every code.
- Max one inline CTA per article, plus the end-of-article CTA.
- Never place a code above the first useful paragraph.
- Firms compared by fit, never ranked.
