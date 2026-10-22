import { CURRENT_VERSION } from '../lib/version'
import type { UpdateStatus } from '../lib/useUpdate'
import type { RemoteVersion } from '../lib/version'

interface Props {
  status: UpdateStatus
  remote: RemoteVersion | null
  lastChecked: number | null
  error: string | null
  swReady: boolean
  onCheck: () => void
  onApply: () => void
}

const STATUS_TEXT: Record<UpdateStatus, string> = {
  idle: '待检查',
  checking: '检查中…',
  latest: '已是最新',
  available: '发现新版本',
  error: '检查失败',
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('zh-CN', { hour12: false })
}

export function UpdatePanel({
  status,
  remote,
  lastChecked,
  error,
  swReady,
  onCheck,
  onApply,
}: Props) {
  const available = status === 'available' || swReady

  return (
    <section id="update">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">Version Discovery &amp; Update</div>
          <h2 className="section-title">
            落地页自带<span className="grad-text">版本发现与更新</span>
          </h2>
          <p className="section-sub">
            页面启动、每 5 分钟、切回标签页、网络恢复时自动拉取{' '}
            <code>version.json</code>；发现新版本即提示。PWA Service Worker
            就绪后，一键热更新并自动 reload。
          </p>
        </div>

        <div className="card reveal" style={{ padding: '1.6rem' }}>
          <div className="update-panel">
            <div className="update-cell">
              <span>当前版本</span>
              <b>v{CURRENT_VERSION}</b>
            </div>
            <div className="update-cell">
              <span>线上版本</span>
              <b className={remote ? (available ? 'warn' : 'ok') : ''}>
                {remote ? `v${remote.version}` : '—'}
              </b>
            </div>
            <div className="update-cell">
              <span>检查状态</span>
              <b
                className={
                  status === 'error' ? 'err' : available ? 'warn' : 'ok'
                }
              >
                {STATUS_TEXT[status]}
                {swReady ? '（SW 就绪）' : ''}
              </b>
            </div>
            <div className="update-cell">
              <span>最近检查</span>
              <b>{lastChecked ? formatTime(lastChecked) : '—'}</b>
            </div>
          </div>

          <div className="update-actions">
            <button className="btn btn-primary" onClick={onCheck}>
              立即检查更新
            </button>
            <button
              className="btn btn-ghost"
              onClick={onApply}
              disabled={!available}
              style={available ? undefined : { opacity: 0.45, cursor: 'not-allowed' }}
            >
              {swReady ? '热更新并刷新' : '刷新页面'}
            </button>
            {error && (
              <span className="update-note" style={{ color: '#fb7185' }}>
                {error}
              </span>
            )}
            {!error && status === 'latest' && (
              <span className="update-note">version.json 与当前构建一致。</span>
            )}
          </div>

          <pre className="code" style={{ marginTop: '1.4rem' }}>
            <code>{`// public/version.json —— 每次构建由 package.json 同步生成
{
  "version": "${remote?.version ?? CURRENT_VERSION}",
  "buildTime": "${remote?.buildTime ?? '—'}",
  "notes": "${remote?.notes ?? '—'}"
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
