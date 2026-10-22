import { useState } from 'react'
import { useI18n } from '../lib/i18n'

const MANAGERS = [
  { key: 'pnpm', label: 'pnpm', cmd: 'pnpm add @mobox/core @mobox/react' },
  { key: 'npm', label: 'npm', cmd: 'npm i @mobox/core @mobox/react' },
  { key: 'yarn', label: 'yarn', cmd: 'yarn add @mobox/core @mobox/react' },
] as const

export function Install() {
  const [active, setActive] = useState<(typeof MANAGERS)[number]['key']>('pnpm')
  const [copied, setCopied] = useState(false)
  const current = MANAGERS.find((m) => m.key === active) ?? MANAGERS[0]
  const { t, rich } = useI18n()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current.cmd)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <section id="install">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">{t('install.kicker')}</div>
          <h2 className="section-title">
            {t('install.title1')} <span className="grad-text">{t('install.title2')}</span>
          </h2>
          <p className="section-sub">{t('install.sub')}</p>
        </div>
        <div className="reveal" style={{ maxWidth: 640 }}>
          <ol className="install-steps">
            <li>
              <div>
                <b>{t('install.step1')}</b>
                <div className="tabs" role="tablist" style={{ marginTop: '0.5rem' }}>
                  {MANAGERS.map((m) => (
                    <button
                      key={m.key}
                      role="tab"
                      aria-selected={active === m.key}
                      className={`tab${active === m.key ? ' active' : ''}`}
                      onClick={() => setActive(m.key)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <div className="install-cmd" style={{ marginBottom: 0 }}>
                  <span className="prompt">$</span>
                  <code>{current.cmd}</code>
                  <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy}>
                    {copied ? t('install.copied') : t('install.copy')}
                  </button>
                </div>
                <div className="install-cmd" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                  <span className="prompt">$</span>
                  <code>pnpm add @mobox/core @mobox/vue</code>
                  <span style={{ color: 'var(--text-faint)', fontSize: '0.78rem' }}>
                    {t('install.vue')}
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div>
                <b>{t('install.step2')}</b>
                <span>{rich('install.step2.desc')}</span>
              </div>
            </li>
            <li>
              <div>
                <b>{t('install.step3')}</b>
                <span>{t('install.step3.desc')}</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
