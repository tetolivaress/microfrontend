import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharacterItem from './index'
import { mockCharacter } from '../../../mocks/characters'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'character.name': 'Name',
        'character.actor': 'Actor',
        'character.house': 'House'
      }
      return translations[key] || key
    }
  })
}))

describe('CharacterItem Component', () => {
  it('renders character information correctly', () => {
    render(<CharacterItem character={mockCharacter} />)
    
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Actor')).toBeInTheDocument()
    expect(screen.getByText('House')).toBeInTheDocument()
    
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument()
    
    expect(screen.getByText('Gryffindor')).toBeInTheDocument()
    
    const image = screen.getByAltText('Harry Potter')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCharacter.image)
  })

  it('renders all required elements with proper structure', () => {
    render(<CharacterItem character={mockCharacter} />)
    
    const nameSection = screen.getByText('Name').closest('div')
    const actorSection = screen.getByText('Actor').closest('div')
    const houseSection = screen.getByText('House').closest('div')
    
    expect(nameSection).toBeInTheDocument()
    expect(actorSection).toBeInTheDocument()
    expect(houseSection).toBeInTheDocument()
    
    expect(nameSection).toHaveTextContent('Harry Potter')
    expect(actorSection).toHaveTextContent('Daniel Radcliffe')
    expect(houseSection).toHaveTextContent('Gryffindor')
  })

  it('handles character image correctly', () => {
    render(<CharacterItem character={mockCharacter} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockCharacter.image)
    expect(image).toHaveAttribute('alt', mockCharacter.name)
  })

  it('handles character without image by using default portrait', () => {
    const characterWithoutImage = { ...mockCharacter, image: '' }
    render(<CharacterItem character={characterWithoutImage} />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', mockCharacter.name)
  })

  it('displays character with all required fields', () => {
    render(<CharacterItem character={mockCharacter} />)
    
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument()
    expect(screen.getByText('Gryffindor')).toBeInTheDocument()
    
    expect(screen.getByAltText('Harry Potter')).toBeInTheDocument()
  })
})
