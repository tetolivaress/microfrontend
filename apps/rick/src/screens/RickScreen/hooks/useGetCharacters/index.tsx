import { useInfiniteQuery } from '@tanstack/react-query'
import { getCharacters } from '../../../../services/characters'

export const useGetCharacters = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam }) => getCharacters({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined
      const url = new URL(lastPage.info.next)
      const nextPage = url.searchParams.get('page')
      return nextPage ? parseInt(nextPage, 10) : undefined
    }
  })

  const allCharacters = data?.pages.flatMap(page => page.results) || []


  return {
    data,
    isLoading,
    error,
    loadMore: fetchNextPage,
    hasNextPage,
    allCharacters
  }
}