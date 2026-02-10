import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  // Use '/' for dev server (Vite 7 requirement), './' for production builds (Electron)
  base: command === 'serve' ? '/' : './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}))
