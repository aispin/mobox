import { bindData } from './bind'
import { focusables, on, prefersReducedMotion, qs } from './dom'
import { effectNames, getEffect, registerEffect } from './effects'
import type { MoboxEffectComponent } from './effects'
import type { MoboxCreateOptions, MoboxInstance, MoboxOptions, MoboxSceneData } from './types'

const OPEN_CLASS = 'mobox-open'
const SCENE_CLASS = 'mobox-scene'
const SCENE_ACTIVE_CLASS = 'mobox-scene-active'

let openCount = 0
let scrollLocked = false

function lockScroll(): void {
  if (scrollLocked) return
  scrollLocked = true
  document.body.dataset.moboxOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function unlockScroll(): void {
  if (!scrollLocked) return
  scrollLocked = false
  document.body.style.overflow = document.body.dataset.moboxOverflow ?? ''
  delete document.body.dataset.moboxOverflow
}

function resolveEl(el: HTMLElement | string | undefined): HTMLElement | null {
  if (!el) return null
  return typeof el === 'string' ? document.getElementById(el) : el
}

function elFromHtml(html: string): HTMLElement | null {
  const holder = document.createElement('div')
  holder.innerHTML = html.trim()
  const first = holder.firstElementChild as HTMLElement | null
  if (!first) return null
  document.body.appendChild(first)
  return first
}

function elFromTpl(tpl: HTMLElement | string): HTMLElement | null {
  if (typeof tpl !== 'string') {
    return tpl instanceof HTMLScriptElement ? elFromHtml(tpl.innerHTML) : null
  }
  if (tpl.includes('<')) return elFromHtml(tpl)
  const script = document.getElementById(tpl)
  return script ? elFromHtml(script.innerHTML) : null
}

/** Normalize any element into the .mobox structure (overlay + inner). */
function normalize(el: HTMLElement): void {
  el.classList.add('mobox')
  if (!qs('.mobox-overlay', el)) {
    const overlay = document.createElement('div')
    overlay.className = 'mobox-overlay'
    el.prepend(overlay)
  }
  if (!qs('.mobox-inner', el)) {
    const inner = document.createElement('div')
    inner.className = 'mobox-inner'
    for (const child of [...el.children]) {
      if (!child.classList.contains('mobox-overlay')) inner.appendChild(child)
    }
    el.appendChild(inner)
  }
  const inner = qs<HTMLElement>('.mobox-inner', el)
  if (inner) inner.tabIndex = -1
}

export class Mobox implements MoboxInstance {
  /**
   * Create a mobox from an existing element (`el`) or a template (`tpl`),
   * optionally showing it immediately with bound `data`.
   */
  static create(opts: MoboxCreateOptions = {}, data?: MoboxSceneData): MoboxInstance | null {
    const { el, tpl, autoShow = true, ...options } = opts
    let target = resolveEl(el)
    const dynamic = !target
    if (!target && tpl !== undefined) target = elFromTpl(tpl)
    if (!target) {
      console.error('[mobox] Mobox.create() requires a valid "el" or "tpl" option')
      return null
    }
    const inst = new Mobox(target, { ...options, autoDestroy: options.autoDestroy ?? dynamic })
    return autoShow ? inst.show(data) : inst
  }

  /** Register a custom effect component (see MoboxEffectComponent). */
  static registerEffect(effect: MoboxEffectComponent): void {
    registerEffect(effect)
  }

  /** Names of all registered effects. */
  static effectNames(): string[] {
    return effectNames()
  }

  readonly el: HTMLElement
  readonly effect: string

  private readonly options: Required<
    Pick<
      MoboxOptions,
      | 'effect'
      | 'closeOnOverlay'
      | 'closeOnEsc'
      | 'lockScroll'
      | 'trapFocus'
      | 'autoDestroy'
      | 'hideNullValues'
    >
  > &
    MoboxOptions
  private readonly overlay: HTMLElement
  private readonly inner: HTMLElement
  private readonly teardown: Array<() => void> = []
  private anims: Animation[] = []
  private _isOpen = false
  private _cycle = 0

  constructor(el: HTMLElement, options: MoboxOptions = {}) {
    normalize(el)
    this.el = el
    this.effect = options.effect ?? el.dataset.effect ?? 'zoom'
    this.options = {
      closeOnOverlay: true,
      closeOnEsc: true,
      lockScroll: true,
      trapFocus: true,
      autoDestroy: false,
      hideNullValues: true,
      ...options,
      effect: this.effect,
    }
    this.overlay = qs<HTMLElement>('.mobox-overlay', el) as HTMLElement
    this.inner = qs<HTMLElement>('.mobox-inner', el) as HTMLElement

    this.teardown.push(
      on(this.overlay, 'click', () => {
        if (this.options.closeOnOverlay) this.hide()
      }),
      on(document, 'keydown', (ev) => this._onKeydown(ev)),
    )
    for (const ctrl of el.querySelectorAll<HTMLElement>('[data-mobox-close]')) {
      this.teardown.push(on(ctrl, 'click', () => this.hide()))
    }
  }

  get isOpen(): boolean {
    return this._isOpen
  }

  show(data?: MoboxSceneData): MoboxInstance {
    if (data) bindData(this.el, data, this.options.hideNullValues)
    if (this._isOpen) return this
    this._isOpen = true

    this.anims.forEach((a) => a.cancel())
    this.anims = []

    if (this.options.lockScroll) lockScroll()
    openCount++
    this.el.classList.add(OPEN_CLASS)
    this.options.onOpen?.(this)

    const cycle = ++this._cycle
    this._play('enter').then(() => {
      if (cycle === this._cycle && this._isOpen) this.options.onOpened?.(this)
    })
    return this
  }

  hide(): MoboxInstance {
    if (!this._isOpen) return this
    this._isOpen = false
    this.options.onClose?.(this)

    const cycle = ++this._cycle
    this._play('exit').then(() => {
      if (cycle !== this._cycle) return
      this.el.classList.remove(OPEN_CLASS)
      openCount = Math.max(openCount - 1, 0)
      if (openCount === 0) unlockScroll()
      if (this.options.autoDestroy) this.destroy()
      this.options.onClosed?.(this)
    })
    return this
  }

  toggle(): MoboxInstance {
    return this._isOpen ? this.hide() : this.show()
  }

  /** Activate the `.mobox-scene-<name>` scene and bind `data` onto it. */
  showScene(name: string, data?: MoboxSceneData): MoboxInstance {
    const activeClass = `${SCENE_CLASS}-${name || 'default'}`
    let target: HTMLElement | undefined
    for (const scene of this.el.querySelectorAll<HTMLElement>(`.${SCENE_CLASS}`)) {
      scene.classList.remove(SCENE_ACTIVE_CLASS)
      if (!target && scene.classList.contains(activeClass)) target = scene
    }
    if (!target) return this
    if (data) bindData(target, data, this.options.hideNullValues)
    target.classList.add(SCENE_ACTIVE_CLASS)
    return this
  }

  /** Release listeners/animations without removing the element. */
  dispose(): void {
    this.anims.forEach((a) => a.cancel())
    this.anims = []
    this.teardown.forEach((fn) => fn())
    this.teardown.length = 0
    if (this._isOpen) {
      this._isOpen = false
      openCount = Math.max(openCount - 1, 0)
      if (openCount === 0) unlockScroll()
    }
  }

  destroy(): void {
    this.dispose()
    this.el.remove()
  }

  private _play(hook: 'enter' | 'exit'): Promise<void> {
    if (prefersReducedMotion()) return Promise.resolve()
    const effect = getEffect(this.effect)
    if (!effect) return Promise.resolve()
    const result = effect[hook]({ root: this.el, overlay: this.overlay, inner: this.inner })
    const results = result == null ? [] : Array.isArray(result) ? result : [result]
    const anims = results.filter((r): r is Animation => r instanceof Animation)
    const pending = results.filter((r): r is Promise<void> => r instanceof Promise)
    this.anims = anims
    return Promise.all([
      ...anims.map((a) => a.finished.catch(() => undefined)),
      ...pending,
    ]).then(() => undefined)
  }

  private _onKeydown(ev: KeyboardEvent): void {
    if (!this._isOpen) return
    if (ev.key === 'Escape' && this.options.closeOnEsc) {
      this.hide()
      return
    }
    if (ev.key !== 'Tab' || !this.options.trapFocus) return
    const items = focusables(this.inner)
    if (items.length === 0) {
      ev.preventDefault()
      this.inner.focus()
      return
    }
    const first = items[0] as HTMLElement
    const last = items[items.length - 1] as HTMLElement
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault()
      last.focus()
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault()
      first.focus()
    }
  }
}
