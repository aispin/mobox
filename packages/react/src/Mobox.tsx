import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Mobox as MoboxCore, type MoboxInstance, type MoboxOptions, type MoboxSceneData } from '@mobox/core'

export interface MoboxProps extends Omit<MoboxOptions, 'effect'> {
  /** Effect name. Default: 'zoom' */
  effect?: string
  /** Controlled open state. Omit for uncontrolled mode. */
  open?: boolean
  /** Initial open state in uncontrolled mode. Default: false */
  defaultOpen?: boolean
  /** Called whenever the open state changes (overlay click, ESC, API calls) */
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
  className?: string
}

export interface MoboxRef {
  show(data?: MoboxSceneData): void
  hide(): void
  toggle(): void
  readonly instance: MoboxInstance | null
}

export const Mobox = forwardRef<MoboxRef, MoboxProps>(function Mobox(props, ref) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    effect = 'zoom',
    children,
    className,
    ...options
  } = props

  const elRef = useRef<HTMLDivElement>(null)
  const instRef = useRef<MoboxInstance | null>(null)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    instRef.current = new MoboxCore(el, {
      ...options,
      effect,
      onOpened: (inst) => options.onOpened?.(inst),
      onClosed: (inst) => {
        options.onClosed?.(inst)
        onOpenChange?.(false)
        if (!isControlled) setUncontrolledOpen(false)
      },
    })
    return () => {
      // dispose (not destroy): React owns the portal DOM node and may
      // immediately re-run this effect (StrictMode double-mount).
      instRef.current?.dispose()
      instRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const inst = instRef.current
    if (!inst) return
    if (open) inst.show()
    else inst.hide()
  }, [open])

  useImperativeHandle(ref, () => ({
    show: (data?: MoboxSceneData) => instRef.current?.show(data),
    hide: () => instRef.current?.hide(),
    toggle: () => instRef.current?.toggle(),
    get instance() {
      return instRef.current
    },
  }))

  return createPortal(
    <div
      ref={elRef}
      className={className ? `mobox ${className}` : 'mobox'}
      data-effect={effect}
      inert={!open}
    >
      <div className="mobox-overlay" />
      <div className="mobox-inner" role="dialog" aria-modal="true">
        {children}
        <button type="button" className="mobox-icon-close" data-mobox-close aria-label="Close" />
      </div>
    </div>,
    document.body,
  )
})
