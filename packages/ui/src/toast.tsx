'use client'

import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import * as React from 'react'

import { focusRing } from './button.js'
import { cn } from './lib/cn.js'

/** What a toast says about what happened: done, plain news, something to watch, something that failed. */
export type ToastTone = 'success' | 'neutral' | 'warning' | 'danger'

const toneEdge: Record<ToastTone, string> = {
  success: 'border-l-success',
  neutral: 'border-l-line-strong',
  warning: 'border-l-warning',
  danger: 'border-l-danger',
}

export type ToasterProps = {
  children: React.ReactNode
  /** The close button's name for screen readers, in the page's language ("Fechar"). */
  closeLabel: string
  /** How long a toast stays, in milliseconds, before it goes by itself (4 s by default). */
  timeout?: number
  /** How many show at once; an older one gives way to a newer. */
  limit?: number
}

/**
 * Wraps the page once: the toasts it asks for with `useToast` show at the bottom of the screen (centered on a phone, on the
 * right from 640 px) and go by themselves. A toast confirms what just happened; anything the reader must act on belongs in the
 * page, not in a toast that goes away.
 */
export function Toaster({
  children,
  closeLabel,
  timeout = 4000,
  limit = 3,
}: ToasterProps) {
  return (
    <ToastPrimitive.Provider timeout={timeout} limit={limit}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          data-slot="toast-viewport"
          className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 outline-none sm:inset-x-auto sm:right-4 sm:items-end"
        >
          <ToastList closeLabel={closeLabel} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = ToastPrimitive.useToastManager()
  return toasts.map(toast => (
    <ToastPrimitive.Root
      key={toast.id}
      toast={toast}
      data-slot="toast"
      className={cn(
        'border-line-strong bg-surface text-ink shadow-edge/40 pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[var(--datum-radius-md)] border border-l-4 px-4 py-3 text-sm shadow-lg',
        'transition-[opacity,translate] duration-200 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0 motion-reduce:transition-none',
        toneEdge[(toast.type as ToastTone | undefined) ?? 'neutral'] ??
          toneEdge.neutral,
      )}
    >
      <div className="min-w-0 flex-1">
        <ToastPrimitive.Title className="m-0 font-medium [overflow-wrap:anywhere]" />
        {toast.description ? (
          <ToastPrimitive.Description className="text-ink-muted m-0 mt-0.5 [overflow-wrap:anywhere]" />
        ) : null}
      </div>
      <ToastPrimitive.Close
        aria-label={closeLabel}
        className={cn(
          focusRing,
          'text-ink-muted hover:bg-well hover:text-ink -mt-0.5 -mr-1 inline-flex size-7 flex-none items-center justify-center rounded-[var(--datum-radius-sm)]',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="size-4"
        >
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  ))
}

export type ToastOptions = {
  /** One more line under the title, when the title alone is not enough. */
  description?: React.ReactNode
  /** Done (`success`), plain news (`neutral`, the default), something to watch (`warning`), something that failed (`danger`). */
  tone?: ToastTone
  /** How long this one stays, in milliseconds; 0 keeps it until it is closed. */
  timeout?: number
}

/**
 * Shows a toast from anywhere inside the Toaster: `toast.show('Enviado')`, or `toast.success(...)` for something done.
 * Announced politely to screen readers; a `danger` toast is announced at once. Returns the toast's id, for `toast.close`.
 */
export function useToast() {
  const manager = ToastPrimitive.useToastManager()
  return React.useMemo(() => {
    const show = (
      title: React.ReactNode,
      { description, tone = 'neutral', timeout }: ToastOptions = {},
    ) =>
      manager.add({
        title,
        description,
        type: tone,
        priority: tone === 'danger' ? 'high' : 'low',
        ...(timeout === undefined ? {} : { timeout }),
      })
    return {
      show,
      success: (
        title: React.ReactNode,
        options: Omit<ToastOptions, 'tone'> = {},
      ) => show(title, { ...options, tone: 'success' }),
      close: (id: string) => manager.close(id),
    }
  }, [manager])
}
