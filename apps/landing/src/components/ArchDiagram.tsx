import { useI18n } from '../lib/i18n'

/** Animated monorepo architecture diagram (pure SVG + CSS). */
export function ArchDiagram() {
  const { t } = useI18n()

  return (
    <section id="arch">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">{t('arch.kicker')}</div>
          <h2 className="section-title">
            {t('arch.title1')} <span className="grad-text">{t('arch.title2')}</span>
          </h2>
          <p className="section-sub">{t('arch.sub')}</p>
        </div>
        <div className="card reveal" style={{ padding: '1.2rem' }}>
          <svg
            className="arch"
            viewBox="0 0 760 380"
            role="img"
            aria-label={t('arch.title2')}
          >
            <defs>
              <linearGradient id="archgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7c5cff" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>

            {/* root */}
            <rect className="node-box" x="300" y="16" width="160" height="52" rx="10" />
            <text className="node-label" x="380" y="38" textAnchor="middle">
              {t('arch.root')}
            </text>
            <text className="node-sub" x="380" y="56" textAnchor="middle">
              {t('arch.pm')}
            </text>

            {/* workspace file */}
            <rect className="node-box" x="560" y="16" width="180" height="52" rx="10" />
            <text className="node-label" x="650" y="38" textAnchor="middle">
              {t('arch.workspace')}
            </text>
            <text className="node-sub" x="650" y="56" textAnchor="middle">
              {t('arch.catalogFile')}
            </text>
            <path className="edge" d="M460 42 L560 42" />

            {/* catalog node */}
            <rect
              className="node-box"
              x="560"
              y="120"
              width="180"
              height="86"
              rx="10"
            />
            <text className="node-label" x="650" y="146" textAnchor="middle">
              {t('arch.catalog')}
            </text>
            <text className="node-sub" x="650" y="168" textAnchor="middle">
              typescript ^7.0.2
            </text>
            <text className="node-sub" x="650" y="186" textAnchor="middle">
              vite ^8.3.5 · react ^19.3.1
            </text>
            <path className="edge" d="M650 68 L650 120" />

            {/* edges from root to packages */}
            <path className="edge" d="M340 68 L170 150" />
            <path className="edge" d="M380 68 L380 150" />
            <path className="edge" d="M420 68 L590 150" />

            {/* packages */}
            <rect className="node-box" x="70" y="150" width="200" height="86" rx="10" />
            <rect className="node-accent" x="70" y="150" width="200" height="86" rx="10" opacity="0.35" />
            <text className="node-label" x="170" y="176" textAnchor="middle">
              @mobox/core
            </text>
            <text className="node-sub" x="170" y="198" textAnchor="middle">
              {t('arch.coreSub')}
            </text>
            <text className="node-sub" x="170" y="216" textAnchor="middle">
              {t('arch.dist')}
            </text>

            <rect className="node-box" x="290" y="150" width="180" height="86" rx="10" />
            <text className="node-label" x="380" y="176" textAnchor="middle">
              @mobox/react
            </text>
            <text className="node-sub" x="380" y="198" textAnchor="middle">
              {t('arch.reactSub')}
            </text>
            <text className="node-sub" x="380" y="216" textAnchor="middle">
              {t('arch.dist')}
            </text>

            <rect className="node-box" x="490" y="150" width="180" height="86" rx="10" />
            <text className="node-label" x="580" y="176" textAnchor="middle">
              @mobox/vue
            </text>
            <text className="node-sub" x="580" y="198" textAnchor="middle">
              {t('arch.vueSub')}
            </text>
            <text className="node-sub" x="580" y="216" textAnchor="middle">
              {t('arch.dist')}
            </text>

            {/* landing app */}
            <path className="edge" d="M170 236 L170 300" />
            <path className="edge" d="M380 236 L380 300" />
            <path className="edge" d="M580 236 L580 300" />
            <rect
              className="node-box"
              x="180"
              y="300"
              width="400"
              height="64"
              rx="10"
            />
            <rect className="node-accent" x="180" y="300" width="400" height="64" rx="10" opacity="0.5" />
            <text className="node-label" x="380" y="328" textAnchor="middle">
              @mobox/landing
            </text>
            <text className="node-sub" x="380" y="350" textAnchor="middle">
              {t('arch.landingSub')}
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}
