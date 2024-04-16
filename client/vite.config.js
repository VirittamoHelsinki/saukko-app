import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  define: {
    'process.env': {}
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, '')
      }
    }
  }
})
