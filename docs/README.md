# Datum

Audience: developers and AI agents working on the Datum design system.
Status: version 0.4.1 (14 components); changelog on the Novidades page · Last updated: 2026-10-25

Datum is the design system of Rafael Fachinelli, in the **Blueprint** visual direction (the drafting board). In technical drawing, the datum is the reference every dimension is measured from; the design system plays the same role for color, space and type.

- Public site: [design.rafaelfachinelli.com](https://design.rafaelfachinelli.com) (Storybook, `apps/storybook`).
- Brand rules (essence, voice, direction, seasons, performance budget): [brand.md](./brand.md).
- Releases: the Storybook page **Datum / Novidades**. The move out of the portfolio: [own-repo-and-npm.md](./own-repo-and-npm.md).

## Packages

| Workspace         | Name               | Role                                                                                                                                                                                                       |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/tokens` | `@rafaelfachinelli/datum-tokens`    | W3C DTCG tokens; builds `dist/tokens.css` (CSS variables), `dist/theme.css` (Tailwind 4 theme) and `dist/tokens.json`; exports `getSeason`, `seasonIdFor`, `seasonInlineScript`, `contrastRatio`, `cssVar` |
| `apps/storybook`  | `datum-storybook` | Storybook 10 (react-vite); docs pages in pt-BR; static site served by nginx                                                                                                                                |
| `packages/ui`     | `@rafaelfachinelli/datum-ui`        | React components (primitives and general patterns) styled with Tailwind 4 on the token theme; shadcn/ui and Radix as the base                                                                              |

Both packages are published on npm and move together (one version). Inside this repository, the Storybook consumes the built packages through npm workspaces, the same way an app does.

## Tokens

- Sources: `packages/tokens/src/tokens/*.json`, combined by `resolver.json` (base set + `season` modifier; later layers override, seasons never stack).
- Naming: CSS variables are `--datum-<path>` (`color.board` -> `--datum-color-board`). Tailwind utilities drop the `color.` prefix (`bg-board`, `text-ink`, `border-line-strong`) and keep `season-` (`text-season-accent`).
- Components use semantic tokens (`color.*`, `season.*`), never `palette.*`.
- Adding or changing a color: run `npm run test -w @rafaelfachinelli/datum-tokens`; the contrast tests fail if any text/background pair (or a season accent) drops below WCAG AA 4.5:1.

## Seasons

- Calendar and rules: [brand.md](./brand.md#seasonal-themes). Logic: `packages/tokens/src/seasons.ts` (`seasonIdFor`), tested for 2026-2028.
- A season changes only `season.a`, `season.b` (logo gradient), `season.accent` and `season.on-accent`.
- Pages are statically cached, so the season is set in the browser: `seasonInlineScript` runs in `<head>` and sets `data-season` on `<html>` before the first paint.

## Components

- **Only primitives and general-purpose patterns** (Button, Badge, Card, Label, Separator, Input, Textarea, Select, RadioGroup, Tooltip, Sheet, Field, Callout, Stat). Components hold no user-facing text of their own: anything a screen reader says (a Stat trend, the Sheet close button) comes from props, so the consumer writes it in the page's language. Datum is shown publicly as a portfolio piece, so it holds what any project could use. Compositions specific to one page of the site (article card, home metrics, page title) are built in the site (rafaelfachinelli.com) from Datum pieces and never move here.
- Form controls (Input, Textarea, SelectTrigger) share `controlClass` and call `useFieldControl(props)`, so inside a `Field` they get the id and ARIA wiring. A new control does the same.
- Code: `packages/ui/src/<component>.tsx`, exported from `src/index.ts`. Variants with `cva`, classes merged with `cn`, `asChild` (Radix Slot) where a component may render a link. Colors only from semantic tokens, so every component follows the season.
- The package builds with `tsc` to `dist`: one ES module per source file, so `"use client"` stays on the files that need it, with `.d.ts` next to them; relative imports carry `.js`, so plain Node ESM resolves them too. `src` ships as well, for source maps. `styles.css` is copied to `dist`, where its `@source "./"` makes the consumer's Tailwind scan the built files. A consumer imports `tailwindcss`, `@rafaelfachinelli/datum-tokens/theme.css` and then `@rafaelfachinelli/datum-ui/styles.css` (an `@source`, so Tailwind generates the components' classes).
- Docs: `apps/storybook/src/componentes/<Name>.stories.tsx` (one story per state) and `<Name>.mdx` (usage in pt-BR: when to use, variants, states, accessibility). Prop descriptions go in the stories' `argTypes`, in pt-BR.
- Accessibility: `@storybook/addon-a11y` runs axe on every story. Check color contrast in every season (the `season` global, for example `&globals=season:natal`) before merging a component with color variants.

## Storybook

- Run locally: `npm run dev` (port 6006; it also rebuilds the components on change). Build: `npm run build`.
- After a release, `node scripts/smoke-pack.mjs --published` installs the versions in `package.json` from the registry and runs the same checks.
- Before publishing, `npm run smoke` (also in CI) packs both packages, installs them into a new Vite + React + Tailwind 4 app, typechecks it with the published types, imports the tokens from plain Node and checks the built CSS has the components' classes.
- Story titles stay ASCII (stable ids and URLs); `.storybook/manager.ts` maps them to accented labels in the sidebar.
- Deploy: Coolify app "Datum (Storybook)", Dockerfile `apps/storybook/Dockerfile`, build context the repository root, branch `main`.
- Sharing card: `.storybook/manager-head.html` holds the Open Graph and Twitter tags (crawlers do not run JavaScript, so every Storybook URL shares the same card). The image `public/og.png` (1200×630) is drawn in `og/og.html`; after changing it, run `npm run og -w datum-storybook` (headless Chrome; `CHROME=<path>` to pick the browser).

## Versions and Novidades

- One version for `@rafaelfachinelli/datum-tokens` and `@rafaelfachinelli/datum-ui`; they move together. Patch for fixes, minor for a new component, token, variant or optional prop, major for a breaking change.
- The changelog is the Storybook page **Datum / Novidades** (`apps/storybook/src/Novidades.mdx`), written by hand in the PR that makes the change. Process: [.claude/skills/datum-release](../.claude/skills/datum-release/SKILL.md).
