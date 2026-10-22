import { useI18n } from '../lib/i18n'

const FEATURES = [
  {
    key: 'features.f1',
    icon: 'M12 2 L2 7 L12 12 L22 7 Z M2 17 L12 22 L22 17 M2 12 L12 17 L22 12',
  },
  {
    key: 'features.f2',
    icon: 'M4 4h7v7H4z M13 13h7v7h-7z M13 4h7v7h-7z M4 13h7v7H4z',
  },
  {
    key: 'features.f3',
    icon: 'M12 3v18 M3 12h18 M5.6 5.6l12.8 12.8 M18.4 5.6L5.6 18.4',
  },
  {
    key: 'features.f4',
    icon: 'M12 3a9 9 0 109 9M12 7v5l3 3',
  },
] as const

export function Features() {
  const { t, rich } = useI18n()

  return (
    <section id="features" style={{ paddingTop: '2rem' }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">{t('features.kicker')}</div>
          <h2 className="section-title">
            {t('features.title1')} <span className="grad-text">{t('features.title2')}</span>
          </h2>
          <p className="section-sub">{t('features.sub')}</p>
        </div>
        <div className="grid grid-3 reveal">
          {FEATURES.map((f) => (
            <div className="card" key={f.key}>
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3>{t(`${f.key}.title` as const)}</h3>
              <p>{rich(`${f.key}.desc` as const)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TICKER = [
  'Vite 8',
  'React 19',
  'Vue 3.5',
  'TypeScript 7',
  'Three.js',
  'GLSL Shader',
  'WebGL',
  'Canvas 2D',
  'SVG',
  'WAAPI',
  'PWA',
  'pnpm workspace',
  'catalog',
  'Zero Dependency',
]

export function Marquee() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={`${t}-${i}`}>
            <b>{t}</b> ◆
          </span>
        ))}
      </div>
    </div>
  )
}
