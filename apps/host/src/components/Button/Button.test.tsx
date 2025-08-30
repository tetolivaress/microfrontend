import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { describe, it, expect, vi } from 'vitest'
import Button from './index'
import { Theme } from '../../Theme'

// Mock styled-components theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={Theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Button Component', () => {
  it('renders button with children text', () => {
    const mockOnClick = vi.fn()
    
    renderWithTheme(
      <Button onClick={mockOnClick}>
        Click me
      </Button>
    )
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('calls onClick handler when clicked', () => {
    const mockOnClick = vi.fn()
    
    renderWithTheme(
      <Button onClick={mockOnClick}>
        Test Button
      </Button>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick handler multiple times when clicked multiple times', () => {
    const mockOnClick = vi.fn()
    
    renderWithTheme(
      <Button onClick={mockOnClick}>
        Test Button
      </Button>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })

  it('renders with React elements as children', () => {
    const mockOnClick = vi.fn()
    
    renderWithTheme(
      <Button onClick={mockOnClick}>
        <span>Icon</span>
        <span>Button Text</span>
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Button Text')).toBeInTheDocument()
  })

  it('renders with string and number children', () => {
    const mockOnClick = vi.fn()
    
    renderWithTheme(
      <Button onClick={mockOnClick}>
        Count: {42}
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Count: 42')
  })
})
