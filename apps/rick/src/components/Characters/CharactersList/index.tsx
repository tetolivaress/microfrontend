import type { CharactersResult } from "@services/characters";
import { StyledCharacterList } from "./styles";
import CharacterItem from "../CharacterItem";

const CharactersList = ({ characters, show }: { characters: CharactersResult[], show: boolean }) => {
  if (!show) return null
  return (
    <StyledCharacterList>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </StyledCharacterList>
  )
}
export default CharactersList