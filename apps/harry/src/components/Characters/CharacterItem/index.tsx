import type { Character } from "../../../services/characters";
import { StyledCharacterItem, StyledCharacterImage, StyledCharacterTitle } from "./styles";
import Portrait from "../../../assets/portrait.png";

const CharacterItem = ({ character }: { character: Character }) => {
  const image = character.image || Portrait;
  
  return (
    <StyledCharacterItem>
      <StyledCharacterImage src={image} alt={character.name} />
      <StyledCharacterTitle>Nombre</StyledCharacterTitle>
      <p>{character.name}</p>
      <StyledCharacterTitle>Actor</StyledCharacterTitle>
      <p>{character.actor}</p>
      <StyledCharacterTitle>Casa</StyledCharacterTitle>
      <p>{character.house}</p>
    </StyledCharacterItem>
  )
}

export default CharacterItem
