import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App.tsx'

const queryClient = new QueryClient()

let rootInstance: Root | null = null

const mount = (el: HTMLElement, { language }: { language: string }) => {
  if (!rootInstance) {
    rootInstance = createRoot(el)
  }

  rootInstance.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App language={language} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>,
  )
}

if (import.meta.env.VITE_NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_rick-dev-root')
  if (devRoot instanceof HTMLElement) {
    mount(devRoot, { language: 'es' })
  }
}

export { mount }
