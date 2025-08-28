import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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

// Mount for standalone development
if (import.meta.env.VITE_NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_harry-dev-root')
  if (devRoot instanceof HTMLElement) {
    mount(devRoot)
  }
}

export { mount }
