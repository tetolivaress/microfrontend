import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharacterItem from './index'
import { mockCharacter, mockDeadCharacter, mockAlienCharacter } from '../../../mocks/characters'

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

describe('CharacterItem Component', () => {
  it('renders character information correctly', () => {
    render(<CharacterItem character={mockCharacter} />)
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Species')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    
    const image = screen.getByAltText('Rick Sanchez')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCharacter.image)
  })

  it('renders alien character correctly', () => {
    render(<CharacterItem character={mockAlienCharacter} />)
    
    expect(screen.getByText('Summer Smith')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Alien')).toBeInTheDocument()
    
    const image = screen.getByAltText('Summer Smith')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockAlienCharacter.image)
  })

  it('displays character with all required fields', () => {
    render(<CharacterItem character={mockCharacter} />)
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument()
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Species')).toBeInTheDocument()
  })

  it('translates status values correctly', () => {
    render(<CharacterItem character={mockDeadCharacter} />)
    expect(screen.getByText('Dead')).toBeInTheDocument()
  })

  it('translates species values correctly', () => {
    render(<CharacterItem character={mockAlienCharacter} />)
    
    expect(screen.getByText('Alien')).toBeInTheDocument()
  })

  it('handles character with unknown status', () => {
    const unknownCharacter = {
      ...mockCharacter,
      name: 'Unknown Character',
      status: 'unknown' as const
    }
    
    render(<CharacterItem character={unknownCharacter} />)
    
    expect(screen.getByText('Unknown Character')).toBeInTheDocument()
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })
})
