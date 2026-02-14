import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://pawly-petcare.runasp.net',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://pawly-petcare.runasp.net',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
