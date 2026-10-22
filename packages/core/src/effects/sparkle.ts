import { prefersReducedMotion } from '../dom'
import type { MoboxEffectComponent, EffectParts } from './types'

const COLORS = ['#7c5cff', '#22d3ee', '#f472b6', '#fbbf24']

/** Fire-and-forget particle burst on a dedicated full-screen canvas. */
function burst(inner: HTMLElement): void {
  if (prefersReducedMotion()) return
  const rect = inner.getBoundingClientRect()
  const canvas = document.createElement('canvas')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
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

  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const particles = Array.from({ length: 90 }, () => {
    const angle = Math.random() * Math.PI * 2
    const speed = 2.5 + Math.random() * 7
    return {
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 3.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
      life: 1,
    }
  })

  const tick = (): void => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    let alive = false
    for (const p of particles) {
      if (p.life <= 0) continue
      alive = true
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.12
      p.vx *= 0.98
      p.life -= 0.016
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

/** Fade-in dialog with a canvas particle burst behind it. */
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
    burst(parts.inner)
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
