import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './index'
import { type ReactNode } from 'react';

vi.mock('./styles', () => ({
  StyledButton: ({ children, onClick }: { children: ReactNode; onClick: () => void }) => 
    <button data-testid="styled-button" onClick={onClick}>{children}</button>
}))

describe('Button Component', () => {
  it('renders correctly with children text', () => {
    render(<Button onClick={() => {}}>Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})