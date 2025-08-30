import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useGetCharacters } from './index'
import * as charactersService from '../../../../services/characters'
import { mockCharacters, mockCharacter } from '../../../../mocks/characters'
import { QueryClientWrapper as createWrapper } from '../../../../test/QueryClientWrapper'

// Mock the characters service
vi.mock('../../../../services/characters', () => ({
  getCharacters: vi.fn()
}))

const mockedGetCharacters = vi.mocked(charactersService.getCharacters)

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
    expect(result.current.allCharacters).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('should return characters data on successful fetch', async () => {
    const mockApiResponse = {
      info: {
        count: 3,
        pages: 1,
        next: 'https://rickandmortyapi.com/api/character/?page=2',
        prev: null
      },
      results: mockCharacters
    }
    
    mockedGetCharacters.mockResolvedValue(mockApiResponse)

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // For useInfiniteQuery, data has pages structure
    expect(result.current.data).toEqual({
      pages: [mockApiResponse],
      pageParams: [1]
    })
    // But allCharacters should be flattened
    expect(result.current.allCharacters).toEqual(mockCharacters)
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

  it('should handle empty characters array', async () => {
    const emptyApiResponse = {
      info: {
        count: 0,
        pages: 0,
        next: '',
        prev: null
      },
      results: []
    }
    
    mockedGetCharacters.mockResolvedValue(emptyApiResponse)

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // For useInfiniteQuery, data has pages structure
    expect(result.current.data).toEqual({
      pages: [emptyApiResponse],
      pageParams: [1]
    })
    // But allCharacters should be empty array
    expect(result.current.allCharacters).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('should call getCharacters service function', async () => {
    const mockApiResponse = {
      info: {
        count: 1,
        pages: 1,
        next: '',
        prev: null
      },
      results: [mockCharacter]
    }
    
    mockedGetCharacters.mockResolvedValue(mockApiResponse)

    const { result } = renderHook(() => useGetCharacters(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // useInfiniteQuery calls with pageParam
    expect(mockedGetCharacters).toHaveBeenCalledWith({ page: 1 })
    expect(mockedGetCharacters).toHaveBeenCalledTimes(1)
  })
})
