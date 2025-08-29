import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components'
import { getCharacters, type Character } from './services/characters';
import Portrait from './assets/portrait.png';

function App() {
  const [showCharacters, setShowCharacters] = useState(false);
  const toggleCharacters = () => {
    setShowCharacters(!showCharacters);
  }

  const image = (character: Character) => {
    if (character.image) {
      return character.image;
    }
    return Portrait;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters'],
    queryFn: () => getCharacters(),
    // retry: false
  })

  const CharacterList = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `

  const CharacterItem = styled.div`
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  `

  const CharacterImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
  `

  const Button = styled.button`
    background-color: #f0f0f0;
    border: none;
    padding: 0.5rem;
    border-radius: 0.5rem;
  `

  const Title = styled.p`
    font-weight: bold;
  `

  if (!showCharacters) {
    return <Button onClick={toggleCharacters}>Show Characters</Button>
  }

  return <CharacterList>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    {data?.map((character) => (
      <CharacterItem key={character.id}>
        <CharacterImage src={image(character)} alt={character.name} />
        <Title>Nombre: </Title><p>{character.name}</p>
        <Title>Actor: </Title><p>{character.actor}</p>
        <Title>Casa: </Title><p>{character.house}</p>
      </CharacterItem>
    ))}
  </CharacterList>


}

export default App
