# How to publish a post

Pushing to `main` on GitHub deploys the site in about a minute. No other step.

## 1. Pick the section
| Section | Folder | Use it for |
|---|---|---|
| Journal | `src/content/journal/` | Your story, trading days, calls |
| Learn | `src/content/learn/<category>/` | Guides. Categories: `macro-events`, `ict-with-macro`, `prop-firms`, `payouts`, `tools`, `psychology` |
| Macro | `src/content/macro/` | Week ahead, briefings, reviews. Not on the nav yet. Add a `/macro` index page first (copy `src/pages/journal/index.astro`), then add it to `nav` in `src/config/site.ts` |

The file name becomes the web address. `my-post.mdx` in Journal is `/journal/my-post`.

## 2. Copy a template

Journal story:
```
---
title: "Your title"
description: "One line for Google and link previews."
kind: story            # story, trading-day or call
date: 2026-10-24
draft: true            # remove this line, or set false, to publish
---

Your text here.
```

Learn guide (`src/content/learn/prop-firms/your-slug.mdx`):
```
---
title: "Your title"
subtitle: "One line under the title. Also the search description."
category: prop-firms
updated: 2026-10-24
readMinutes: 6
route: ['Tag one', 'Tag two']
draft: true
---
```

Macro post:
```
---
title: "Your title"
subtitle: "One line."
kind: review           # week-ahead, briefing or review
date: 2026-10-24
readMinutes: 5
draft: true
---
```

## 3. Drafts
`draft: true` hides the post on the live site. You still see it on your own computer with `npm run dev`. Delete the line when it is ready.

## 4. Images
Put the file in `src/assets/`. At the top of the MDX file, under the frontmatter:
```
import ShotFrame from '../../components/ShotFrame.astro';
import shot from '../../assets/proof/your-image.png';

<ShotFrame src={shot} alt="What the image shows" caption="One line caption." id="shot-one" />
```
Plain `![alt](../../assets/your-image.png)` also works. Always write the alt text.

## 5. Check, then go live
```
cd 04-site
npm run dev      # open http://localhost:4321 and look at your post on a narrow window too
npm run build    # must finish with no errors
git add -A && git commit -m "Add post: your title" && git push
```

## Rules to keep
- Your words, your grammar. About 10 word sentences. No em dashes.
- Market posts get "Not advice. Stop loss on." added automatically. Do not type it.
- Affiliate links go through `/go/<slug>`, never a raw partner URL. Partners live in `src/config/firms.ts`.
- The Sunday email signup is added to the bottom of every post.
