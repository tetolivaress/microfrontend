import { rickDB } from '../apis'

export interface Characters {
  info:    Info;
  results: CharactersResult[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

export interface CharactersResult {
  id:       number;
  name:     string;
  status:   Status;
  species:  Species;
  type:     string;
  gender:   Gender;
  origin:   Location;
  location: Location;
  image:    string;
  episode:  string[];
  url:      string;
  created:  Date;
}

export type Gender = 'Female' | 'Male' | 'unknown';

export type Species = 'Alien' | 'Human';

export type Status = 'Alive' | 'Dead' | 'unknown';

export interface Location {
  name: string;
  url:  string;
}


export const getCharacters = async () => {
  const response = await rickDB.get<Characters>('/character')
  return response.data
}