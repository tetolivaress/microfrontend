import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [react(), federation({
    name: 'rick',
    filename: 'remoteEntry.js',
    exposes: {
      './App': './src/main.tsx',
    },
  })],
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  }
})
