import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // Use relative asset paths so the same build works on root domains and subpaths.
  base: './',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    target: 'es2020'
  },
  server: {
    port: 3000,
    open: true
  }
})
