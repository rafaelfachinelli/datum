import * as React from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible.js'
import { cn } from './lib/cn.js'

/**
 * The steps an agent took (searched, read a file, ran a tool), one line each. A line wrapped in a link or button gets
 * the focus ring.
 */
export function Trace({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="trace"
      className={cn(
        'flex w-full min-w-0 flex-col gap-2',
        '*:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:rounded-[var(--datum-radius-sm)] *:has-[>[data-slot=trace-line]]:text-left',
        '*:has-[>[data-slot=trace-line]]:focus-visible:ring-season-accent *:has-[>[data-slot=trace-line]]:focus-visible:ring-offset-board *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:ring-2 *:has-[>[data-slot=trace-line]]:focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  )
}

export type TraceLineProps = React.ComponentProps<'span'> & {
  /** `running` shimmers the title, `pending` dims the line, `error` paints it in the danger color. */
  status?: 'running' | 'error' | 'pending'
}

/** One step: icon, title and description. */
export function TraceLine({ className, status, ...props }: TraceLineProps) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      className={cn(
        'text-ink-muted in-[a:hover,button:hover]:text-ink flex w-fit max-w-full min-w-0 items-center gap-2 text-sm transition-colors in-[a,button]:cursor-pointer',
        'data-[status=error]:text-danger data-[status=error]:in-[a:hover,button:hover]:text-danger data-[status=pending]:text-ink-subtle data-[status=running]:*:data-[slot=trace-title]:shimmer',
        className,
      )}
      {...props}
    />
  )
}

/** A decorative icon for the step. */
export function TraceIcon({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [[data-slot=trace-title]~&]:-ml-1",
        className,
      )}
      {...props}
    />
  )
}

/** What the step did, cut with an ellipsis. */
export function TraceTitle({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="trace-title"
      className={cn('motion-reduce:shimmer-none min-w-0 truncate', className)}
      {...props}
    />
  )
}

/** A short detail after the title: a duration, a count. */
export function TraceDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="trace-description"
      className={cn('text-ink-subtle shrink-0 tabular-nums', className)}
      {...props}
    />
  )
}

export type TraceCollapsibleProps = Omit<
  React.ComponentProps<typeof Collapsible>,
  'open'
> &
  (
    | { open?: undefined }
    | {
        open: boolean
        onOpenChange: NonNullable<
          React.ComponentProps<typeof Collapsible>['onOpenChange']
        >
      }
  )

/** A step with details that open below it (the files read, the output of a tool). */
export function TraceCollapsible({
  className,
  ...props
}: TraceCollapsibleProps) {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      className={cn('flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  )
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

/** Holds a TraceLine and opens the details; a chevron after it turns when open. */
export function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      className={cn(
        'group/trace-collapsible-trigger text-ink-muted hover:text-ink has-[[data-status=error]]:text-danger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-[var(--datum-radius-sm)] text-left transition-colors',
        'focus-visible:ring-season-accent focus-visible:ring-offset-board outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      {children}
      <TraceIcon className="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90 motion-reduce:transition-none">
        <ChevronRight />
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

/** The details, indented under a hairline. */
export function TraceCollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      className="h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        className={cn(
          'border-line-strong text-ink-muted mt-2 mb-1 ml-[calc(--spacing(2)-1px)] min-w-0 border-l pr-1 pl-4 text-sm leading-relaxed wrap-break-word',
          className,
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}
