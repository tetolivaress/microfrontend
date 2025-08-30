import { useQuery } from '@tanstack/react-query'
import { getCharacters } from '@services/characters'

export const useGetCharacters = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters'],
    queryFn: () => getCharacters(),
  })

  return { data, isLoading, error }
}
