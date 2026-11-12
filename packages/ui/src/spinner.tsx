import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from './lib/cn.js'

const spinnerVariants = cva(
  'shrink-0 animate-spin motion-reduce:[animation-duration:2s]',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-6',
        lg: 'size-8',
      },
    },
    defaultVariants: { size: 'sm' },
  },
)

export type SpinnerProps = Omit<React.ComponentProps<'svg'>, 'children'> &
  VariantProps<typeof spinnerVariants> & {
    /**
     * What is loading, in the page's language ("Carregando a equipe"): with it the spinner is a status that screen
     * readers announce; without it, it is decoration beside words that already say it (a busy button).
     */
    label?: string
  }

/**
 * Something is on its way: a ring that turns, in the current text color. It keeps turning under reduced motion, only
 * slower: it is status, not decoration.
 */
export function Spinner({ className, size, label, ...props }: SpinnerProps) {
  const ring = (
    <svg
      data-slot="spinner"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
  if (!label) return ring
  return (
    <span role="status" className="inline-flex">
      {ring}
      <span className="sr-only">{label}</span>
    </span>
  )
}
