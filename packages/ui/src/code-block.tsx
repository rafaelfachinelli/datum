'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Button, type ButtonProps } from './button.js'
import { cn } from './lib/cn.js'

export const codeBlockVariants = cva(
  [
    'group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-[var(--datum-radius-md)] border bg-surface text-sm data-[size=sm]:text-xs',
    // The content is the focusable part (it scrolls), so the block shows its focus.
    'has-[>[data-slot=code-block-content]:focus-visible]:ring-2 has-[>[data-slot=code-block-content]:focus-visible]:ring-season-accent has-[>[data-slot=code-block-content]:focus-visible]:ring-offset-2 has-[>[data-slot=code-block-content]:focus-visible]:ring-offset-board',
  ],
  {
    variants: {
      variant: {
        default: 'border-line-strong text-ink',
        danger: 'border-danger/50 text-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type CodeBlockProps = React.ComponentProps<'div'> &
  VariantProps<typeof codeBlockVariants> & { size?: 'md' | 'sm' }

/** A block of code or output in monospace, without syntax highlighting. Compose with the parts below. */
export function CodeBlock({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: CodeBlockProps) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant }), className)}
      {...props}
    />
  )
}

/** A row above the code: the title and the actions. */
export function CodeBlockHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        'text-ink-muted group-data-[variant=danger]/code-block:text-danger flex min-w-0 shrink-0 items-center gap-2 px-4 pt-4 group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pt-3 *:has-[>[data-slot=code-block-title]]:min-w-0',
        className,
      )}
      {...props}
    />
  )
}

/** The file name or language, with an optional icon before it. */
export function CodeBlockTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-title"
      className={cn(
        "text-ink group-data-[variant=danger]/code-block:text-danger min-w-0 truncate font-sans text-sm font-medium group-data-[size=sm]/code-block:text-xs [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle [&_svg:not([class*='size-'])]:size-4 group-data-[size=sm]/code-block:[&_svg:not([class*='size-'])]:size-3.5 *:[svg]:me-1.5",
        className,
      )}
      {...props}
    />
  )
}

/**
 * Buttons for the code (copy). In the header they sit at its end; placed straight in the CodeBlock, they float over
 * the top corner and show on hover or focus (always on touch screens).
 */
export function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn(
        '-my-1 ms-auto -me-1.5 flex shrink-0 items-center gap-1',
        '[[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-3 [[data-slot=code-block]>&]:top-3 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100',
        'group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-2 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-2',
        '[[data-slot=code-block]>&]:*:[button]:bg-surface [[data-slot=code-block]>&]:*:[button]:ring-line-strong [[data-slot=code-block]>&]:*:[button]:ring-1',
        className,
      )}
      {...props}
    />
  )
}

function CopyIcon() {
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
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function CheckIcon() {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export type CodeBlockCopyButtonProps = ButtonProps & {
  /** The text copied to the clipboard. */
  value: string
  /** The accessible name of the button, in the page's language ("Copiar"). */
  label: string
  /** Said and shown as the name for two seconds after copying ("Copiado"). */
  copiedLabel: string
}

/** Copies `value` and shows a check for two seconds; a polite live region announces it. */
export function CodeBlockCopyButton({
  value,
  label,
  copiedLabel,
  variant = 'ghost',
  size = 'icon',
  className,
  onClick,
  ...props
}: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant={variant}
        size={size}
        aria-label={copied ? copiedLabel : label}
        className={cn(size === 'icon' && 'size-7', className)}
        onClick={event => {
          onClick?.(event)
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {})
        }}
        {...props}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </>
  )
}

export type CodeBlockContentProps = React.ComponentProps<'pre'> & {
  /** Wraps long lines instead of scrolling sideways. */
  wrap?: boolean
  /** Numbers the lines. With a string child, each line becomes a CodeBlockLine. */
  lineNumbers?: boolean
  /** The number of the first line. */
  startLine?: number
}

/** The code. A string child is shown as is; CodeBlockLine children let you mark lines added, removed or highlighted. */
export function CodeBlockContent({
  className,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: CodeBlockContentProps) {
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      style={{ counterReset: `line ${startLine - 1}`, ...style }}
      className={cn(
        'scroll-fade-x min-h-0 min-w-0 [scrollbar-width:thin] overflow-auto px-4 py-4 text-start font-mono leading-relaxed outline-none',
        'group-has-data-[slot=code-block-footer]/code-block:pb-2 group-has-data-[slot=code-block-header]/code-block:pt-2 group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:py-3 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1.5',
        'data-wrap:scroll-fade-y data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap',
        className,
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
      >
        {lineNumbers && typeof children === 'string'
          ? children
              .replace(/\n$/, '')
              .split('\n')
              .map((line, index) => (
                <CodeBlockLine key={index}>{line}</CodeBlockLine>
              ))
          : children}
      </code>
    </pre>
  )
}

export const codeBlockLineVariants = cva(
  [
    'relative -mx-4 block min-h-lh px-4 group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:px-3',
    'before:min-w-6 before:text-end before:text-ink-muted after:absolute after:start-1 after:top-0 after:text-ink-muted after:select-none',
    "in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  ],
  {
    variants: {
      variant: {
        default: '',
        added: "bg-success/10 after:text-success after:content-['+']",
        removed: "bg-danger/10 after:text-danger after:content-['−']",
        highlighted: 'bg-well',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type CodeBlockLineProps = React.ComponentProps<'span'> &
  VariantProps<typeof codeBlockLineVariants>

/** One line of code, marked `added`, `removed` or `highlighted`. */
export function CodeBlockLine({
  className,
  variant = 'default',
  children,
  ...props
}: CodeBlockLineProps) {
  // An empty line holds a newline so copying a selection keeps blank lines.
  const empty =
    children === undefined ||
    children === null ||
    children === '' ||
    (Array.isArray(children) && children.length === 0)

  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(codeBlockLineVariants({ variant }), className)}
      {...props}
    >
      <span data-slot="code-block-line-content" className="min-w-0">
        {empty ? '\n' : children}
      </span>
    </span>
  )
}

/** A row below the code: a note, a link to the source. */
export function CodeBlockFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="code-block-footer"
      className={cn(
        'text-ink-muted flex min-w-0 shrink-0 items-center gap-2 px-4 pb-4 group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pb-3',
        className,
      )}
      {...props}
    />
  )
}
