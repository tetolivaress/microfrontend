import type { CharactersResult, Status, Species, Gender } from '@types'

export const mockCharacter: CharactersResult = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive' as Status,
  species: 'Human' as Species,
  type: '',
  gender: 'Male' as Gender,
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1'
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3'
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2'
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: new Date('2017-11-04T18:48:46.250Z')
}

export const mockDeadCharacter: CharactersResult = {
  ...mockCharacter,
  id: 2,
  name: 'Morty Smith',
  status: 'Dead' as Status,
  species: 'Human' as Species,
  gender: 'Male' as Gender,
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
}

export const mockAlienCharacter: CharactersResult = {
  ...mockCharacter,
  id: 3,
  name: 'Summer Smith',
  status: 'Alive' as Status,
  species: 'Alien' as Species,
  gender: 'Female' as Gender,
  image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
}

export const mockCharacters: CharactersResult[] = [
  mockCharacter,
  mockDeadCharacter,
  mockAlienCharacter
]
