'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import * as React from 'react'

import { cn } from './lib/cn.js'

export type DevicePreviewDevice = 'phone' | 'desktop'

/** The phone's screen, in CSS pixels: a common phone today. */
const PHONE_SCREEN = { width: 390, height: 844 }
/** The bezel (p-3) and the border (1 px) on each side of the screen. */
const PHONE_BEZEL = 12 + 1
const PHONE_FRAME = {
  width: PHONE_SCREEN.width + PHONE_BEZEL * 2,
  height: PHONE_SCREEN.height + PHONE_BEZEL * 2,
}

const useIsoLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type DevicePreviewProps = Omit<
  React.ComponentProps<'div'>,
  'children' | 'defaultValue' | 'onChange'
> & {
  /** What is previewed, usually an iframe: a direct iframe child fills the screen; other content scrolls inside it. */
  children: React.ReactNode
  /** The device shown, when the page controls it. */
  device?: DevicePreviewDevice
  /** The device shown first, when the component holds the choice itself. */
  defaultDevice?: DevicePreviewDevice
  /** Called when the reader picks the other device. */
  onDeviceChange?: (device: DevicePreviewDevice) => void
  /** The phone tab, in the page's language ("Celular"). */
  phoneLabel: string
  /** The computer tab, in the page's language ("Computador"). */
  desktopLabel: string
  /** The accessible name of the group of tabs, in the page's language ("Dispositivo"). */
  listLabel: string
  /** Actions at the end of the toolbar, such as a link that opens the content in another tab. */
  toolbarEnd?: React.ReactNode
  /**
   * `fill` (the default) takes the parent's height, so the parent needs one; a number (px) or a CSS length
   * (`'70dvh'`) fixes it.
   */
  height?: 'fill' | number | string
}

/**
 * The same content seen as a phone or as a computer, with tabs to switch. The phone is a 390 × 844 frame, centered,
 * that scales down to fit a short or narrow space; the computer fills the available width and height. The content
 * stays mounted across the switch, so an iframe does not reload.
 */
export function DevicePreview({
  className,
  style,
  children,
  device,
  defaultDevice = 'phone',
  onDeviceChange,
  phoneLabel,
  desktopLabel,
  listLabel,
  toolbarEnd,
  height = 'fill',
  ...props
}: DevicePreviewProps) {
  const [ownDevice, setOwnDevice] = React.useState(defaultDevice)
  const current = device ?? ownDevice
  const phone = current === 'phone'

  const stageRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)

  // The phone keeps its size in CSS pixels (so the content sees a 390 px viewport) and is scaled down as a whole
  // when the space is smaller than the frame.
  useIsoLayoutEffect(() => {
    const stage = stageRef.current
    if (!phone || !stage || typeof ResizeObserver === 'undefined') return
    const fit = () => {
      const css = getComputedStyle(stage)
      const width =
        stage.clientWidth -
        parseFloat(css.paddingLeft) -
        parseFloat(css.paddingRight)
      const height =
        stage.clientHeight -
        parseFloat(css.paddingTop) -
        parseFloat(css.paddingBottom)
      if (width <= 0 || height <= 0) return
      setScale(
        Math.min(1, width / PHONE_FRAME.width, height / PHONE_FRAME.height),
      )
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [phone])

  return (
    <TabsPrimitive.Root
      data-slot="device-preview"
      data-device={current}
      value={current}
      onValueChange={value => {
        const next = value as DevicePreviewDevice
        if (device === undefined) setOwnDevice(next)
        onDeviceChange?.(next)
      }}
      className={cn(
        'border-line-strong bg-surface text-ink flex min-h-0 flex-col overflow-hidden rounded-[var(--datum-radius-md)] border',
        height === 'fill' && 'h-full',
        className,
      )}
      style={height === 'fill' ? style : { height, ...style }}
      {...props}
    >
      <div
        data-slot="device-preview-toolbar"
        className="border-line flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2"
      >
        <TabsPrimitive.List
          aria-label={listLabel}
          activateOnFocus
          className="bg-well inline-flex items-center gap-0.5 rounded-[var(--datum-radius-md)] p-0.5"
        >
          <DeviceTab value="phone" icon={<PhoneIcon />} label={phoneLabel} />
          <DeviceTab
            value="desktop"
            icon={<MonitorIcon />}
            label={desktopLabel}
          />
        </TabsPrimitive.List>
        {toolbarEnd && (
          <div
            data-slot="device-preview-toolbar-end"
            className="flex items-center gap-2"
          >
            {toolbarEnd}
          </div>
        )}
      </div>
      {/* One panel for both tabs: the tree never changes shape, so the content is not remounted on a switch. */}
      <TabsPrimitive.Panel
        ref={stageRef}
        value={current}
        data-slot="device-preview-stage"
        className={cn(
          'bg-board relative flex min-h-0 flex-1 items-center justify-center overflow-hidden outline-none',
          'focus-visible:ring-season-accent focus-visible:ring-2 focus-visible:ring-inset',
          phone && 'p-4',
        )}
      >
        <div
          data-slot="device-preview-sizer"
          className={cn('relative shrink-0', !phone && 'size-full')}
          style={
            phone
              ? {
                  width: PHONE_FRAME.width * scale,
                  height: PHONE_FRAME.height * scale,
                }
              : undefined
          }
        >
          <div
            data-slot="device-preview-frame"
            className={cn(
              phone
                ? // A phone's round corners are part of what the frame draws, the one place past Datum's small
                  // radius; it is still built from the radius token.
                  'border-line-strong bg-edge shadow-edge/60 absolute top-0 left-0 origin-top-left rounded-[calc(var(--datum-radius-md)*10)] border p-3 shadow-xl'
                : 'size-full',
            )}
            style={phone ? { transform: `scale(${scale})` } : undefined}
          >
            <div
              data-slot="device-preview-screen"
              className={cn(
                'bg-board overflow-auto [&>iframe]:block [&>iframe]:size-full [&>iframe]:border-0',
                phone
                  ? 'rounded-[calc(var(--datum-radius-md)*7)]'
                  : 'size-full',
              )}
              style={phone ? PHONE_SCREEN : undefined}
            >
              {children}
            </div>
          </div>
        </div>
      </TabsPrimitive.Panel>
    </TabsPrimitive.Root>
  )
}

function DeviceTab({
  value,
  icon,
  label,
}: {
  value: DevicePreviewDevice
  icon: React.ReactNode
  label: string
}) {
  return (
    <TabsPrimitive.Tab
      value={value}
      data-slot="device-preview-tab"
      className={cn(
        'text-ink-muted hover:text-ink inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[var(--datum-radius-sm)] px-2.5 text-sm font-medium whitespace-nowrap transition-colors',
        'data-active:bg-surface data-active:text-ink data-active:shadow-edge/60 data-active:shadow-sm',
        'focus-visible:ring-season-accent focus-visible:ring-offset-well outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      )}
    >
      {icon}
      {label}
    </TabsPrimitive.Tab>
  )
}

function PhoneIcon() {
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
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  )
}

function MonitorIcon() {
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
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}
