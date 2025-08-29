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
      <p>
        <StyledCharacterTitle>{t('character.name')}</StyledCharacterTitle>
        <span>{character.name}</span>
      </p>
      <p>
        <StyledCharacterTitle>{t('character.actor')}</StyledCharacterTitle>
        <span>{character.actor}</span>
      </p>
      <p>
        <StyledCharacterTitle>{t('character.house')}</StyledCharacterTitle>
        <span>{character.house}</span>
      </p>
    </StyledCharacterItem>
  )
}

export default CharacterItem
