import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock react-i18next
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
