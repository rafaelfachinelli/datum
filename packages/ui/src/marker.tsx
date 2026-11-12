import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from './lib/cn.js'

export const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-ink-muted [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-ink",
  {
    variants: {
      variant: {
        default: '',
        separator:
          'before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-line-strong after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-line-strong',
        border: 'border-b border-line pb-2',
      },
    },
  },
)

export type MarkerProps = useRender.ComponentProps<'div'> &
  VariantProps<typeof markerVariants>

/**
 * A quiet line inside a conversation: a date, "joined the chat", a status. `separator` centers it between two rules.
 * `render` draws another element (a link or an `h2`).
 */
export function Marker({
  className,
  variant = 'default',
  render,
  ...props
}: MarkerProps) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      { className: cn(markerVariants({ variant }), className) },
      props,
    ),
    render,
    state: {
      slot: 'marker',
      variant,
    },
  })
}

/** A decorative icon before the text. */
export function MarkerIcon({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

/** The text of the marker. */
export function MarkerContent({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        '*:[a]:hover:text-ink min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3',
        className,
      )}
      {...props}
    />
  )
}
