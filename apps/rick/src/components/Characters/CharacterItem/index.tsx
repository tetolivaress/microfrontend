import type { CharactersResult } from "../../../services/characters";
import { StyledCharacterItem, StyledCharacterImage, StyledCharacterTitle } from "./styles";

const CharacterItem = ({ character }: { character: CharactersResult }) => {
  return (
    <StyledCharacterItem>
      <StyledCharacterImage src={character.image} alt={character.name} />
      <StyledCharacterTitle>Nombre</StyledCharacterTitle>
      <p>{character.name}</p>
      <StyledCharacterTitle>Estatus</StyledCharacterTitle>
      <p>{character.status}</p>
      <StyledCharacterTitle>Especie</StyledCharacterTitle>
      <p>{character.species}</p>
    </StyledCharacterItem>
  )
}

export default CharacterItem