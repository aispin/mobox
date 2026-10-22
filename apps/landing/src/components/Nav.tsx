import { CURRENT_VERSION } from '../lib/version'

const LINKS = [
  { href: '#effects', label: '效果' },
  { href: '#demos', label: '三端演示' },
  { href: '#playground', label: 'Web3D' },
  { href: '#install', label: '安装' },
  { href: '#update', label: '版本更新' },
]

export function Nav() {
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
            {l.label}
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span className="nav-version">v{CURRENT_VERSION}</span>
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
