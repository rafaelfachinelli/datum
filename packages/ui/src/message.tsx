import * as React from 'react'

import { cn } from './lib/cn.js'

/** Consecutive messages from the same author, stacked closer together. */
export function MessageGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="message-group"
      className={cn('flex min-w-0 flex-col gap-2', className)}
      {...props}
    />
  )
}

export type MessageProps = React.ComponentProps<'div'> & {
  /** `end` puts the message on the right, for the person reading; `start` on the left, for the other side. */
  align?: 'start' | 'end'
}

/** One message in a conversation: avatar plus content. Compose with the parts below. */
export function Message({
  className,
  align = 'start',
  ...props
}: MessageProps) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        'group/message text-ink relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse',
        className,
      )}
      {...props}
    />
  )
}

/** The author's picture or initials, at the bottom of the message. */
export function MessageAvatar({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        'bg-well text-ink flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full group-has-data-[slot=message-footer]/message:-translate-y-8',
        className,
      )}
      {...props}
    />
  )
}

/** Holds the header, the bubbles and the footer. */
export function MessageContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        'flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end',
        className,
      )}
      {...props}
    />
  )
}

/** A line above the content: the author's name, the time. */
export function MessageHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        'text-ink-muted flex max-w-full min-w-0 items-center px-3 text-xs font-medium group-has-data-[variant=ghost]/message:px-0',
        className,
      )}
      {...props}
    />
  )
}

/** A line below the content: delivery status, actions. */
export function MessageFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        'text-ink-muted flex max-w-full min-w-0 items-center px-3 text-xs font-medium group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
        className,
      )}
      {...props}
    />
  )
}
