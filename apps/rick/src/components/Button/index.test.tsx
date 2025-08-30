import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './index'

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

  it('renders with different children content', () => {
    render(<Button onClick={() => {}}>Submit Form</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Submit Form')
  })

  it('calls onClick handler multiple times when clicked multiple times', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Multi Click</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(3)
  })
})
