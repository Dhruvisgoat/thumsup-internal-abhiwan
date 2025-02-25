import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from any host
    port: 5173, // Choose your desired port
  },
  optimizeDeps: {
    exclude: ['sharp']
  }
})



