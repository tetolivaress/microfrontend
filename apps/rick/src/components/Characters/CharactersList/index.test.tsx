import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharactersList from './index'
import { mockCharacter, mockCharacters } from '../../../mocks/characters'

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

describe('CharactersList Component', () => {
  // it('renders list of characters when show is true', () => {
  //   render(<CharactersList characters={mockCharacters} show={true} />)
    
  //   // Check that all characters are rendered
  //   expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
  //   expect(screen.getByText('Morty Smith')).toBeInTheDocument()
  //   expect(screen.getByText('Summer Smith')).toBeInTheDocument()
    
  //   // Check that character details are displayed
  //   expect(screen.getByText('Alive')).toBeInTheDocument()
  //   expect(screen.getByText('Dead')).toBeInTheDocument()
  //   expect(screen.getByText('Human')).toBeInTheDocument()
  //   expect(screen.getByText('Alien')).toBeInTheDocument()
  // })

  it('does not render anything when show is false', () => {
    const { container } = render(<CharactersList characters={mockCharacters} show={false} />)
    
    // Component should return null, so container should be empty
    expect(container.firstChild).toBeNull()
    
    // Characters should not be in the document
    expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument()
    expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument()
    expect(screen.queryByText('Summer Smith')).not.toBeInTheDocument()
  })

  it('renders empty list when characters array is empty and show is true', () => {
    const { container } = render(<CharactersList characters={[]} show={true} />)
    
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.childNodes).toHaveLength(0)
  })

  it('renders single character correctly', () => {
    render(<CharactersList characters={[mockCharacter]} show={true} />)
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    
    expect(screen.getAllByText('Name')).toHaveLength(1)
    expect(screen.getAllByText('Status')).toHaveLength(1)
    expect(screen.getAllByText('Species')).toHaveLength(1)
  })
  it('handles edge case with show false and empty characters', () => {
    const { container } = render(<CharactersList characters={[]} show={false} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('renders correct number of character items', () => {
    render(<CharactersList characters={mockCharacters} show={true} />)
    
    expect(screen.getAllByText('Name')).toHaveLength(3)
    expect(screen.getAllByText('Status')).toHaveLength(3)
    expect(screen.getAllByText('Species')).toHaveLength(3)
  })
})
