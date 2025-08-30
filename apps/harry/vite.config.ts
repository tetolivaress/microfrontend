import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'
import svgr from 'vite-plugin-svgr'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), svgr(), federation({
      name: 'harry',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.tsx',
      },
    })],
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@config': path.resolve(__dirname, './src/config'),
        '@mocks': path.resolve(__dirname, './src/mocks'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@services': path.resolve(__dirname, './src/services'),
        '@screens': path.resolve(__dirname, './src/screens'),
        '@apis': path.resolve(__dirname, './src/apis'),
        '@constants': path.resolve(__dirname, './src/constants'),
      },
    },
    server: {
      port: 3002,
    },
    preview: {
      port: 3002,
    },
    base: env.VITE_NODE_ENV === 'production' ? '/harry/' : 'http://localhost:3002/',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  }
})
