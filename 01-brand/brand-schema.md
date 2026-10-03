# aayushict brand schema

Version 1, 2 October 2026. Website focus. For aayushict.space.

Black for reading. Wine for the brand. White where you touch, play or compare. Deep rose for small accents on black.

## 1. Colours

All values also live in `tokens.css` and `tokens.json`. Use the token names in code.

### Black side

| Name | Hex | Token | Use |
|---|---|---|---|
| Page | #141011 | --page | Background of every page |
| Page deep | #0E0B0C | --page-deep | Behind frames, outside the page |
| Surface | #1E1719 | --surface | Cards and boxes on black |
| Raised | #2A2124 | --surface-raised | Chart and image frames |
| Line | #2B2325 | --line | Borders and dividers |
| Line strong | #3A2A2F | --line-strong | Open term tip border |

### Text on black

| Name | Hex | Use |
|---|---|---|
| Heading | #F6F1EE | Titles. Never pure white |
| Body | #E9E3E0 | All reading text |
| Soft | #C9BEC1 | Intro line, card text |
| Muted | #8C7F82 | Dates, captions, sign off |
| Number | #FFFFFF | Numbers inside text only |

### Brand

| Name | Hex | Use |
|---|---|---|
| Wine | #6E1A33 | Buttons, wine band, selected toggles, key number on white |
| Deep rose | #B44C6C | Logo "ict", labels, links, term underline, step numbers. On black only |
| Wine deep | #5A1429 | Cards inside the wine band |
| Rose on wine | #F7C9D1 | Labels and logo accent inside the wine band |
| Text on wine | #F5E6EA | Body text inside the wine band |

### White side

| Name | Hex | Use |
|---|---|---|
| White | #FFFFFF | Interactive cards, numbers table, contrast bands |
| White tint | #F7F2F3 | Tiles inside white cards |
| White line | #EADDE0 | Borders on white |
| White track | #F3ECEE | Toggle background |
| Ink | #1A1416 | Headings and numbers on white |
| Ink body | #3A3134 | Body text on white |
| Ink muted | #5E5457 | Labels on white |

### Direction

| | On black | On white |
|---|---|---|
| Up | #5FD39A | #117A45 |
| Down | #FFB27A | #9A5B00 |

Red and green already mean down and up in trading, so they are never brand colours. Direction always shows an arrow plus a word: ▲ Up, ▼ Down, ◆ Chop.

## 2. Where white lives

Reading always happens on black. White appears only where something needs to stand out or be touched.

Home page bands, top to bottom: black hero, white "the gap", black "one real night" with a white numbers card, wine "this night was rare", white "what you get here", black footer.

Reading pages: black page. White cards for toggles, sliders, quizzes and numbers tables. Inside white, wine is the selected colour.

## 3. Fonts

| Job | Font | Notes |
|---|---|---|
| Headings | Aptos SemiBold (600) | Microsoft font. Phones without Office show Figtree, set as fallback |
| Reading | Source Serif 4 | All body text. Google Fonts |
| Interface | Instrument Sans | Nav, buttons, toggles, captions, meta |
| Numbers | JetBrains Mono | Every number, price, time, section label |

Font stack for headings: `Aptos, "Figtree", "Segoe UI", sans-serif`

### Sizes

| Use | Font | Laptop | Phone | Line height |
|---|---|---|---|---|
| Home hero line | Aptos 600 | 68 | 40 | 1.08 |
| Home section heading | Aptos 600 | 44 | 30 | 1.15 |
| Page title | Aptos 600 | 54 | 36 | 1.1 |
| Section heading | Aptos 600 | 34 | 27 | 1.2 |
| Sub heading | Aptos 600 | 24 | 21 | 1.3 |
| Intro line | Source Serif 4 | 24 | 20 | 1.55 |
| Body text | Source Serif 4 | 21 | 18 | 1.8 |
| Number in text | JetBrains Mono | 17 | 15 | same as text |
| Nav and buttons | Instrument Sans | 15 | 14 | 1 |
| Meta and captions | Instrument Sans | 14 | 13 | 1.5 |
| Section label | JetBrains Mono, capitals, spacing 0.1em | 13 | 12 | 1 |

## 4. Wordmark

Text: `aayushict`. One word, all lowercase, no underscore. Aptos Bold (700). "ict" carries the accent.

| Background | "aayush" | "ict" |
|---|---|---|
| Black | #F6F1EE | #B44C6C deep rose |
| White | #1A1416 | #6E1A33 wine |
| Wine | #FFFFFF | #F7C9D1 soft pink |

Letter spacing by size: tight when big, looser when small.

| Size | Letter spacing |
|---|---|
| 72px and up | −0.035em |
| 44px | −0.035em |
| 28px | −0.02em |
| 20px (site header) | 0 |
| 14px and below | +0.015em |

Heavy version: Aptos ExtraBold (800), spacing −0.045em at large size. Thumbnails and covers only, never the site header.

Profile picture and favicon: "ai" in Aptos ExtraBold, "i" in deep rose, black circle with a thin wine ring.

Don't add an underscore. Don't put deep rose on wine. Don't keep tight spacing below 28px.

## 5. Building blocks

| Piece | Rule |
|---|---|
| Primary button | Wine background, white text, Instrument Sans 500, radius 10, at least 44px tall on phone |
| Button on wine | White background, wine text |
| Proof chip | JetBrains Mono on surface, line border. Wine border means it opens proof |
| Term tip | Dotted deep rose underline. Opens a surface card with the word in deep rose |
| Numbers table | White card, radius 16. Key number in wine, others in ink |
| Scenario card | White card. Toggle track #F3ECEE, selected tab wine |
| Pull line | Source Serif 4 italic, 3px wine bar on the left. One per page at most |
| More box | Surface card, "Go deeper" label in deep rose |
| Chart frame | #2A2124, radius 12, caption Instrument Sans 14 muted |
| Call box | Full wine, white heading, white button with wine text |
| Sign off | JetBrains Mono 14, muted. "Not advice. Stop loss on." |

## 6. Layout

Laptop reading width 900px. Text, white cards and charts share the exact same left and right edges. Use `box-sizing: border-box` everywhere so padding never pushes cards wider than text.

Phone: 22px side padding. Side by side cards stack. Check every page at 375px.

Corners: buttons 10, cards 14, white interactive cards 20 on laptop and 18 on phone.

## 7. Voice

First person. Sentences of about 9 to 13 words. Plain Indian English. No em dashes, no hyphens joining thoughts. Never "hawkish" or "dovish". Real numbers only, and if something isn't remembered, say so. Losing trades stay visible. Every market post ends with "Not advice. Stop loss on."

## 8. Still open

Instagram carousel and story templates. Briefing, journal, start here and about pages, which will reuse these pieces. All page copy in the designs is placeholder, to be rewritten in your own words.
