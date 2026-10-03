# Design tokens

Human-readable copy of build-plan-v2.md §6. The code copy that actually ships lives in
`04-site/src/styles/global.css` — if you change a value, change it there and update this file too.

## Principles
- Readability beats decoration.
- Big type, generous line height, narrow text column.
- One accent colour for links, one reserved colour for affiliate CTAs only.
- Up and down never shown by colour alone. Always arrow + word.
- Small scannable blocks: short paragraphs, tables, summary boxes, condensed routes.

## Colours (light theme, v1 only, dark theme later)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAFAF7` | page background |
| `--surface` | `#FFFFFF` | cards |
| `--surface-muted` | `#F2F1EC` | muted blocks |
| `--border` | `#E4E2DA` | hairlines |
| `--text` | `#1A1A18` | body text |
| `--text-muted` | `#5C5B55` | secondary text |
| `--accent` | `#1F4FD1` | links, primary buttons |
| `--accent-hover` | `#173CA3` | hover state |
| `--cta` | `#C98A06` | affiliate / code CTAs ONLY |
| `--cta-text` | `#1A1A18` | text on CTA |
| `--up` | `#117A45` | bullish, always paired with an arrow/word |
| `--down` | `#B42318` | bearish, always paired with an arrow/word |
| `--neutral` | `#6B6A63` | flat/no reaction |

## Type
- Body font: Inter / Source Sans 3 / system-ui
- Numeric font: JetBrains Mono (prices, percentages, levels)
- Body 18px, line height 1.7, max measure 68ch
- H1 40-48px, H2 28-32px, H3 22px
- Contrast minimum 4.5:1
- Mobile-first: most traffic arrives from Instagram on phones
- Radius: 10px
- Header: sticky, slim, "Start here" rendered as a button
