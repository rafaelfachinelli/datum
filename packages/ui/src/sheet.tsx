'use client'

import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { focusRing } from './button.js'
import { cn } from './lib/cn.js'

/** A panel that slides in from an edge of the screen, over the page. */
export function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

/** Opens the sheet. `render` draws another element as the trigger (it replaces asChild). */
export function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

export function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

// Each side slides in from its own edge and fades; reduced motion keeps only the fade.
const sheetVariants = cva(
  [
    'fixed z-50 flex flex-col gap-4 border-line-strong bg-surface text-ink shadow-xl shadow-edge/60 outline-none',
    'transition-[opacity,translate] duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-opacity',
  ],
  {
    variants: {
      side: {
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-ending-style:translate-x-10 data-starting-style:translate-x-10 sm:max-w-sm motion-reduce:translate-x-0',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-ending-style:-translate-x-10 data-starting-style:-translate-x-10 sm:max-w-sm motion-reduce:translate-x-0',
        top: 'inset-x-0 top-0 h-auto border-b data-ending-style:-translate-y-10 data-starting-style:-translate-y-10 motion-reduce:translate-y-0',
        bottom:
          'inset-x-0 bottom-0 h-auto border-t data-ending-style:translate-y-10 data-starting-style:translate-y-10 motion-reduce:translate-y-0',
      },
    },
    defaultVariants: { side: 'right' },
  },
)

export type SheetContentProps = SheetPrimitive.Popup.Props & {
  /** The edge the panel slides in from. */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** The accessible name of the close button, in the page's language. */
  closeLabel: string
}

/**
 * The panel. Traps the focus while open, closes with Escape or a click on the
 * backdrop, and returns the focus to the trigger. Needs a SheetTitle.
 */
export function SheetContent({
  className,
  children,
  side = 'right',
  closeLabel,
  ...props
}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop
        data-slot="sheet-overlay"
        className="bg-edge/70 fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className={cn(
            'text-ink-muted hover:bg-well hover:text-ink absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-[var(--datum-radius-md)] transition-colors',
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
        </SheetPrimitive.Close>
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  )
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4 pr-12', className)}
      {...props}
    />
  )
}

export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

export function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('font-display text-lg font-semibold', className)}
      {...props}
    />
  )
}

export function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-ink-muted text-sm', className)}
      {...props}
    />
  )
}
