import { prefersReducedMotion } from '../dom'
import type { MoboxEffectComponent, EffectParts } from './types'

const COLORS = ['#7c5cff', '#22d3ee', '#f472b6', '#fbbf24']

/**
 * Fire-and-forget particle burst on a dedicated full-screen canvas.
 * Particles erupt from the dialog's top edge and fan out upwards,
 * so they read as sparks bursting out of the dialog itself.
 */
function burst(root: HTMLElement, inner: HTMLElement): void {
  if (prefersReducedMotion()) return
  // The enter animation scales `inner`, so getBoundingClientRect would
  // report the mid-animation box. offset* metrics are transform-independent.
  const host = root.getBoundingClientRect()
  const w = inner.offsetWidth || 560
  const h = inner.offsetHeight || 200
  const parent = inner.offsetParent as HTMLElement | null
  const prect = parent ? parent.getBoundingClientRect() : host
  const left = parent ? prect.left + inner.offsetLeft : host.left + (host.width - w) / 2
  const top = parent ? prect.top + inner.offsetTop : host.top + (host.height - h) / 2

  const canvas = document.createElement('canvas')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: 0,
    zIndex: '9998',
    pointerEvents: 'none',
  })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }
  ctx.scale(dpr, dpr)

  const particles = Array.from({ length: 110 }, () => ({
    // emit along the top edge of the dialog
    x: left + 16 + Math.random() * Math.max(w - 32, 1),
    y: top - 2 + Math.random() * 8,
    // fan out upwards, mostly vertical
    vx: Math.cos(-Math.PI / 2 + (Math.random() - 0.5) * 1.8) * (2 + Math.random() * 5),
    vy: Math.sin(-Math.PI / 2 + (Math.random() - 0.5) * 1.8) * (2 + Math.random() * 5),
    size: 1.5 + Math.random() * 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
    life: 1,
  }))

  const tick = (): void => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    let alive = false
    for (const p of particles) {
      if (p.life <= 0) continue
      alive = true
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.05
      p.vx *= 0.985
      p.vy *= 0.99
      p.life -= 0.012
      ctx.globalAlpha = Math.max(p.life, 0)
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    if (alive) requestAnimationFrame(tick)
    else canvas.remove()
  }
  requestAnimationFrame(tick)
}

/** Fade-in dialog with a canvas particle burst from its top edge. */
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
    burst(parts.root, parts.inner)
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
