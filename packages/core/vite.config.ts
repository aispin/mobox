import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'Mobox',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'mobox.js' : 'mobox.umd.cjs'),
    },
    cssFileName: 'mobox',
    rollupOptions: {
      output: {
        assetFileNames: 'mobox.[ext]',
      },
    },
  },
})
