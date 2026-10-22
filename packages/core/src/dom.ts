export function qs<T extends HTMLElement = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T | null {
  return root.querySelector<T>(selector)
}

type EventMap = HTMLElementEventMap & DocumentEventMap
type EventTargetLike = HTMLElement | Document

export function on<K extends keyof EventMap>(
  el: EventTargetLike,
  type: K,
  fn: (ev: EventMap[K]) => void,
): () => void {
  el.addEventListener(type, fn as EventListener)
  return () => el.removeEventListener(type, fn as EventListener)
}

const motionQuery = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null

export function prefersReducedMotion(): boolean {
  return motionQuery?.matches ?? false
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function focusables(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  )
}
