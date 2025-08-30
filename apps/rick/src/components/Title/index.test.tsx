import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Title from './index'
import { type ReactNode } from 'react'

// Mock the styled components to avoid theme provider issues in tests
vi.mock('./styles', () => ({
  StyledTitleContainer: ({ children }: { children: ReactNode }) => 
    <div data-testid="styled-title-container">{children}</div>,
  StyledTitle: ({ children }: { children: ReactNode }) => 
    <span data-testid="styled-title">{children}</span>
}))

describe('Title Component', () => {
  it('renders correctly with children text', () => {
    render(<Title>Test Title</Title>)
    
    const container = screen.getByTestId('styled-title-container')
    const titleSpan = screen.getByTestId('styled-title')
    
    expect(container).toBeInTheDocument()
    expect(titleSpan).toBeInTheDocument()
    expect(titleSpan).toHaveTextContent('Test Title')
  })

  it('renders correctly with React elements as children', () => {
    render(
      <Title>
        <strong>Bold Title</strong>
      </Title>
    )
    
    const container = screen.getByTestId('styled-title-container')
    const titleSpan = screen.getByTestId('styled-title')
    
    expect(container).toBeInTheDocument()
    expect(titleSpan).toBeInTheDocument()
  })
})
