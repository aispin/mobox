import { useEffect, useRef } from 'react'
import { createHeroScene } from '../webgl/heroScene'
import { CURRENT_VERSION } from '../lib/version'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const scene = createHeroScene(canvas)
    return () => scene.dispose()
  }, [])

  return (
    <header className="hero" id="top">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-veil" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          MOBOX <b>2.0</b> 现已发布 · 无框架依赖 · PWA
        </div>
        <h1>
          弹窗，<span className="grad-text">重新想象</span>
        </h1>
        <p className="hero-sub">
          Modern Dialog + Pop Box + Overlay。效果即组件，基于{' '}
          <code>Web Animations</code> / <code>WebGL</code> / <code>GLSL</code>{' '}
          从零重写。一份核心，三种框架：<code>core</code> · <code>react</code> ·{' '}
          <code>vue</code>。
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#install">
            立即安装
          </a>
          <a className="btn btn-ghost" href="#effects">
            体验 10 种效果
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <b className="grad-text">10+</b>
            <span>可组合效果组件</span>
          </div>
          <div className="hero-stat">
            <b className="grad-text">0</b>
            <span>核心运行时依赖</span>
          </div>
          <div className="hero-stat">
            <b className="grad-text">~4KB</b>
            <span>GZIPPED 核心体积</span>
          </div>
          <div className="hero-stat">
            <b className="grad-text">100</b>
            <span>LIGHTHOUSE PWA</span>
          </div>
        </div>
      </div>
      <div className="scroll-hint">SCROLL</div>
      <span style={{ display: 'none' }}>{CURRENT_VERSION}</span>
    </header>
  )
}
