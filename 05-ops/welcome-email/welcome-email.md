# Welcome email for Instagram reel signups (draft, 28 Nov 2026)

Status: DRAFT in Buttondown. Not sent, not switched on, not merged.

- Reel: posting Sat 28 Nov. Bio link is https://buttondown.com/aayushict (Buttondown's own page, no site form).
- Buttondown draft: `em_56apz81w708qa950qgrvh38sa6`, subject "Your jobs number breakdown is coming". Text only. The banner is added after it is approved and uploaded.
- Banner: `banner.png` (1200 x 400, about 51 KB), made from `banner.html` with the site fonts (Figtree 700 and 800, Instrument Sans 500) and tokens.
  To render again: install `@fontsource/figtree` and `@fontsource/instrument-sans` in a scratch folder, point the `FONTDIR` paths in `banner.html` at their `files` folders, open it in Chromium at 1200 x 400 and screenshot.
- Who gets it: signups made on buttondown.com/aayushict (Buttondown's source "organic") that came from the Instagram link (referrer l.instagram.com) and have no `metadata.source`. Every signup from the site forms has a source, so they are left out. Style test signups keep their own result email.
- How it is sent: the confirm hook (`/api/buttondown-hook`). `src/lib/leadmagnet.ts` decides the source, `reelWelcome` in `src/config/email.ts` holds the email id and the end time. 2 Buttondown calls per confirm, none of them the 100 a day subscriber creation limit.
- Why not a Buttondown automation: activating one needs the Standard plan (Buttondown answered 403 on 28 Nov 2026). An inactive automation `aut_2frwc4x5959qcscms97ncbv4ve` was created and can be deleted.
- Auto-stop: the hook stops sending at Fri 4 Dec 2026, 13:30 UTC (the jobs number, 7 PM IST). Nothing to pause by hand. Change `endsAt` in `src/config/email.ts` to end it sooner, or remove `reelWelcome` from `leadMagnets`.
- The email: Buttondown status must stay `transactional` (a draft cannot be sent to one person).
