import { useEffect, useRef } from 'react'
import { createHeroScene } from '../webgl/heroScene'
import { useI18n } from '../lib/i18n'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t, rich } = useI18n()

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
          {t('hero.badge')}
        </div>
        <h1>
          {t('hero.title1')} <span className="grad-text">{t('hero.title2')}</span>
        </h1>
        <p className="hero-sub">{rich('hero.sub')}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#install">
            {t('hero.cta1')}
          </a>
          <a className="btn btn-ghost" href="#effects">
            {t('hero.cta2')}
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <b className="grad-text">10+</b>
            <span>{t('hero.stat1')}</span>
          </div>
          <div className="hero-stat">
            <b className="grad-text">0</b>
            <span>{t('hero.stat2')}</span>
          </div>
          <div className="hero-stat">
            <b className="grad-text">~4KB</b>
            <span>{t('hero.stat3')}</span>
          </div>
          <div className="hero-stat">
            <b className="grad-text">100</b>
            <span>{t('hero.stat4')}</span>
          </div>
        </div>
      </div>
      <div className="scroll-hint">SCROLL</div>
    </header>
  )
}
