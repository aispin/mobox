import { CURRENT_VERSION } from '../lib/version'
import { useI18n } from '../lib/i18n'
import type { Theme } from '../lib/theme'

const LINKS = [
  { href: '#effects', key: 'nav.effects' },
  { href: '#demos', key: 'nav.demos' },
  { href: '#playground', key: 'nav.web3d' },
  { href: '#install', key: 'nav.install' },
  { href: '#update', key: 'nav.update' },
] as const

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

interface Props {
  theme: Theme
  onToggleTheme: () => void
}

export function Nav({ theme, onToggleTheme }: Props) {
  const { t, lang, setLang } = useI18n()

  return (
    <nav className="nav">
      <a className="nav-brand" href="#top">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="navg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7c5cff" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#navg)" strokeWidth="4" strokeLinejoin="round">
            <path d="M32 8 L54 20 L54 44 L32 56 L10 44 L10 20 Z" />
            <path d="M32 8 L32 32 L10 20 M32 32 L54 20 M32 32 L32 56" />
          </g>
        </svg>
        MOBOX
      </a>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {t(l.key)}
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span className="nav-version">v{CURRENT_VERSION}</span>
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          aria-label={t('nav.lang')}
        >
          {t('nav.lang')}
        </button>
        <button
          type="button"
          className="nav-toggle"
          onClick={onToggleTheme}
          aria-label={t('nav.theme')}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <a
          className="nav-cta"
          href="https://github.com/mamboer/mobox"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </nav>
  )
}
