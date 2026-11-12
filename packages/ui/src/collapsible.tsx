'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

/** A section that opens and closes. Compose with CollapsibleTrigger and CollapsibleContent. */
export function Collapsible(props: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/** Opens and closes the content. `render` draws another element (a Button) as the trigger; it replaces asChild. */
export function CollapsibleTrigger(props: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

/**
 * The hidden part. Unstyled: `--collapsible-panel-height` and `data-starting-style` / `data-ending-style` let you
 * animate its height.
 */
export function CollapsibleContent(props: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}
