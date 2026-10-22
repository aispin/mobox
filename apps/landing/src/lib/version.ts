export interface RemoteVersion {
  version: string
  buildTime?: string
  notes?: string
}

export const CURRENT_VERSION: string = __APP_VERSION__

function parseVersion(v: string): number[] {
  return v
    .replace(/^v/, '')
    .split('.')
    .map((n) => Number.parseInt(n, 10) || 0)
}

/** true when `remote` is a strictly newer semver than `current` */
export function isNewer(remote: string, current: string): boolean {
  const a = parseVersion(remote)
  const b = parseVersion(current)
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    const x = a[i] ?? 0
    const y = b[i] ?? 0
    if (x > y) return true
    if (x < y) return false
  }
  return false
}

export async function fetchRemoteVersion(): Promise<RemoteVersion> {
  const url = `${import.meta.env.BASE_URL}version.json?t=${Date.now()}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`version.json HTTP ${res.status}`)
  return (await res.json()) as RemoteVersion
}
