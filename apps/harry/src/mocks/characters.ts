import { type Character } from '../services/characters'

export const mockCharacter: Character = {
  id: '1',
  name: 'Harry Potter',
  alternate_names: ['The Boy Who Lived'],
  species: 'human',
  gender: 'male',
  house: 'Gryffindor',
  dateOfBirth: '31-07-1980',
  yearOfBirth: 1980,
  wizard: true,
  ancestry: 'half-blood',
  eyeColour: 'green',
  hairColour: 'black',
  wand: {
    wood: 'holly',
    core: 'phoenix feather',
    length: 11,
  },
  patronus: 'stag',
  hogwartsStudent: true,
  hogwartsStaff: false,
  actor: 'Daniel Radcliffe',
  alternate_actors: [],
  alive: true,
  image: 'https://example.com/harry.jpg',
}

export const mockCharacters: Character[] = [
  mockCharacter,
  {
    ...mockCharacter,
    id: '2',
    name: 'Hermione Granger',
    actor: 'Emma Watson',
  },
]
