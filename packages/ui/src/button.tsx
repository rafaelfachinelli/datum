import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from './lib/cn.js'
import { Spinner } from './spinner.js'

export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-season-accent focus-visible:ring-offset-2 focus-visible:ring-offset-board'

export const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[var(--datum-radius-md)] font-medium whitespace-nowrap transition-[color,background-color,border-color,filter] duration-150',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    focusRing,
  ],
  {
    variants: {
      variant: {
        primary: 'bg-season-accent text-season-on-accent hover:brightness-110',
        secondary: 'bg-well text-ink hover:bg-edge',
        outline:
          'border border-line-strong bg-transparent text-ink hover:bg-well',
        ghost: 'bg-transparent text-ink hover:bg-well',
        link: 'h-auto px-0 text-season-accent underline-offset-4 hover:underline',
        danger: 'bg-danger text-edge hover:brightness-110',
      },
      size: {
        sm: 'h-8 px-3 text-sm has-[>svg]:px-2.5',
        md: 'h-9 px-4 text-sm has-[>svg]:px-3',
        lg: 'h-11 px-6 text-base has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Shows a spinner, blocks clicks and announces the busy state. */
    loading?: boolean
  }

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  // `render` draws another element (a link: <Button render={<a href="/" />} nativeButton={false}>) with the button's
  // styles and behavior; it replaces Radix's asChild.
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* Decorative and sized by the button, like its icons: the busy state is announced by the button itself. */}
      {loading && <Spinner size={null} />}
      {children}
    </ButtonPrimitive>
  )
}
