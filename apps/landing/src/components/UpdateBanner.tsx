import { CURRENT_VERSION } from '../lib/version'
import type { RemoteVersion } from '../lib/version'

interface Props {
  available: boolean
  swReady: boolean
  remote: RemoteVersion | null
  onApply: () => void
}

export function UpdateBanner({ available, swReady, remote, onApply }: Props) {
  if (!available) return null
  return (
    <div className="update-banner show" role="alert">
      <span>
        {swReady
          ? '新版本已就绪，刷新即可生效'
          : `发现新版本 v${remote?.version ?? '?'}（当前 v${CURRENT_VERSION}）`}
      </span>
      <button onClick={onApply}>{swReady ? '立即更新' : '刷新页面'}</button>
    </div>
  )
}
