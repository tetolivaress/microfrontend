import { harryDB } from "@apis"
import { API_ENDPOINTS } from "@constants"
import type { Character } from "@types"

export const getCharacters = async () => {
  const response = await harryDB.get<Character[]>(API_ENDPOINTS.CHARACTERS)
  return response.data
}