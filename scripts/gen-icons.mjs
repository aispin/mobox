import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const iconsDir = join(root, 'apps', 'landing', 'public', 'icons')
const master = join(iconsDir, 'icon-master.svg')

const BG = '#0b0b14'

async function render(name, size, options = {}) {
  await sharp(master, { density: 512 })
    .resize(size, size, { fit: 'contain', background: options.background ?? BG })
    .png()
    .toFile(join(iconsDir, name))
  console.log(`[icons] ${name} (${size}x${size})`)
}

// Regular icons: full-bleed background
await render('icon-192.png', 192)
await render('icon-512.png', 512)

// Apple touch icon: no transparency, full-bleed
await render('apple-touch-icon.png', 180)

// Maskable: icon padded to ~80% inside the full-bleed background
const maskable = await sharp(master, { density: 512 })
  .resize(410, 410, { fit: 'contain', background: 'transparent' })
  .toBuffer()
await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: BG,
  },
})
  .composite([{ input: maskable, top: 51, left: 51 }])
  .png()
  .toFile(join(iconsDir, 'maskable-512.png'))
console.log('[icons] maskable-512.png (512x512, padded)')
