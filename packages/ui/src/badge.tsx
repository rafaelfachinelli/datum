import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { focusRing } from './button.js'
import { cn } from './lib/cn.js'

export const badgeVariants = cva(
  [
    'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[var(--datum-radius-sm)] border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors',
    '[&>svg]:pointer-events-none [&>svg]:size-3',
    focusRing,
  ],
  {
    variants: {
      variant: {
        accent: 'border-transparent bg-season-accent text-season-on-accent',
        neutral: 'border-transparent bg-well text-ink',
        outline: 'border-line-strong text-ink-muted',
        success: 'border-success/30 bg-success/10 text-success',
        warning: 'border-warning/30 bg-warning/10 text-warning',
        danger: 'border-danger/30 bg-danger/10 text-danger',
      },
    },
    defaultVariants: {
      variant: 'accent',
    },
  },
)

/** `render` draws another element (a link: render={<a href="/" />}) with the badge styles; it replaces asChild. */
export type BadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants>

export function Badge({ className, variant, render, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      { className: cn(badgeVariants({ variant }), className) },
      props,
    ),
    render,
    state: { slot: 'badge', variant },
  })
}
