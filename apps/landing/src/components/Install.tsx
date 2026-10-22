import { useState } from 'react'

const MANAGERS = [
  { key: 'pnpm', label: 'pnpm', cmd: 'pnpm add @mobox/core @mobox/react' },
  { key: 'npm', label: 'npm', cmd: 'npm i @mobox/core @mobox/react' },
  { key: 'yarn', label: 'yarn', cmd: 'yarn add @mobox/core @mobox/react' },
] as const

export function Install() {
  const [active, setActive] = useState<(typeof MANAGERS)[number]['key']>('pnpm')
  const [copied, setCopied] = useState(false)
  const current = MANAGERS.find((m) => m.key === active) ?? MANAGERS[0]

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
          <div className="section-kicker">Install</div>
          <h2 className="section-title">
            三十秒，<span className="grad-text">接入完成</span>
          </h2>
          <p className="section-sub">
            核心零依赖；React / Vue 版按需安装。样式表随包发布：
            <code>@mobox/core/mobox.css</code>。
          </p>
        </div>
        <div className="reveal" style={{ maxWidth: 640 }}>
          <div className="tabs" role="tablist">
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
          <div className="install-cmd">
            <span className="prompt">$</span>
            <code>{current.cmd}</code>
            <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy}>
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <div className="install-cmd">
            <span className="prompt">$</span>
            <code>pnpm add @mobox/core @mobox/vue</code>
            <span style={{ color: 'var(--text-faint)', fontSize: '0.78rem' }}>
              Vue 项目
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
