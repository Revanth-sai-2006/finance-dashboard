import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/finance-dashboard/',
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'app',
        entryFileNames: 'main.js',
        chunkFileNames: 'chunk-[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
