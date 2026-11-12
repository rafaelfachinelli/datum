'use client'

import { Select as SelectPrimitive } from '@base-ui/react/select'

import { useFieldControl } from './field.js'
import { controlClass } from './input.js'
import { cn } from './lib/cn.js'

function Chevron({ up = false }: { up?: boolean }) {
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
      <path d={up ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
    </svg>
  )
}

/**
 * Choose one option from a list. Compose with the parts below. Pass `items` (value → label) so the trigger shows the
 * chosen option's label; without it, SelectValue shows the raw value.
 */
export const Select = SelectPrimitive.Root

export function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1', className)}
      {...props}
    />
  )
}

/** The chosen option's label, or `placeholder` while none is chosen. */
export function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('flex-1 truncate text-left', className)}
      {...props}
    />
  )
}

/** The button that shows the chosen value. Inside a Field, it is wired to the label. */
export function SelectTrigger({
  className,
  size = 'md',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'md'
}) {
  // The trigger is a button, which has no `required`: announce it with ARIA.
  const { required, ...control } = useFieldControl<
    typeof props & { required?: boolean }
  >(props)
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      aria-required={required || undefined}
      className={cn(
        controlClass,
        'flex cursor-pointer items-center justify-between gap-2 px-3 whitespace-nowrap data-[size=md]:h-9 data-[size=sm]:h-8',
        'data-placeholder:text-ink-subtle [&_svg]:text-ink-muted [&_svg]:shrink-0',
        className,
      )}
      {...control}
    >
      {children}
      <SelectPrimitive.Icon render={<Chevron />} />
    </SelectPrimitive.Trigger>
  )
}

/**
 * The list of options, in a layer above the page, under the trigger and as wide as it. `alignItemWithTrigger` lays
 * the chosen option over the trigger instead, as native selects do on a computer.
 */
export function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            'border-line-strong bg-surface text-ink shadow-edge/60 relative max-h-(--available-height) w-(--anchor-width) min-w-[8rem] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--datum-radius-md)] border shadow-lg',
            'transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none',
            className,
          )}
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow className="text-ink-muted bg-surface sticky top-0 z-10 flex w-full items-center justify-center py-1">
            <Chevron up />
          </SelectPrimitive.ScrollUpArrow>
          <SelectPrimitive.List className="p-1">
            {children}
          </SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow className="text-ink-muted bg-surface sticky bottom-0 z-10 flex w-full items-center justify-center py-1">
            <Chevron />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

/** A heading for a group of options. */
export function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'text-ink-subtle px-2 py-1.5 font-mono text-[11px] tracking-wide uppercase',
        className,
      )}
      {...props}
    />
  )
}

export function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-pointer items-center gap-2 rounded-[var(--datum-radius-sm)] py-1.5 pr-8 pl-2 text-sm outline-none select-none',
        'data-highlighted:bg-well data-selected:text-season-accent data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        'bg-line-strong pointer-events-none -mx-1 my-1 h-px',
        className,
      )}
      {...props}
    />
  )
}
