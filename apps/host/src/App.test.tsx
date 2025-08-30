import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import App from './App'

vi.mock('./components/Rick', () => ({
  default: ({ language }: { language: string }) => (
    <div data-testid="rick-component">Rick Component - Language: {language}</div>
  )
}))

vi.mock('./components/Harry', () => ({
  default: ({ language }: { language: string }) => (
    <div data-testid="harry-component">Harry Component - Language: {language}</div>
  )
}))

vi.mock('./components/Header', () => ({
  default: ({ onToggleLanguage }: { onToggleLanguage: () => void }) => (
    <div data-testid="header-component">
      <button onClick={onToggleLanguage} data-testid="toggle-language-btn">
        Toggle Language
      </button>
    </div>
  )
}))

vi.mock('./config/i18n', () => ({}))

const mockChangeLanguage = vi.fn()
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: mockChangeLanguage
    }
  })
}))

vi.mock('./Theme', () => ({
  Theme: {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d'
    }
  },
  Grid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid-container">{children}</div>
  )
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('header-component')).toBeInTheDocument()
    expect(screen.getByTestId('rick-component')).toBeInTheDocument()
    expect(screen.getByTestId('harry-component')).toBeInTheDocument()
    expect(screen.getByTestId('grid-container')).toBeInTheDocument()
  })

  it('renders Header component with toggle language functionality', () => {
    render(<App />)
    
    const toggleButton = screen.getByTestId('toggle-language-btn')
    expect(toggleButton).toBeInTheDocument()
  })

  it('renders Rick and Harry components with initial language', () => {
    render(<App />)
    
    expect(screen.getByTestId('rick-component')).toHaveTextContent('Rick Component - Language: es')
    expect(screen.getByTestId('harry-component')).toHaveTextContent('Harry Component - Language: es')
  })

  it('passes language prop to both Rick and Harry components', () => {
    render(<App />)
    
    const rickComponent = screen.getByTestId('rick-component')
    const harryComponent = screen.getByTestId('harry-component')
    
    expect(rickComponent).toHaveTextContent('Language: es')
    expect(harryComponent).toHaveTextContent('Language: es')
  })

  it('toggles language when toggle button is clicked', async () => {
    render(<App />)
    
    const toggleButton = screen.getByTestId('toggle-language-btn')
    
    expect(screen.getByTestId('rick-component')).toHaveTextContent('Language: es')
    expect(screen.getByTestId('harry-component')).toHaveTextContent('Language: es')
    
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('rick-component')).toHaveTextContent('Language: en')
      expect(screen.getByTestId('harry-component')).toHaveTextContent('Language: en')
    })
    
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('rick-component')).toHaveTextContent('Language: es')
      expect(screen.getByTestId('harry-component')).toHaveTextContent('Language: es')
    })
  })
})
