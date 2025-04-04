import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Already in /client/, so root is current dir
  build: {
    outDir: '../dist', // Output to /coursehub/dist/
    emptyOutDir: true // Clear /dist/ before building
  }
})
