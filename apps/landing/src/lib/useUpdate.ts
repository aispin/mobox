import { useCallback, useEffect, useRef, useState } from 'react'
import { setNeedRefreshHandler, swUpdate } from './pwa'
import { CURRENT_VERSION, fetchRemoteVersion, isNewer, type RemoteVersion } from './version'

export type UpdateStatus = 'idle' | 'checking' | 'latest' | 'available' | 'error'

const POLL_MS = 5 * 60 * 1000

export function useUpdate() {
  const [status, setStatus] = useState<UpdateStatus>('idle')
  const [remote, setRemote] = useState<RemoteVersion | null>(null)
  const [lastChecked, setLastChecked] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [swReady, setSwReady] = useState(false)
  const checking = useRef(false)

  const check = useCallback(async () => {
    if (checking.current) return
    checking.current = true
    setStatus('checking')
    try {
      const info = await fetchRemoteVersion()
      setRemote(info)
      setLastChecked(Date.now())
      setError(null)
      setStatus(isNewer(info.version, CURRENT_VERSION) ? 'available' : 'latest')
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setStatus('error')
    } finally {
      checking.current = false
    }
  }, [])

  useEffect(() => {
    setNeedRefreshHandler(() => setSwReady(true))
    void check()
    const timer = window.setInterval(() => void check(), POLL_MS)
    const onVisible = () => {
      if (document.visibilityState === 'visible') void check()
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('online', onVisible)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('online', onVisible)
    }
  }, [check])

  /** Apply the new version: activate the waiting SW when present, else reload. */
  const applyUpdate = useCallback(() => {
    if (swReady) {
      void swUpdate(true)
      return
    }
    window.location.reload()
  }, [swReady])

  return { status, remote, lastChecked, error, swReady, check, applyUpdate }
}
