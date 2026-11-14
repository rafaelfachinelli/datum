'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { focusRing } from './button.js'
import { cn } from './lib/cn.js'

export type DialogProps = DialogPrimitive.Root.Props & {
  /**
   * Keeps the dialog open when Escape is pressed: for a choice that must be answered with one of the footer actions.
   * A click on the backdrop is turned off with `disablePointerDismissal`.
   */
  disableEscapeDismissal?: boolean
}

/**
 * A window centered over the page, for a task or a decision that needs the reader's whole attention. Compose it with
 * DialogTrigger and DialogContent.
 */
export function Dialog({
  disableEscapeDismissal = false,
  onOpenChange,
  ...props
}: DialogProps) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      onOpenChange={(open, details) => {
        if (
          !open &&
          disableEscapeDismissal &&
          details.reason === 'escape-key'
        ) {
          details.cancel()
          return
        }
        onOpenChange?.(open, details)
      }}
      {...props}
    />
  )
}

/** Opens the dialog. `render` draws another element as the trigger (render={<Button />}). */
export function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/** Turns any button into "close" (render={<Button variant="outline" />}). */
export function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

// The viewport centers the popup and keeps a margin around it. `full` covers the whole screen on a phone.
const dialogViewportVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6',
  {
    variants: {
      size: { sm: '', md: '', lg: '', full: 'max-sm:p-0' },
      variant: { default: '', media: 'sm:p-8' },
    },
    defaultVariants: { size: 'md', variant: 'default' },
  },
)

// Grows and fades in; reduced motion keeps only the fade.
const dialogVariants = cva(
  [
    'group/dialog relative flex max-h-full w-full flex-col text-ink outline-none',
    'transition-[opacity,scale] duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-safe:data-ending-style:scale-95 motion-safe:data-starting-style:scale-95',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-3xl',
        full: 'h-full max-sm:rounded-none max-sm:border-0',
      },
      variant: {
        default:
          'rounded-[var(--datum-radius-md)] border border-line-strong bg-surface shadow-xl shadow-edge/60',
        // Sized by its media: the image or video grows up to the screen, keeps its proportions, and a click beside
        // it lands on the backdrop and closes.
        media: [
          'w-auto max-w-full items-center gap-3',
          '[&_:is(img,video)]:block [&_:is(img,video)]:h-auto [&_:is(img,video)]:max-h-[calc(100dvh-10rem)] [&_:is(img,video)]:w-auto [&_:is(img,video)]:max-w-full [&_:is(img,video)]:object-contain',
          '[&_iframe]:block [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-[min(calc(100vw-4rem),calc((100dvh-10rem)*16/9))] [&_iframe]:border-0',
        ],
      },
    },
    defaultVariants: { size: 'md', variant: 'default' },
  },
)

export type DialogContentProps = DialogPrimitive.Popup.Props & {
  /**
   * The width: `sm` (a short confirmation), `md` (the default, a form), `lg` (a wide table or preview) or `full`
   * (the whole screen on a phone, the window less a margin above it). On a phone every size takes nearly the whole
   * width.
   */
  size?: 'sm' | 'md' | 'lg' | 'full'
  /**
   * `media` shows an image, a video or an embed on a darker backdrop, without the surface, scaled to fit the screen;
   * `size` does not apply to it.
   */
  variant?: 'default' | 'media'
  /** The accessible name of the close button, in the page's language. */
  closeLabel: string
}

/**
 * The window. Traps the focus while open, closes with Escape, a click on the backdrop or the close button, and
 * returns the focus to the trigger. Needs a DialogTitle.
 */
export function DialogContent({
  className,
  children,
  size = 'md',
  variant = 'default',
  closeLabel,
  ...props
}: DialogContentProps) {
  // Media is sized by the image or video, not by a width.
  const width = variant === 'media' ? null : size
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-overlay"
        className={cn(
          'fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0',
          variant === 'media' ? 'bg-edge/90' : 'bg-edge/70',
        )}
      />
      <DialogPrimitive.Viewport
        data-slot="dialog-viewport"
        className={dialogViewportVariants({ size: width, variant })}
      >
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          data-size={width ?? undefined}
          data-variant={variant}
          className={cn(dialogVariants({ size: width, variant }), className)}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className={cn(
              'text-ink-muted hover:bg-well hover:text-ink flex size-8 cursor-pointer items-center justify-center rounded-[var(--datum-radius-md)] transition-colors',
              variant === 'media'
                ? 'bg-surface text-ink order-first self-end'
                : 'absolute top-3 right-3',
              focusRing,
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="size-4"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            <span className="sr-only">{closeLabel}</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  )
}

/** Title and description. In the media variant it is the caption under the image. */
export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'flex flex-col gap-1.5 p-4 pr-12',
        'group-data-[variant=media]/dialog:max-w-prose group-data-[variant=media]/dialog:p-0 group-data-[variant=media]/dialog:text-center',
        className,
      )}
      {...props}
    />
  )
}

/**
 * The content. When it is taller than the window it scrolls between the header and the footer, and becomes focusable
 * so the keyboard can scroll it.
 */
export function DialogBody({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scrollable, setScrollable] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element || typeof ResizeObserver === 'undefined') return
    const check = () =>
      setScrollable(element.scrollHeight > element.clientHeight + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(element)
    for (const child of Array.from(element.children)) observer.observe(child)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-slot="dialog-body"
      tabIndex={scrollable ? 0 : undefined}
      className={cn(
        'min-h-0 flex-1 overflow-y-auto px-4 py-1 last-of-type:pb-4',
        'group-data-[variant=media]/dialog:flex group-data-[variant=media]/dialog:flex-none group-data-[variant=media]/dialog:items-center group-data-[variant=media]/dialog:justify-center group-data-[variant=media]/dialog:overflow-visible group-data-[variant=media]/dialog:p-0',
        focusRing,
        'focus-visible:ring-offset-surface',
        className,
      )}
      {...props}
    />
  )
}

/** Actions at the end of the window: the main one last, on the right; stacked on a phone with the main one on top. */
export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 p-4 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

export function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('font-display text-lg font-semibold', className)}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-ink-muted text-sm', className)}
      {...props}
    />
  )
}
