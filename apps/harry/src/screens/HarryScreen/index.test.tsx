import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import HarryScreen from './index'
import * as charactersService from '@services/characters'
import { mockCharacters } from '@mocks/characters'

// Mock the services and hooks
vi.mock('../../services/characters', () => ({
  getCharacters: vi.fn()
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { message?: string }) => {
      const translations: Record<string, string> = {
        'buttons.showCharacters': 'Show Characters',
        'error': `Error: ${options?.message || 'Unknown error'}`
      }
      return translations[key] || key
    }
  })
}))

// Mock styled-components to avoid styling issues in tests
vi.mock('../../components/Characters/CharactersList/styles', () => ({
  StyledCharacterList: ({ children }: { children: ReactNode }) => <div data-testid="characters-list">{children}</div>
}))

vi.mock('../../components/Button/styles', () => ({
  StyledButton: ({ children, onClick }: { children: ReactNode; onClick: () => void }) => 
    <button data-testid="show-characters-button" onClick={onClick}>{children}</button>
}))

vi.mock('../../components/Characters/CharacterItem/styles', () => ({
  StyledCharacterItem: ({ children }: { children: ReactNode }) => <div data-testid="character-item">{children}</div>
}))

vi.mock('../../components/Title/styles', () => ({
  StyledTitleContainer: ({ children }: { children: ReactNode }) => <div data-testid="title-container">{children}</div>,
  StyledTitle: ({ children }: { children: ReactNode }) => <span data-testid="title">{children}</span>
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

describe('HarryScreen Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should render show characters button initially', () => {
    // Mock a promise that never resolves to avoid loading state changes
    mockedGetCharacters.mockImplementation(() => new Promise(() => {}))
    
    render(<HarryScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Show Characters')
    
    // Should not show characters list initially
    expect(screen.queryByTestId('characters-list')).not.toBeInTheDocument()
  })

  it('should show loading state when button is clicked and data is loading', async () => {
    // Mock a promise that never resolves to keep loading state
    mockedGetCharacters.mockImplementation(() => new Promise(() => {}))
    
    render(<HarryScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    // Should show loading text
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
    
    // Button should be gone since showCharacters is now true
    expect(screen.queryByTestId('show-characters-button')).not.toBeInTheDocument()
  })



  it('should handle empty characters array', async () => {
    mockedGetCharacters.mockResolvedValue([])
    
    render(<HarryScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('characters-list')).toBeInTheDocument()
    expect(screen.queryAllByTestId('character-item')).toHaveLength(0)
    
    expect(mockedGetCharacters).toHaveBeenCalledTimes(1)
  })

  it('should not show characters list when showCharacters is false', () => {
    mockedGetCharacters.mockResolvedValue(mockCharacters)
    
    render(<HarryScreen />, { wrapper: createWrapper() })
    
    expect(screen.getByTestId('show-characters-button')).toBeInTheDocument()
    expect(screen.queryByTestId('characters-list')).not.toBeInTheDocument()
  })

  it('should handle network errors gracefully', async () => {
    const networkError = new Error('Network Error')
    networkError.name = 'NetworkError'
    mockedGetCharacters.mockRejectedValue(networkError)
    
    render(<HarryScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Error: Network Error')).toBeInTheDocument()
    })
    
    expect(mockedGetCharacters).toHaveBeenCalledTimes(1)
  })

  it('should use correct translation keys', () => {
    mockedGetCharacters.mockImplementation(() => new Promise(() => {}))
    
    render(<HarryScreen />, { wrapper: createWrapper() })
    
    // Check that the correct translation key is used for the button
    const button = screen.getByTestId('show-characters-button')
    expect(button).toHaveTextContent('Show Characters')
  })
})
