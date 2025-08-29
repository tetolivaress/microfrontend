import type { Character } from "../../../services/characters";
import { StyledCharacterItem, StyledCharacterImage, StyledCharacterTitle } from "./styles";
import Portrait from "../../../assets/portrait.png";
import { useTranslation } from 'react-i18next';

const CharacterItem = ({ character }: { character: Character }) => {
  const image = character.image || Portrait;
  const { t } = useTranslation();
  
  return (
    <StyledCharacterItem>
      <StyledCharacterImage src={image} alt={character.name} />
      <StyledCharacterTitle>{t('character.name')}</StyledCharacterTitle>
      <p>{character.name}</p>
      <StyledCharacterTitle>{t('character.actor')}</StyledCharacterTitle>
      <p>{character.actor}</p>
      <StyledCharacterTitle>{t('character.house')}</StyledCharacterTitle>
      <p>{character.house}</p>
    </StyledCharacterItem>
  )
}

export default CharacterItem
