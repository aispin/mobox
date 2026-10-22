import { registerSW } from 'virtual:pwa-register'

type Updater = (reloadPage?: boolean) => Promise<void>

let updateSW: Updater | null = null
let needRefreshHandler: (() => void) | null = null

if ('serviceWorker' in navigator) {
  // vite-plugin-pwa returns the updater directly; older versions returned a promise
  const result: unknown = registerSW({
    immediate: true,
    onNeedRefresh() {
      needRefreshHandler?.()
    },
  })
  if (typeof result === 'function') {
    updateSW = result as Updater
  } else if (result && typeof (result as { then?: unknown }).then === 'function') {
    void (result as Promise<{ updateSW: Updater }>).then((api) => {
      updateSW = api.updateSW
    })
  }
}

/** Trigger the waiting service worker to activate (reloads the page when true). */
export const swUpdate = (reloadPage?: boolean): Promise<void> | undefined =>
  updateSW?.(reloadPage)

export const setNeedRefreshHandler = (cb: () => void): void => {
  needRefreshHandler = cb
}
