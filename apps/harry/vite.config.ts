import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: 'harry',
    filename: 'remoteEntry.js',
    exposes: {
      './App': './src/main.tsx',
    },
  })],
  server: {
    port: 3002,
  },
  preview: {
    port: 3002,
  }
})
