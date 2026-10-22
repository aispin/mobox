export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          MOBOX 2.0 · MIT License · 落地页部署于{' '}
          <a href="https://github.com/mamboer/mobox/tree/gh-pages" target="_blank" rel="noreferrer">
            gh-pages
          </a>{' '}
          · 旧版归档于{' '}
          <a href="https://github.com/mamboer/mobox/tree/v1" target="_blank" rel="noreferrer">
            v1 分支
          </a>
        </span>
        <span style={{ fontFamily: 'var(--mono)' }}>built with vite + react + vue + three.js</span>
      </div>
    </footer>
  )
}
