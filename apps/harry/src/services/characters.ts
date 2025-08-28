import { harryDB } from "../apis"

export const getCharacters = async () => {
  const response = await harryDB.get('/characters')
  return response.data
}