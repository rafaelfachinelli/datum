import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Button, type ButtonProps } from './button.js'
import { cn } from './lib/cn.js'

export const attachmentVariants = cva(
  [
    'group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-[var(--datum-radius-md)] border border-line-strong bg-surface text-ink transition-colors',
    'has-[>a,>button]:hover:bg-well data-[state=error]:border-danger/50 data-[state=idle]:border-dashed',
    // The trigger covers the card, so the card shows its focus.
    'has-[>[data-slot=attachment-trigger]:focus-visible]:ring-2 has-[>[data-slot=attachment-trigger]:focus-visible]:ring-season-accent has-[>[data-slot=attachment-trigger]:focus-visible]:ring-offset-2 has-[>[data-slot=attachment-trigger]:focus-visible]:ring-offset-board',
  ],
  {
    variants: {
      size: {
        md: 'gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2',
        sm: 'gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5',
        xs: 'gap-1.5 text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1',
      },
      orientation: {
        horizontal: 'min-w-40 items-center',
        vertical: 'w-24 flex-col has-data-[slot=attachment-content]:w-30',
      },
    },
  },
)

export type AttachmentProps = React.ComponentProps<'div'> &
  VariantProps<typeof attachmentVariants> & {
    /** Where the file is: `idle` (not sent yet), `uploading`, `processing`, `error` or `done`. */
    state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done'
  }

/** A file in a conversation or a composer: icon or preview, name, details and actions. */
export function Attachment({
  className,
  state = 'done',
  size = 'md',
  orientation = 'horizontal',
  ...props
}: AttachmentProps) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

export const attachmentMediaVariants = cva(
  [
    'relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-[var(--datum-radius-sm)] bg-well text-ink',
    'group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7',
    'group-data-[state=error]/attachment:bg-danger/10 group-data-[state=error]/attachment:text-danger',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  ],
  {
    variants: {
      variant: {
        icon: '',
        image:
          'opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
  },
)

export type AttachmentMediaProps = React.ComponentProps<'div'> &
  VariantProps<typeof attachmentMediaVariants>

/** The file's icon, or with `variant="image"`, its preview (faded until the upload is done). */
export function AttachmentMedia({
  className,
  variant = 'icon',
  ...props
}: AttachmentMediaProps) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

/** Holds the title and the description. */
export function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        'max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1',
        className,
      )}
      {...props}
    />
  )
}

/** The file name, cut with an ellipsis. Shimmers while uploading or processing. */
export function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        'group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block max-w-full min-w-0 truncate font-medium',
        className,
      )}
      {...props}
    />
  )
}

/** Size, type or the error, under the title. */
export function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        'text-ink-muted group-data-[state=error]/attachment:text-danger mt-0.5 block max-w-full min-w-0 truncate text-xs',
        className,
      )}
      {...props}
    />
  )
}

/** The actions of the file (remove, retry). Above the trigger, so they stay clickable. */
export function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        'relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1',
        className,
      )}
      {...props}
    />
  )
}

/** A small icon button for an action. Give it an `aria-label` in the page's language. */
export function AttachmentAction({
  className,
  variant = 'ghost',
  size = 'icon',
  ...props
}: ButtonProps) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant}
      size={size}
      className={cn(size === 'icon' && 'size-6', className)}
      {...props}
    />
  )
}

/**
 * Makes the whole card clickable (open, preview): a button by default, a link with `render={<a href="…" />}`. Give it
 * an accessible name (`aria-label` or text in `sr-only`).
 */
export function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<'button'>) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: render ? type : (type ?? 'button'),
        className: cn(
          'absolute inset-0 z-10 cursor-pointer rounded-[inherit] outline-none',
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: 'attachment-trigger',
    },
  })
}

/** A row of attachments that scrolls sideways, its edges fading while there is more. */
export function AttachmentGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        'scroll-fade-x flex min-w-0 snap-x snap-mandatory scroll-px-1 [scrollbar-width:none] gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
        className,
      )}
      {...props}
    />
  )
}
