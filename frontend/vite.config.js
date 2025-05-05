import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    strictPort: true,
    host: true,
    port: 3333,
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
