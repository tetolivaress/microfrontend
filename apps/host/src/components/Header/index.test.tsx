import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Header from './index'
import { Theme } from '../../Theme'

// Mock react-i18next
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'header.title': 'Microfrontend App',
    'header.toggleLanguage': 'Toggle Language'
  }
  return translations[key] || key
})

const mockUseTranslation = vi.fn(() => ({
  t: mockT,
  i18n: {
    language: 'en',
    changeLanguage: vi.fn()
  }
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => mockUseTranslation()
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={Theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Header Component', () => {
  const mockOnToggleLanguage = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders header with title and toggle button', () => {
    renderWithTheme(<Header onToggleLanguage={mockOnToggleLanguage} />)
    
    const title = screen.getByText('Microfrontend App')
    expect(title).toBeInTheDocument()
    
    const toggleButton = screen.getByRole('button', { name: /toggle language/i })
    expect(toggleButton).toBeInTheDocument()
  })

  it('calls onToggleLanguage when toggle button is clicked', () => {
    renderWithTheme(<Header onToggleLanguage={mockOnToggleLanguage} />)
    
    const toggleButton = screen.getByRole('button', { name: /toggle language/i })
    fireEvent.click(toggleButton)
    
    expect(mockOnToggleLanguage).toHaveBeenCalledTimes(1)
  })

  it('calls onToggleLanguage multiple times when clicked multiple times', () => {
    renderWithTheme(<Header onToggleLanguage={mockOnToggleLanguage} />)
    
    const toggleButton = screen.getByRole('button', { name: /toggle language/i })
    fireEvent.click(toggleButton)
    fireEvent.click(toggleButton)
    fireEvent.click(toggleButton)
    
    expect(mockOnToggleLanguage).toHaveBeenCalledTimes(3)
  })

  it('passes correct props to Button component', () => {
    renderWithTheme(<Header onToggleLanguage={mockOnToggleLanguage} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Toggle Language')
    fireEvent.click(button)

    expect(mockOnToggleLanguage).toHaveBeenCalledTimes(1)
  })
})
