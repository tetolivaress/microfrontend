import { rickDB } from "../apis"

export const getCharacters = async () => {
  const response = await rickDB.get('/characters')
  return response.data
}