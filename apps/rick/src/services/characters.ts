import { rickDB } from '@apis'
import { API_ENDPOINTS } from '@constants'
import type { Characters } from '@types'


export const getCharacters = async ({ page }: { page: number }) => {
  const response = await rickDB.get<Characters>(API_ENDPOINTS.CHARACTER, { params: { page } })
  return response.data
}