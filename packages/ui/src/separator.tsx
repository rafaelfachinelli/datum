import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'

import { cn } from './lib/cn.js'

/**
 * A thin line between groups of content. Decorative by default (hidden from
 * screen readers); pass `decorative={false}` when it separates sections.
 */
export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorPrimitive.Props & { decorative?: boolean }) {
  const line = cn(
    'bg-line-strong shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
    className,
  )
  // Base UI's separator always has role="separator"; a decorative one is a plain line no screen reader announces.
  if (decorative) {
    return (
      <div
        data-slot="separator"
        data-orientation={orientation}
        aria-hidden="true"
        className={line}
      />
    )
  }
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={line}
      {...props}
    />
  )
}
