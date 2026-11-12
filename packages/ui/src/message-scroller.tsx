'use client'

import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from '@shadcn/react/message-scroller'
import * as React from 'react'

import { Button, type ButtonProps } from './button.js'
import { cn } from './lib/cn.js'

export {
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}

/**
 * Holds the scroll state of a conversation: follows new messages while the reader is at the end (`autoScroll`) and
 * where it opens (`defaultScrollPosition`). Wrap the MessageScroller and anything that calls its hooks.
 */
export function MessageScrollerProvider(
  props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>,
) {
  return <MessageScrollerPrimitive.Provider {...props} />
}

/** The frame of the conversation: the viewport plus the jump buttons over it. */
export function MessageScroller({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Root>) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      className={cn(
        'group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

export type MessageScrollerViewportProps = React.ComponentProps<
  typeof MessageScrollerPrimitive.Viewport
> & {
  /** The accessible name of the scrolling region, in the page's language ("Mensagens"). */
  'aria-label': string
}

/** The scrolling region. Focusable, so the keyboard can scroll it; the bottom edge fades while there is more below. */
export function MessageScrollerViewport({
  className,
  ...props
}: MessageScrollerViewportProps) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      className={cn(
        'scroll-fade-b size-full min-h-0 min-w-0 [scrollbar-width:thin] [scrollbar-gutter:stable] overflow-y-auto overscroll-contain contain-content',
        'focus-visible:ring-season-accent outline-none focus-visible:ring-2 focus-visible:ring-inset',
        'data-autoscrolling:[scrollbar-color:transparent_transparent] data-pending-scroll:invisible',
        className,
      )}
      {...props}
    />
  )
}

/** The list of messages, a live log: new items are announced. */
export function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      className={cn('flex h-max min-h-full flex-col gap-8', className)}
      {...props}
    />
  )
}

/**
 * One turn of the conversation. `messageId` lets `scrollToMessage` find it; `scrollAnchor` marks where the view lands
 * when a new turn starts (the person's question, so the answer streams below it).
 */
export function MessageScrollerItem({
  className,
  scrollAnchor = false,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      className={cn(
        'min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]',
        className,
      )}
      {...props}
    />
  )
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  )
}

export type MessageScrollerButtonProps = React.ComponentProps<
  typeof MessageScrollerPrimitive.Button
> &
  Pick<ButtonProps, 'variant' | 'size'> & {
    /** The accessible name, in the page's language ("Ir para o fim"). */
    label: string
  }

/**
 * Jumps to the end (or, with `direction="start"`, the beginning). Shows only while there is more to scroll that way.
 * `children` replace the arrow icon.
 */
export function MessageScrollerButton({
  direction = 'end',
  className,
  children,
  render,
  variant = 'outline',
  size = 'icon',
  label,
  ...props
}: MessageScrollerButtonProps) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      data-direction={direction}
      data-variant={variant}
      data-size={size}
      direction={direction}
      className={cn(
        'bg-surface shadow-edge/60 hover:bg-well absolute left-1/2 size-8 -translate-x-1/2 shadow-lg',
        'transition-[translate,scale,opacity] duration-200 motion-reduce:transition-opacity',
        'data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)]',
        'data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)]',
        'data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full data-[direction=start]:[&_svg]:rotate-180',
        className,
      )}
      render={render ?? <Button variant={variant} size={size} />}
      {...props}
    >
      {children ?? <ArrowDown />}
      <span className="sr-only">{label}</span>
    </MessageScrollerPrimitive.Button>
  )
}
