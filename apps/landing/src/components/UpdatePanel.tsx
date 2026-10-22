import { CURRENT_VERSION } from '../lib/version'
import type { UpdateStatus } from '../lib/useUpdate'
import type { RemoteVersion } from '../lib/version'
import { useI18n } from '../lib/i18n'

interface Props {
  status: UpdateStatus
  remote: RemoteVersion | null
  lastChecked: number | null
  error: string | null
  swReady: boolean
  onCheck: () => void
  onApply: () => void
}

const STATUS_KEYS: Record<UpdateStatus, 'update.idle' | 'update.checking' | 'update.latest' | 'update.available' | 'update.error'> = {
  idle: 'update.idle',
  checking: 'update.checking',
  latest: 'update.latest',
  available: 'update.available',
  error: 'update.error',
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString(undefined, { hour12: false })
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
  const { t } = useI18n()
  const available = status === 'available' || swReady

  return (
    <section id="update">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-kicker">{t('update.kicker')}</div>
          <h2 className="section-title">
            {t('update.title1')} <span className="grad-text">{t('update.title2')}</span>
          </h2>
          <p className="section-sub">{t('update.sub')}</p>
        </div>

        <div className="card reveal" style={{ padding: '1.6rem' }}>
          <div className="update-panel">
            <div className="update-cell">
              <span>{t('update.current')}</span>
              <b>v{CURRENT_VERSION}</b>
            </div>
            <div className="update-cell">
              <span>{t('update.remote')}</span>
              <b className={remote ? (available ? 'warn' : 'ok') : ''}>
                {remote ? `v${remote.version}` : '—'}
              </b>
            </div>
            <div className="update-cell">
              <span>{t('update.status')}</span>
              <b
                className={
                  status === 'error' ? 'err' : available ? 'warn' : 'ok'
                }
              >
                {t(STATUS_KEYS[status])}
              </b>
            </div>
            <div className="update-cell">
              <span>{t('update.lastChecked')}</span>
              <b>{lastChecked ? formatTime(lastChecked) : '—'}</b>
            </div>
          </div>

          <div className="update-actions">
            <button className="btn btn-primary" onClick={onCheck}>
              {t('update.check')}
            </button>
            <button
              className="btn btn-ghost"
              onClick={onApply}
              disabled={!available}
              style={available ? undefined : { opacity: 0.45, cursor: 'not-allowed' }}
            >
              {swReady ? t('update.apply') : t('update.reload')}
            </button>
            {error && (
              <span className="update-note" style={{ color: '#fb7185' }}>
                {error}
              </span>
            )}
            {!error && status === 'latest' && (
              <span className="update-note">{t('update.latestNote')}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
