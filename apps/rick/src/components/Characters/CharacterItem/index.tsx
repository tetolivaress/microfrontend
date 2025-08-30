import type { CharactersResult } from "../../../services/characters";
import { StyledCharacterItem, StyledCharacterImage, StyledCharacterDescription, StyledCharacterTitle } from "./styles";
import { useTranslation } from 'react-i18next';

const CharacterItem = ({ character }: { character: CharactersResult }) => {
  const { t } = useTranslation();
  return (
    <StyledCharacterItem>
      <StyledCharacterImage src={character.image} alt={character.name} />
      <StyledCharacterDescription>
        <StyledCharacterTitle>{t('character.name')}</StyledCharacterTitle>
        <span>{character.name}</span>
      </StyledCharacterDescription>
      <StyledCharacterDescription>
        <StyledCharacterTitle>{t('character.status')}</StyledCharacterTitle>
        <span>{t(`character.${character.status.toLowerCase()}`)}</span>
      </StyledCharacterDescription>
      <StyledCharacterDescription>
        <StyledCharacterTitle>{t('character.species')}</StyledCharacterTitle>
        <span>{t(`character.${character.species.toLowerCase()}`)}</span>
      </StyledCharacterDescription>
    </StyledCharacterItem>
  )
}

export default CharacterItem