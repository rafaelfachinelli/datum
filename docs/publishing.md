# Publishing and deploy

Audience: developers and AI agents releasing Datum or changing how it ships.
Status: current · Last updated: 2026-10-25

How Datum reaches its users: the npm packages, the Storybook site, and the apps that install them. The rules of the design system itself are in [README.md](./README.md).

## Where things live

| Piece      | Source            | Published as                                                       |
| ---------- | ----------------- | ------------------------------------------------------------------ |
| Tokens     | `packages/tokens` | `@rafaelfachinelli/datum-tokens` on npm                            |
| Components | `packages/ui`     | `@rafaelfachinelli/datum-ui` on npm                                |
| Storybook  | `apps/storybook`  | [design.rafaelfachinelli.com](https://design.rafaelfachinelli.com) |

[rafaelfachinelli.com](https://rafaelfachinelli.com) installs both packages from npm, like any other app; its repository is private.

## Releasing a version

The two packages always share one version. The [datum-release skill](../.claude/skills/datum-release/SKILL.md) has the checklist (bump, ranges, Novidades entry).

1. A PR bumps both versions and adds the Novidades entry; CI runs the smoke test.
2. After the merge, tag the merge commit on `main` and push the tag:

   ```bash
   git switch main && git pull
   git tag vX.Y.Z && git push origin vX.Y.Z
   ```

3. `.github/workflows/release.yml` builds, tests, runs the smoke test, checks that the tag matches both versions, and publishes the tokens first, then the components. A version already on npm is skipped, so re-running it is safe.
4. Check the release from the registry: `node scripts/smoke-pack.mjs --published`.

### How npm trusts the workflow

- **Trusted publishing** (OIDC): each package's settings on npmjs.com list this repository and `release.yml` as a trusted publisher, allowed to publish directly. No npm token is stored anywhere, and npm signs a provenance statement linking each version to its commit and workflow run.
- The trusted publisher fields cannot be edited; to change the repository or the workflow file name, delete the publisher on npmjs.com and create it again.
- The workflow needs npm 11.5.1 or later (it installs it).

### Publishing by hand (only if the workflow cannot)

- The npm account needs two-factor authentication; npm refuses to publish without it.
- Publish from the package folder with `npm publish --provenance=false` (provenance only works from CI), tokens first.
- npm may hold a manual publish in **staged publishing**: the registry shows a placeholder `0.0.0-stage` until the version is approved on npmjs.com (or with `npm stage approve`, npm 11.15+). The real version replaces it as `latest`; the placeholder stays in the version list, harmless.

## Checks

- `npm run smoke` (in CI on every push): packs both packages, installs the tarballs into a new Vite + React + Tailwind 4 app, typechecks it with the published types, imports the tokens from plain Node (so relative imports must carry `.js`), and checks the built CSS for the token variables and a class that only the built Button has.
- `node scripts/smoke-pack.mjs --published`: the same checks against the versions in `package.json`, installed from npm.

## Storybook deploy

- The Storybook is a static site built by `apps/storybook/Dockerfile` (build context: the repository root) and served by nginx, on Coolify.
- A push to `main` triggers a new deploy through a push webhook on this repository. Coolify keeps the old container until the new one passes its health check, so a failed build leaves the site as it was.
- The sharing card and its image are described in [README.md](./README.md#storybook).

## For the apps that use Datum

- Install: `npm install @rafaelfachinelli/datum-ui @rafaelfachinelli/datum-tokens` (React 19 and Tailwind CSS 4). Setup is in each package's README, which is what npm shows.
- A change to a component reaches an app in three moves: release it here, then bump the range in the app.
- To try an unreleased change in an app: build the package here and `npm link` it from the app (`npm link ../datum/packages/ui`); `npm install` in the app goes back to the published version.

## License and brand

The code is MIT. The name **Datum**, the RF logo and the **Blueprint** visual identity (the drafting board and the seasonal themes as a brand) belong to Rafael Fachinelli and are not covered by the license. The note is in the root README (generated from `rafaelfachinelli/readmes`, field `licenseNote`) and in both package READMEs.

## Decision record

**2026-10-23 to 2026-10-25: Datum leaves the portfolio repository and goes to npm.**

- **Why:** anyone can install Datum, and the portfolio repository can be private.
- **Names:** the `@datum` scope on npm belongs to someone else, so the packages are `@rafaelfachinelli/datum-tokens` and `@rafaelfachinelli/datum-ui`. Before 0.4.0 they were `@datum/tokens` and `@datum/ui`, workspace-only.
- **History:** the Datum commits came along (`git filter-repo`), with every author set to the GitHub noreply address and the portfolio pull request numbers rewritten as `rafaelfachinelli/portfolio#N`. That repository is private now, so the Novidades page links commits of this repository instead.
- **Packages:** built with `tsc`, one ES module per file (keeps `"use client"`), so apps need no `transpilePackages`.
- **Releases:** 0.4.0 by hand (it created the packages, so trusted publishing could be configured); 0.4.1 and later from tags.
