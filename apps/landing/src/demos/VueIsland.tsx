import { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import VueDemoIsland from './VueDemoIsland.vue'

/** Mounts the Vue demo island inside the React page. */
export function VueIsland() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const app = createApp(VueDemoIsland)
    app.mount(host)
    return () => app.unmount()
  }, [])

  return <div ref={hostRef} />
}
