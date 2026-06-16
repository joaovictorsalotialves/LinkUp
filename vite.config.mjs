import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    dir: './src',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@infra': path.resolve(__dirname, './src/infra'),
      '@main': path.resolve(__dirname, './src/infra'),
      '@test': path.resolve(__dirname, './test'),
    },
  },
})
