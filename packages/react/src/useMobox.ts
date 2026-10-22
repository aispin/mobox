import { useCallback, useEffect, useRef } from 'react'
import { Mobox as MoboxCore, type MoboxInstance, type MoboxOptions, type MoboxSceneData } from '@mobox/core'

export type UseMoboxOptions = MoboxOptions

/**
 * Imperative MOBOX hook. Attach the returned `ref` to any element;
 * the engine normalizes it into the .mobox structure.
 */
export function useMobox(options: UseMoboxOptions = {}) {
  const elRef = useRef<HTMLElement | null>(null)
  const instRef = useRef<MoboxInstance | null>(null)
  const optionsRef = useRef(options)
  optionsRef.current = options

  const setRef = useCallback((el: HTMLElement | null) => {
    if (el === elRef.current) return
    instRef.current?.dispose()
    instRef.current = el ? new MoboxCore(el, optionsRef.current) : null
    elRef.current = el
  }, [])

  useEffect(
    () => () => {
      instRef.current?.dispose()
      instRef.current = null
    },
    [],
  )

  return {
    ref: setRef,
    show: (data?: MoboxSceneData) => instRef.current?.show(data),
    hide: () => instRef.current?.hide(),
    toggle: () => instRef.current?.toggle(),
    get instance() {
      return instRef.current
    },
  }
}
