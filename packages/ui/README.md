# @rafaelfachinelli/datum-ui

React components of **Datum**, the design system of [rafaelfachinelli.com](https://rafaelfachinelli.com): accessible primitives and general patterns (Button, Badge, Card, Field, Input, Textarea, Select, RadioGroup, Sheet, Tooltip, Separator, Label, Callout, Stat) on Radix and shadcn/ui, styled with Tailwind CSS 4 on the [Datum tokens](https://www.npmjs.com/package/@rafaelfachinelli/datum-tokens).

Every component, state and prop is documented in the Storybook: **[design.rafaelfachinelli.com](https://design.rafaelfachinelli.com)** (in Portuguese).

## Install

```bash
npm install @rafaelfachinelli/datum-ui @rafaelfachinelli/datum-tokens
```

Needs React 19 and Tailwind CSS 4.

## Use

In your global CSS, after Tailwind:

```css
@import 'tailwindcss';
@import '@rafaelfachinelli/datum-tokens/tokens.css'; /* --datum-* variables and the seasons */
@import '@rafaelfachinelli/datum-tokens/theme.css'; /* utilities: bg-board, text-ink, text-season-accent… */
@import '@rafaelfachinelli/datum-ui/styles.css'; /* makes Tailwind generate the components' classes */
```

```tsx
import { Button } from '@rafaelfachinelli/datum-ui'

export function Download() {
  return <Button>Baixar currículo</Button>
}
```

Components hold no text of their own: anything a screen reader announces comes from props, in your page's language.

### With Next.js (App Router)

The package is already JavaScript, so it needs no `transpilePackages`. Components that use state or Radix keep their `"use client"`, so you can import them from Server Components. To load only the components a page uses:

```ts
// next.config.ts
const nextConfig = {
  experimental: { optimizePackageImports: ['@rafaelfachinelli/datum-ui'] },
}
export default nextConfig
```

For the season to be right on the first paint, add the tokens' inline script to the root layout (see [@rafaelfachinelli/datum-tokens](https://www.npmjs.com/package/@rafaelfachinelli/datum-tokens)).

## License

The code is under the [MIT license](./LICENSE). The name **Datum**, the RF logo and the **Blueprint** visual identity belong to Rafael Fachinelli and are not covered by it: use the components freely, and give your product its own name and look.

Source: [github.com/rafaelfachinelli/datum](https://github.com/rafaelfachinelli/datum).
