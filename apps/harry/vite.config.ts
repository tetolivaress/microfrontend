import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
    },
    base: env.VITE_NODE_ENV === 'production' ? '/harry/' : 'http://localhost:3002/',
  }
})
