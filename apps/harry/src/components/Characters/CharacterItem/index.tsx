import type { Character } from "../../../services/characters";
import { StyledCharacterItemContainer, StyledCharacterImage, StyledCharacterDescription, StyledCharacterTitle } from "./styles";
import Portrait from "../../../assets/portrait.png";
import { useTranslation } from 'react-i18next';

const CharacterItem = ({ character }: { character: Character }) => {
  const image = character.image || Portrait;
  const { t } = useTranslation();
  
  return (
    <StyledCharacterItemContainer>
      <StyledCharacterImage src={image} alt={character.name} />
      <StyledCharacterDescription>
        <StyledCharacterTitle>{t('character.name')}</StyledCharacterTitle>
        <span>{character.name}</span>
      </StyledCharacterDescription>
      <StyledCharacterDescription>
        <StyledCharacterTitle>{t('character.actor')}</StyledCharacterTitle>
        <span>{character.actor}</span>
      </StyledCharacterDescription>
      <StyledCharacterDescription>
        <StyledCharacterTitle>{t('character.house')}</StyledCharacterTitle>
        <span>{character.house}</span>
      </StyledCharacterDescription>
    </StyledCharacterItemContainer>
  )
}

export default CharacterItem
