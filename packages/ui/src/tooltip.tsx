'use client'

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import { cn } from './lib/cn.js'

/**
 * Shares the open delay between tooltips. Optional: each Tooltip brings its
 * own; wrap a group in one to make moving between them instant.
 */
export function TooltipProvider({
  delay = 300,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

/** A short label that appears on hover or keyboard focus. */
export function Tooltip(props: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/** What the tooltip describes. `render` draws another element (a Button) as the trigger; it replaces asChild. */
export function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export function TooltipContent({
  className,
  side = 'top',
  sideOffset = 6,
  align = 'center',
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            'bg-ink text-board w-fit max-w-64 origin-(--transform-origin) rounded-[var(--datum-radius-sm)] px-2.5 py-1.5 text-xs text-balance',
            'transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none',
            className,
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="data-[side=bottom]:-top-[5px] data-[side=left]:-right-[7.5px] data-[side=left]:rotate-90 data-[side=right]:-left-[7.5px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-[5px] data-[side=top]:rotate-180">
            <svg
              width="10"
              height="5"
              viewBox="0 0 10 5"
              aria-hidden="true"
              className="fill-ink"
            >
              <path d="M0 5 5 0l5 5z" />
            </svg>
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}
