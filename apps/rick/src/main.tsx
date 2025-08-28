import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App.tsx'

const queryClient = new QueryClient()

const mount = (el: HTMLElement) => {
  createRoot(el).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>,
  )
}

if (import.meta.env.VITE_NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_rick-dev-root')
  if (devRoot instanceof HTMLElement) {
    mount(devRoot)
  }
}

export { mount }
