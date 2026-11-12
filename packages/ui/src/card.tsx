import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as React from 'react'

import { cn } from './lib/cn.js'

/** A surface that groups related content. Compose it with the parts below. */
export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'border-line-strong bg-surface text-ink flex flex-col gap-6 rounded-[var(--datum-radius-md)] border py-6',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid auto-rows-min items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  )
}

/**
 * The title, an `h3` by default. With `render` (render={<h2 />}), it styles your own element so the heading level
 * follows the page.
 */
export function CardTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<'h3'>) {
  return useRender({
    defaultTagName: 'h3',
    props: mergeProps<'h3'>(
      {
        className: cn(
          'font-display text-lg leading-tight font-semibold',
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: 'card-title' },
  })
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-ink-muted text-sm', className)}
      {...props}
    />
  )
}

/** An action placed at the top right of the header (a button, a menu). */
export function CardAction({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-2 px-6', className)}
      {...props}
    />
  )
}
