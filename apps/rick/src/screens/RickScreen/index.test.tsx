import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import RickScreen from './index'
import * as charactersService from '../../services/characters'
import { mockCharacter } from '../../mocks/characters'

// Mock the services
vi.mock('../../services/characters', () => ({
  getCharacters: vi.fn()
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'character.name': 'Name',
        'character.status': 'Status',
        'character.species': 'Species',
        'character.alive': 'Alive',
        'character.dead': 'Dead',
        'character.unknown': 'Unknown',
        'character.human': 'Human',
        'character.alien': 'Alien'
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
  StyledCharacterItem: ({ children }: { children: ReactNode }) => <div data-testid="character-item">{children}</div>,
  StyledCharacterImage: ({ src, alt }: { src: string; alt: string }) => <img data-testid="character-image" src={src} alt={alt} />,
  StyledCharacterTitle: ({ children }: { children: ReactNode }) => <span data-testid="character-title">{children}</span>
}))

const mockedGetCharacters = vi.mocked(charactersService.getCharacters)

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

describe('RickScreen Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should render show characters button initially', () => {
    mockedGetCharacters.mockImplementation(() => new Promise(() => {}))
    
    render(<RickScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Show Characters')
    
    expect(screen.queryByTestId('characters-list')).not.toBeInTheDocument()
  })

  it('should show loading state when button is clicked and data is loading', async () => {
    mockedGetCharacters.mockImplementation(() => new Promise(() => {}))
    
    render(<RickScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
    
    expect(screen.queryByTestId('show-characters-button')).not.toBeInTheDocument()
  })

  it('should display error message when data loading fails', async () => {
    const errorMessage = 'Failed to fetch characters'
    mockedGetCharacters.mockRejectedValue(new Error(errorMessage))
    
    render(<RickScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument()
    })
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    expect(screen.queryByTestId('show-characters-button')).not.toBeInTheDocument()
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
    
    render(<RickScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('characters-list')).toBeInTheDocument()
    expect(screen.queryAllByTestId('character-item')).toHaveLength(0)
  })

  it('should not show characters list when showCharacters is false', () => {
    mockedGetCharacters.mockResolvedValue({
      info: { count: 1, pages: 1, next: '', prev: null },
      results: [mockCharacter]
    })
    
    render(<RickScreen />, { wrapper: createWrapper() })
    
    expect(screen.getByTestId('show-characters-button')).toBeInTheDocument()
    expect(screen.queryByTestId('characters-list')).not.toBeInTheDocument()
  })

  it('should handle network errors gracefully', async () => {
    const networkError = new Error('Network Error')
    networkError.name = 'NetworkError'
    mockedGetCharacters.mockRejectedValue(networkError)
    
    render(<RickScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Error: Network Error')).toBeInTheDocument()
    })
  })

  it('should display character details correctly', async () => {
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
    
    render(<RickScreen />, { wrapper: createWrapper() })
    
    const button = screen.getByTestId('show-characters-button')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Species')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
  })
})
