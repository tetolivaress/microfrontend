import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { useGetCharacters } from './index'
import * as charactersService from '@services/characters'
import { mockCharacters } from '@mocks/characters'

// Mock the characters service
vi.mock('../../../../services/characters', () => ({
  getCharacters: vi.fn()
}))

const mockedGetCharacters = vi.mocked(charactersService.getCharacters)

// Create a wrapper component for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useGetCharacters Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return loading state initially', () => {
    mockedGetCharacters.mockImplementation(() => 
      new Promise(() => {}) // Never resolves to keep loading state
    )

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeNull()
  })

  it('should return characters data on successful fetch', async () => {
    mockedGetCharacters.mockResolvedValue(mockCharacters)

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockCharacters)
    expect(result.current.error).toBeNull()
    expect(mockedGetCharacters).toHaveBeenCalledTimes(1)
  })

  it('should return error state when fetch fails', async () => {
    const errorMessage = 'Failed to fetch characters'
    mockedGetCharacters.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeTruthy()
    expect(result.current.error?.message).toBe(errorMessage)
    expect(mockedGetCharacters).toHaveBeenCalledTimes(1)
  })

  it('should use correct query key', async () => {
    mockedGetCharacters.mockResolvedValue(mockCharacters)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    })

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )

    renderHook(() => useGetCharacters(), { wrapper })

    await waitFor(() => {
      const queryData = queryClient.getQueryData(['characters'])
      expect(queryData).toEqual(mockCharacters)
    })
  })

  it('should handle empty characters array', async () => {
    mockedGetCharacters.mockResolvedValue([])

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('should handle network error gracefully', async () => {
    const networkError = new Error('Network Error')
    networkError.name = 'NetworkError'
    mockedGetCharacters.mockRejectedValue(networkError)

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeTruthy()
    expect(result.current.error?.name).toBe('NetworkError')
  })
})
