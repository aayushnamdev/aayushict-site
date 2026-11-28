# Welcome email for Instagram reel signups (draft, 28 Nov 2026)

Status: DRAFT in Buttondown. Not sent, not switched on, not merged.

- Reel: posting Sat 28 Nov. Bio link is https://buttondown.com/aayushict (Buttondown's own page, no site form).
- Buttondown draft: `em_56apz81w708qa950qgrvh38sa6`, subject "Your jobs number breakdown is coming". Text only. The banner is added after it is approved and uploaded.
- Banner: `banner.png` (1200 x 400, about 51 KB), made from `banner.html` with the site fonts (Figtree 700 and 800, Instrument Sans 500) and tokens.
  To render again: install `@fontsource/figtree` and `@fontsource/instrument-sans` in a scratch folder, point the `FONTDIR` paths in `banner.html` at their `files` folders, open it in Chromium at 1200 x 400 and screenshot.
- Who gets it: signups made on buttondown.com/aayushict. Those subscribers have no `metadata.source`. Every signup from the site forms has one (website, home, style-test and so on), so they are left out. Style test signups keep their own result email.
- How it is sent: a Buttondown automation (trigger "subscriber confirmed", filter `metadata.source` is empty, action send email). It makes no API calls from the site and does not touch the 100 a day subscriber creation limit.
- Switch off: pause the automation after the number drops on Fri 4 Dec 2026, 7 PM IST (13:30 UTC), or when the breakdown is sent.
