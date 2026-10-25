---
name: datum-release
description: Use when a change touches the Datum design system (packages/tokens, packages/ui, or a component or foundations page in apps/storybook). Picks the version bump, updates both Datum package versions and writes the entry on the Storybook Novidades page, in the same PR as the change.
---

# Datum release notes

Datum has **one version** for `@rafaelfachinelli/datum-tokens` and `@rafaelfachinelli/datum-ui`: they always move together. The changelog is written by hand on the Storybook page **Datum / Novidades** (`apps/storybook/src/Novidades.mdx`), newest first, in pt-BR. Rules of the design system: `docs/README.md`.

## When it applies

Any PR that changes what someone using Datum sees or gets:

- `packages/tokens/src/**` (a token, a season, the season logic, the build output);
- `packages/ui/src/**` (a component, a prop, a variant, a style, a fix);
- a component or foundations page in `apps/storybook/src/**` when the change fixes or adds something a reader relies on (a broken story, a wrong example).

It does not apply to typos in the docs, or Storybook chrome and tooling with no visible effect.

## 1. Pick the bump

| The change                                                                        | Bump                                                             |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Fixes a bug, no API change                                                        | patch (`0.3.1` → `0.3.2`)                                        |
| Adds a component, token, variant or optional prop                                 | minor (`0.3.1` → `0.4.0`)                                        |
| Removes or renames a prop, token or variant; changes a default that breaks a page | major (while below 1.0, use minor and say "quebra" in the entry) |

Several changes in one PR take the largest bump.

## 2. Update the versions

Same version everywhere:

- `version` in `packages/tokens/package.json` and `packages/ui/package.json`;
- the `@rafaelfachinelli/datum-tokens` range in `packages/ui/package.json` and both ranges in `apps/storybook/package.json` (`^X.Y.Z`);
- then `npm install` to refresh `package-lock.json`.

Also update the status line of `docs/README.md` (`Status: version X.Y.Z (N components) ...`).

## 3. Write the entry

At the top of `apps/storybook/src/Novidades.mdx`, below the version table:

```mdx
## 0.4.0 · 22 de outubro de 2026

- **Componente:** o que mudou, em uma ou duas frases, para quem usa: o que passa a acontecer e, num conserto, o que acontecia antes. ([#NN](https://github.com/rafaelfachinelli/datum/pull/NN))
```

- Date in pt-BR, written out ("22 de outubro de 2026"), the day the PR merges.
- One bullet per change, the component or package in bold, the PR link at the end. The PR number comes from `gh pr create`; add it right after opening the PR.
- Plain words, the voice of the docs pages: no commit jargon ("refactor", "chore").
- A new component also links its page in the Storybook sidebar order (`.storybook/preview.tsx`) if it needs one.

## 4. Publish

After the PR merges, tag the merge commit on `main` and push the tag; the release workflow (`.github/workflows/release.yml`) builds, tests, runs the smoke test, checks that the tag matches both versions, and publishes the tokens first, then the components, with npm trusted publishing (no token) and provenance.

```bash
git switch main && git pull
git tag vX.Y.Z && git push origin vX.Y.Z
```

A version already on npm is skipped, so re-running the workflow is safe.

## 5. Check

- `npm run build` and `npm run smoke` pass, and the Novidades page shows the new entry first.
- Once the release workflow is done, `node scripts/smoke-pack.mjs --published` installs the new version from npm and passes.
- `npm ls @rafaelfachinelli/datum-ui @rafaelfachinelli/datum-tokens` shows the new version.
