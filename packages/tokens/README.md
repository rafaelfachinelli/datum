# @rafaelfachinelli/datum-tokens

Design tokens of **Datum**, the design system of [rafaelfachinelli.com](https://rafaelfachinelli.com), in the [W3C Design Tokens Community Group format](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/): the Blueprint palette, a dark theme, type, a 4 px spacing scale, a 2 px radius and eight seasons that change the accent with the date.

Every text and background pair passes WCAG AA (4.5:1) in every season; the tests fail the build otherwise. Foundations and seasons: **[design.rafaelfachinelli.com](https://design.rafaelfachinelli.com)** (in Portuguese).

## Install

```bash
npm install @rafaelfachinelli/datum-tokens
```

## What you get

| Import | What it is |
| --- | --- |
| `@rafaelfachinelli/datum-tokens/tokens.css` | CSS variables (`--datum-color-board`, `--datum-season-accent`…) and the season overrides on `[data-season]` |
| `@rafaelfachinelli/datum-tokens/theme.css` | A Tailwind CSS 4 theme on those variables (`bg-board`, `text-ink`, `text-season-accent`…) |
| `@rafaelfachinelli/datum-tokens/tokens.json` | The resolved tokens, for other tools |
| `@rafaelfachinelli/datum-tokens` | `getSeason`, `seasonIdFor`, `seasonInlineScript`, `contrastRatio`, `cssVar` |

## The season, before the first paint

Pages cached for a long time cannot pick the season at build time. Put the inline script in `<head>`: it sets `data-season` on `<html>` from the visitor's date, with no flash.

```tsx
import { seasonInlineScript } from '@rafaelfachinelli/datum-tokens'

<script dangerouslySetInnerHTML={{ __html: seasonInlineScript }} />
```

## License

The code is under the [MIT license](./LICENSE). The name **Datum**, the RF logo and the **Blueprint** visual identity belong to Rafael Fachinelli and are not covered by it.

Source: [github.com/rafaelfachinelli/datum](https://github.com/rafaelfachinelli/datum).
