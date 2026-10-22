import { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import VueDemoIsland from './VueDemoIsland.vue'
import { useI18n, type MsgKey } from '../lib/i18n'

/** Mounts the Vue demo island inside the React page. */
export function VueIsland() {
  const hostRef = useRef<HTMLDivElement>(null)
  const { t, lang } = useI18n()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const app = createApp(VueDemoIsland)
    // Hand the current translator to the Vue island via provide/inject.
    app.provide('mobox-t', (key: MsgKey, vars?: Record<string, string | number>) =>
      t(key, vars),
    )
    app.provide('mobox-lang', lang)
    app.mount(host)
    return () => app.unmount()
  }, [t, lang])

  return <div ref={hostRef} />
}
