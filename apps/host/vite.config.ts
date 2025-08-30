import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [react(), federation({
    name: 'host',
    remotes: {
      rick: 'http://localhost:3001/assets/remoteEntry.js',
      harry: 'http://localhost:3002/assets/remoteEntry.js'
    }
  })],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
})
