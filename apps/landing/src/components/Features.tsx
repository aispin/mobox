const FEATURES = [
  {
    title: '零依赖核心',
    desc: '@mobox/core 运行时零依赖，gzip 约 4KB。无 Modernizr、无 Snap.svg、无 jQuery。',
    icon: 'M12 2 L2 7 L12 12 L22 7 Z M2 17 L12 22 L22 17 M2 12 L12 17 L22 12',
  },
  {
    title: '效果即组件',
    desc: '每种弹窗效果是独立模块，WAAPI 驱动。注册自定义效果只需实现两个方法。',
    icon: 'M4 4h7v7H4z M13 13h7v7h-7z M13 4h7v7h-7z M4 13h7v7H4z',
  },
  {
    title: '三端同源',
    desc: 'core / react / vue 共享同一引擎与效果系统，行为完全一致。',
    icon: 'M12 3v18 M3 12h18 M5.6 5.6l12.8 12.8 M18.4 5.6L5.6 18.4',
  },
  {
    title: '现代可访问性',
    desc: '焦点圈禁、ESC 关闭、滚动锁定、inert 隔离、prefers-reduced-motion 全支持。',
    icon: 'M12 3a9 9 0 109 9M12 7v5l3 3',
  },
  {
    title: 'PWA 就绪',
    desc: '可安装、离线可用；version.json 版本发现 + Service Worker 热更新。',
    icon: 'M12 3v12 M7 10l5 5 5-5 M4 19h16',
  },
  {
    title: 'Monorepo 工程化',
    desc: 'pnpm workspace + catalog 版本收敛，Vite 8 库模式双格式产物。',
    icon: 'M3 7l9-4 9 4-9 4-9-4z M3 12l9 4 9-4 M3 17l9 4 9-4',
  },
]

export function Features() {
  return (
    <section id="features" style={{ paddingTop: '2rem' }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">Why MOBOX 2.0</div>
          <h2 className="section-title">
            从 2015 到 2026，<span className="grad-text">彻底重写</span>
          </h2>
          <p className="section-sub">
            告别 gulp + less + bower。全新架构：TypeScript 7、Vite 8、
            pnpm workspace，以及一整套 Web3D 视觉。
          </p>
        </div>
        <div className="grid grid-3 reveal">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
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
