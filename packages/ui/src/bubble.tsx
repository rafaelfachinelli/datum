import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { focusRing } from './button.js'
import { cn } from './lib/cn.js'

/** Consecutive bubbles from the same author. */
export function BubbleGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="bubble-group"
      className={cn('flex min-w-0 flex-col gap-2', className)}
      {...props}
    />
  )
}

// The variant colors the BubbleContent; a BubbleContent rendered as a link or button also gets a hover.
export const bubbleVariants = cva(
  'group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full',
  {
    variants: {
      variant: {
        accent:
          '*:data-[slot=bubble-content]:bg-season-accent *:data-[slot=bubble-content]:text-season-on-accent [&>[data-slot=bubble-content]:is(button,a):hover]:brightness-110',
        secondary:
          '*:data-[slot=bubble-content]:bg-well *:data-[slot=bubble-content]:text-ink [&>[data-slot=bubble-content]:is(button,a):hover]:bg-edge',
        muted:
          '*:data-[slot=bubble-content]:bg-well *:data-[slot=bubble-content]:text-ink-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-ink',
        tinted:
          '*:data-[slot=bubble-content]:bg-season-accent/15 *:data-[slot=bubble-content]:text-ink [&>[data-slot=bubble-content]:is(button,a):hover]:bg-season-accent/25',
        outline:
          '*:data-[slot=bubble-content]:border-line-strong *:data-[slot=bubble-content]:bg-surface *:data-[slot=bubble-content]:text-ink [&>[data-slot=bubble-content]:is(button,a):hover]:bg-well',
        ghost:
          'border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 *:data-[slot=bubble-content]:text-ink [&>[data-slot=bubble-content]:is(button,a):hover]:bg-well',
        danger:
          '*:data-[slot=bubble-content]:bg-danger/10 *:data-[slot=bubble-content]:text-danger [&>[data-slot=bubble-content]:is(button,a):hover]:bg-danger/20',
      },
    },
    defaultVariants: {
      variant: 'accent',
    },
  },
)

export type BubbleProps = React.ComponentProps<'div'> &
  VariantProps<typeof bubbleVariants> & {
    /** `end` pushes the bubble to the right, even outside a Message. */
    align?: 'start' | 'end'
  }

/** A chat bubble. Holds a BubbleContent and, optionally, BubbleReactions. */
export function Bubble({
  variant = 'accent',
  align = 'start',
  className,
  ...props
}: BubbleProps) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

/** The text of the bubble. With `render` (render={<a href="…" />} or a button), the whole bubble is a link or action. */
export function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(
          'w-fit max-w-full min-w-0 overflow-hidden rounded-[var(--datum-radius-md)] border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:cursor-pointer [button]:text-left [button,a]:transition-[color,background-color,filter]',
          focusRing,
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: 'bubble-content',
    },
  })
}

export const bubbleReactionsVariants = cva(
  'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-well px-1.5 py-0.5 text-sm text-ink ring-3 ring-board has-[button]:p-0',
  {
    variants: {
      side: {
        top: 'top-0 -translate-y-3/4',
        bottom: 'bottom-0 translate-y-3/4',
      },
      align: {
        start: 'left-3',
        end: 'right-3',
      },
    },
    defaultVariants: {
      side: 'bottom',
      align: 'end',
    },
  },
)

export type BubbleReactionsProps = React.ComponentProps<'div'> & {
  align?: 'start' | 'end'
  side?: 'top' | 'bottom'
}

/** Reactions pinned to a corner of the bubble (emoji, counts). The ring matches the board behind it. */
export function BubbleReactions({
  side = 'bottom',
  align = 'end',
  className,
  ...props
}: BubbleReactionsProps) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}
