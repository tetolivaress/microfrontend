import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from './App'

const mockChangeLanguage = vi.fn()
const mockUseTranslation = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => mockUseTranslation(),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}))

vi.mock('./config/i18n', () => ({}))

vi.mock('./screens/HarryScreen', () => ({
  default: () => <div data-testid="Harry-screen">Harry Screen Component</div>
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTranslation.mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
      },
    })
  })

  it('should render HarryScreen component', () => {
    render(<App language="en" />)
    
    expect(screen.getByTestId('Harry-screen')).toBeInTheDocument()
  })

  it('should call changeLanguage with initial language prop', async () => {
    render(<App language="en" />)
    
    await waitFor(() => {
      expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    })
  })

  it('should call changeLanguage when language prop changes', async () => {
    const { rerender } = render(<App language="en" />)
    
    await waitFor(() => {
      expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    })

    rerender(<App language="es" />)
    
    await waitFor(() => {
      expect(mockChangeLanguage).toHaveBeenCalledWith('es')
    })
  })
})
