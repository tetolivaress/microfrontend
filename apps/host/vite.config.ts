import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // Define remote URLs based on environment
  const getRemoteUrl = (appName: string, port: number) => {
    if (mode === 'production') {
      // Use your deployed Vercel URLs
      return `https://microfrontend-${appName}.vercel.app/assets/remoteEntry.js`
    }
    return `http://localhost:${port}/assets/remoteEntry.js`
  }

  return {
    plugins: [
      react(),
      svgr(),
      federation({
        name: 'host',
        remotes: {
          rick: getRemoteUrl('rick', 3001),
          harry: getRemoteUrl('harry', 3002)
        }
      })
    ],
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@config': path.resolve(__dirname, './src/config'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@services': path.resolve(__dirname, './src/services'),
        '@screens': path.resolve(__dirname, './src/screens'),
        '@apis': path.resolve(__dirname, './src/apis'),
        '@types': path.resolve(__dirname, './src/types'),
      },
    },
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  }
})
