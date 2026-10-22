import { CURRENT_VERSION } from '../lib/version'
import type { RemoteVersion } from '../lib/version'
import { useI18n } from '../lib/i18n'

interface Props {
  available: boolean
  swReady: boolean
  remote: RemoteVersion | null
  onApply: () => void
}

export function UpdateBanner({ available, swReady, remote, onApply }: Props) {
  const { t } = useI18n()
  if (!available) return null
  return (
    <div className="update-banner show" role="alert">
      <span>
        {swReady
          ? t('banner.swReady')
          : t('banner.available', {
              remote: remote?.version ?? '?',
              current: CURRENT_VERSION,
            })}
      </span>
      <button onClick={onApply}>{swReady ? t('banner.update') : t('banner.reload')}</button>
    </div>
  )
}
