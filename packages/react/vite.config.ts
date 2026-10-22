import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'MoboxReact',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'mobox-react.js' : 'mobox-react.umd.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@aifire/mobox-core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@aifire/mobox-core': 'Mobox',
        },
      },
    },
  },
})
