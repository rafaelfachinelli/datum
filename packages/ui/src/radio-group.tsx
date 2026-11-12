'use client'

import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import * as React from 'react'

import { focusRing } from './button.js'
import { cn } from './lib/cn.js'

/**
 * A set of options where exactly one is chosen. Arrow keys move between the
 * options; Tab enters and leaves the group. Name the group with
 * `aria-labelledby` (a visible heading) or `aria-label`.
 */
export function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid gap-2', className)}
      {...props}
    />
  )
}

/** A classic radio button. Pair it with a Label (`htmlFor` its `id`). */
export function RadioGroupItem({
  className,
  ...props
}: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'border-line-strong text-season-accent grid size-4 shrink-0 cursor-pointer place-items-center rounded-full border transition-colors duration-150',
        'data-checked:border-season-accent',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        focusRing,
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="size-2 rounded-full bg-current" />
    </RadioPrimitive.Root>
  )
}

export type RadioCardProps = Omit<
  RadioPrimitive.Root.Props,
  'children' | 'title'
> & {
  /** The option's name. */
  title: React.ReactNode
  /** One short line under the title. */
  description?: React.ReactNode
  /** An icon on the left (for example a Lucide icon). */
  icon?: React.ReactNode
}

/**
 * An option drawn as a card: the whole card is the radio, so it is easy to hit
 * on a phone. The title and description are its accessible name.
 */
export function RadioCard({
  className,
  title,
  description,
  icon,
  ...props
}: RadioCardProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-card"
      className={cn(
        'group/radio-card border-line-strong text-ink relative flex w-full cursor-pointer items-start gap-3 rounded-[var(--datum-radius-md)] border bg-transparent p-3 pr-9 text-left transition-[border-color,background-color] duration-150',
        'hover:bg-well',
        'data-checked:border-season-accent data-checked:bg-season-accent/10',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        "[&_svg:not([class*='size-'])]:size-5",
        focusRing,
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="text-ink-muted group-data-checked/radio-card:text-season-accent mt-0.5 shrink-0"
        >
          {icon}
        </span>
      )}
      <span className="grid gap-0.5">
        <span className="text-sm leading-snug font-medium">{title}</span>
        {description && (
          <span className="text-ink-muted text-xs leading-snug">
            {description}
          </span>
        )}
      </span>
      <span
        aria-hidden="true"
        className="border-line-strong group-data-checked/radio-card:border-season-accent absolute top-3 right-3 grid size-4 place-items-center rounded-full border"
      >
        <RadioPrimitive.Indicator className="bg-season-accent size-2 rounded-full" />
      </span>
    </RadioPrimitive.Root>
  )
}
