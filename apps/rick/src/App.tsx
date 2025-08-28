import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { getCharacters } from './services/characters'


function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters'],
    queryFn: () => getCharacters(),
    // retry: false
  })

  const CharacterList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `

  const CharacterItem = styled.div`
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  `

  return <CharacterList>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    {data?.results.map((character: any) => (
      <CharacterItem key={character.id}>{character.name}</CharacterItem>
    ))}
  </CharacterList>
}

export default App
