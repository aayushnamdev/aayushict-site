# Affiliate links

Human-readable mirror of `04-site/src/config/firms.ts`, the actual source of truth the site
reads from. Update both when a code or URL changes. "Last verified" must be a real date, not
copy-pasted forward (BUILD-PLAN.md section 6).

| Firm | Type | Affiliate | Code | URL | Last verified |
|---|---|---|---|---|---|
| FundedNext | prop firm (CFD/MT5 and futures) | yes | AAYUSH, 10% off | https://fundednext.com/?fpr=AAYUSH via `/go/fundednext` | 2026-10-02 |
| Apex Trader Funding | prop firm (futures) | **no**, plain link | none | https://apextraderfunding.com (direct, no `/go`) | n/a |
| MRKT (Market Edge AI) | tool | yes | AAYUSH, 10% off (main affiliate) | https://www.mrktedge.ai/?ref=aayush via `/go/mrkt` | 2026-10-24 |

## Rules
- Affiliate links go through `/go/<slug>` with `rel="sponsored nofollow noopener"`.
- Apex is not an affiliate. Link it directly with `rel="noopener"` and say "Not an affiliate link."
- Inline disclosure next to every code.
- Max one inline CTA per article, plus the end-of-article CTA.
- Never place a code above the first useful paragraph.
- Firms compared by fit, never ranked.
