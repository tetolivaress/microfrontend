import { rickDB } from '@apis'
import { API_ENDPOINTS } from '@constants'

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


export const getCharacters = async ({ page }: { page: number }) => {
  const response = await rickDB.get<Characters>(API_ENDPOINTS.CHARACTER, { params: { page } })
  return response.data
}