import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'MoboxVue',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'mobox-vue.js' : 'mobox-vue.umd.cjs'),
    },
    rollupOptions: {
      external: ['vue', '@mobox/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@mobox/core': 'Mobox',
        },
      },
    },
  },
})
