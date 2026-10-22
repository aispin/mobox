import { useEffect, useRef } from 'react'
import { Mobox } from '@aifire/mobox-core'
import { useI18n } from '../lib/i18n'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const COUNT = 90
const LINK_DIST = 120
const POINTER_RADIUS = 140
const HIT_DIST = 36

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const { t, rich } = useI18n()
  const tRef = useRef(t)
  tRef.current = t

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    let visible = true
    const pointer = { x: -9999, y: -9999 }

    const particles: Particle[] = []
    particlesRef.current = particles

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 1 + Math.random() * 2,
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // gentle pointer attraction
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < POINTER_RADIUS && dist > 0.01) {
          p.vx += (dx / dist) * 0.02
          p.vy += (dy / dist) * 0.02
        }
        p.vx = Math.max(-1.2, Math.min(1.2, p.vx * 0.995))
        p.vy = Math.max(-1.2, Math.min(1.2, p.vy * 0.995))
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        p.x = Math.max(0, Math.min(width, p.x))
        p.y = Math.max(0, Math.min(height, p.y))
      }

      // links
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i] as Particle
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j] as Particle
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(124, 92, 255, ${(1 - d / LINK_DIST) * 0.35})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of particles) {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.85)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (visible) raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (raf) return
      visible = true
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      visible = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    /** Click a star node -> a Mobox dialog lights up right there. */
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      let best: Particle | null = null
      let bestD = HIT_DIST
      for (const p of particles) {
        const d = Math.hypot(p.x - x, p.y - y)
        if (d < bestD) {
          bestD = d
          best = p
        }
      }
      if (!best) return
      const tr = tRef.current
      Mobox.create({
        tpl: `
<div class="mobox" data-effect="sparkle">
  <div class="mobox-overlay"></div>
  <div class="mobox-inner">
    <h2 class="mobox-title">${tr('playground.dialogTitle', { id: best.id })}</h2>
    <p class="mobox-cont">${tr('playground.dialogP', {
      x: Math.round(best.x),
      y: Math.round(best.y),
    })}</p>
    <div class="mobox-actions">
      <button class="mobox-btn mobox-btn-primary" data-mobox-close>${tr('effects.gotit')}</button>
    </div>
    <button class="mobox-icon-close" data-mobox-close aria-label="${tr('effects.close')}"></button>
  </div>
</div>`,
        effect: 'sparkle',
      })
    }

    resize()
    seed()
    start()

    const io = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    )
    io.observe(canvas)

    const ro = new ResizeObserver(() => {
      resize()
      seed()
    })
    ro.observe(canvas)

    canvas.addEventListener('pointermove', onPointer)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener('pointermove', onPointer)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <section id="playground">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">{t('playground.kicker')}</div>
          <h2 className="section-title">
            {t('playground.title1')} <span className="grad-text">{t('playground.title2')}</span>
          </h2>
          <p className="section-sub">{rich('playground.sub')}</p>
        </div>
        <canvas ref={canvasRef} className="constellation reveal" aria-label="particle constellation" />
      </div>
    </section>
  )
}
