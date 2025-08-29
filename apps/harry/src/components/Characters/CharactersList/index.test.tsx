import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharactersList from './index'
import { mockCharacter, mockCharacters } from '../../../mocks/characters'

// Mock react-i18next for CharacterItem component
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

describe('CharactersList Component', () => {
  it('renders list of characters when show is true', () => {
    render(<CharactersList characters={mockCharacters} show={true} />)
    
    // Check that both characters are rendered
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
    
    // Check that character details are displayed
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument()
    expect(screen.getByText('Emma Watson')).toBeInTheDocument()
  })

  it('does not render anything when show is false', () => {
    const { container } = render(<CharactersList characters={mockCharacters} show={false} />)
    
    // Component should return null, so container should be empty
    expect(container.firstChild).toBeNull()
    
    // Characters should not be in the document
    expect(screen.queryByText('Harry Potter')).not.toBeInTheDocument()
    expect(screen.queryByText('Hermione Granger')).not.toBeInTheDocument()
  })

  it('renders empty list when characters array is empty and show is true', () => {
    const { container } = render(<CharactersList characters={[]} show={true} />)
    
    // Should render the styled container but with no children
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.childNodes).toHaveLength(0)
  })

  it('renders single character correctly', () => {
    render(<CharactersList characters={[mockCharacter]} show={true} />)
    
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument()
    expect(screen.getByText('Gryffindor')).toBeInTheDocument()
    
    // Should only have one character item
    expect(screen.getAllByText('Name')).toHaveLength(1)
  })


  it('passes correct character prop to each CharacterItem', () => {
    render(<CharactersList characters={mockCharacters} show={true} />)
    
    // Verify that each character's unique data is displayed
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument()
    expect(screen.getByText('Emma Watson')).toBeInTheDocument()
  })

  it('handles edge case with show false and empty characters', () => {
    const { container } = render(<CharactersList characters={[]} show={false} />)
    
    expect(container.firstChild).toBeNull()
  })
})
