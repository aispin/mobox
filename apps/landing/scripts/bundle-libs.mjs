import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const appRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(appRoot, 'dist')
const pkg = JSON.parse(readFileSync(join(appRoot, 'package.json'), 'utf8'))

// 1. Keep public/version.json in sync with the package version on every build,
//    so the deployed page can always discover the newest release.
const versionFile = join(appRoot, 'public', 'version.json')
const versionData = JSON.parse(readFileSync(versionFile, 'utf8'))
versionData.version = pkg.version
versionData.buildTime = new Date().toISOString()
writeFileSync(versionFile, `${JSON.stringify(versionData, null, 2)}\n`)
cpSync(versionFile, join(dist, 'version.json'))

// 2. Host the built library bundles next to the landing page for CDN-style usage.
const libs = join(dist, 'libs')
mkdirSync(libs, { recursive: true })
for (const name of ['core', 'react', 'vue']) {
  const src = join(appRoot, '..', '..', 'packages', name, 'dist')
  if (existsSync(src)) {
    cpSync(src, join(libs, name), { recursive: true })
    console.log(`[mobox] bundled packages/${name}/dist -> dist/libs/${name}`)
  }
}
