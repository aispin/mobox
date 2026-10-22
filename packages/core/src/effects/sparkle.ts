import { prefersReducedMotion } from '../dom'
import type { MoboxEffectComponent, EffectParts } from './types'

const COLORS = ['#7c5cff', '#22d3ee', '#f472b6', '#fbbf24']

/**
 * Fire-and-forget particle burst on a dedicated canvas.
 * Sparks erupt from the horizontally-centered back rim of the dialog and
 * explode outward in all directions at once, arcing under gravity. The
 * canvas is layered above the overlay but below the dialog card, so the
 * burst reads as detonating from behind the dialog itself.
 *
 * Coordinate strategy (this is what keeps the burst glued to the dialog):
 * - The canvas gets an EXPLICIT CSS size. A canvas' intrinsic size is its
 *   backing-store size, so `inset: 0` / `width: auto` would size it to the
 *   buffer (or the 300x150 default) — which silently breaks on HiDPI, where
 *   the buffer is devicePixelRatio times the CSS size.
 * - The backing store is built from the canvas' MEASURED box, and
 *   ctx.scale(dpr) maps drawing units 1:1 to CSS pixels.
 * - The emission point is expressed in canvas-local coordinates
 *   (dialog center minus the canvas origin), so the burst lands on the
 *   dialog no matter where the canvas actually sits.
 */
function burst(root: HTMLElement, inner: HTMLElement): void {
  if (prefersReducedMotion()) return
  if (!inner.isConnected) return

  const canvas = document.createElement('canvas')
  Object.assign(canvas.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`,
    zIndex: '1', // above .mobox-overlay (auto), below .mobox-inner (5)
    pointerEvents: 'none',
  })
  // Appended inside the dialog root so the card itself occludes the jet base
  // and so the canvas shares the dialog's coordinate space.
  root.appendChild(canvas)

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  // Measure the canvas' real box AFTER layout (this also absorbs any
  // containing-block offset) and size the backing store from it.
  const cr = canvas.getBoundingClientRect()
  const cw = cr.width || window.innerWidth
  const ch = cr.height || window.innerHeight
  canvas.width = Math.max(1, Math.round(cw * dpr))
  canvas.height = Math.max(1, Math.round(ch * dpr))
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }
  ctx.scale(dpr, dpr)

  // Dialog box, measured at fire time (the pop-in scale has mostly settled).
  // Fall back to layout metrics, then bail out — never draw at a bogus spot.
  let ir = inner.getBoundingClientRect()
  if (ir.width <= 0) {
    const ow = inner.offsetWidth
    const oh = inner.offsetHeight
    if (ow <= 0 || oh <= 0 || !inner.offsetParent) return
    const pr = inner.offsetParent.getBoundingClientRect()
    ir = { left: pr.left + inner.offsetLeft, top: pr.top + inner.offsetTop, width: ow, height: oh } as DOMRect
  }
  const w = ir.width || 560
  const h = ir.height || 200
  // Canvas-local coordinates: subtract the canvas' own origin.
  const cx = ir.left + w / 2 - cr.left
  const top = ir.top - cr.top
  // tight, horizontally-centered emission point at the back rim
  const spreadX = Math.min(w * 0.06, 28)
  const bandH = Math.min(h * 0.06, 14)

  const particles = Array.from({ length: 120 }, () => {
    // Radial explosion: every spark leaves the source at once in a random
    // direction — no jet phase. Sparks heading down or sideways are occluded
    // by the dialog card, so the burst reads as detonating behind it.
    const angle = Math.random() * Math.PI * 2
    const speed = 2 + Math.random() * 6
    return {
      x: cx + (Math.random() - 0.5) * 2 * spreadX,
      y: top + Math.random() * bandH,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
      life: 1,
    }
  })

  const tick = (): void => {
    ctx.clearRect(0, 0, cw, ch)
    let alive = false
    for (const p of particles) {
      if (p.life <= 0) continue
      alive = true
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.09
      p.vx *= 0.965
      p.vy *= 0.97
      p.life -= 0.014
      ctx.globalAlpha = Math.max(p.life, 0) ** 1.2
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * (0.45 + 0.55 * Math.max(p.life, 0)), 0, Math.PI * 2)
      ctx.fill()
    }
    if (alive) requestAnimationFrame(tick)
    else canvas.remove()
  }
  requestAnimationFrame(tick)
}

/** Fade-in dialog with a radial particle burst at its back rim. */
export const sparkle: MoboxEffectComponent = {
  name: 'sparkle',
  enter: (parts: EffectParts) => {
    const anim = parts.inner.animate(
      [
        { opacity: 0, transform: 'scale(0.7)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
    )
    // Fire the jet as the card pops in, not at the start of the scale-up.
    window.setTimeout(() => burst(parts.root, parts.inner), 160)
    return anim
  },
  exit: ({ inner }) =>
    inner.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.72)' },
      ],
      { duration: 260, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'both' },
    ),
}
