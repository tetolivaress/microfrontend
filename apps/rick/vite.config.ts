import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
    },
    base: env.VITE_NODE_ENV === 'production' ? '/rick/' : 'http://localhost:3001/',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  }
})
