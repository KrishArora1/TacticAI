import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    allowedHosts: ['https://664e-128-61-43-73.ngrok-free.app', 'localhost', 'onrender.com']
  } 
})
