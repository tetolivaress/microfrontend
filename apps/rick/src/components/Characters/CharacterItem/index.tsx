import type { CharactersResult } from "../../../services/characters";
import { StyledCharacterItem, StyledCharacterImage, StyledCharacterTitle } from "./styles";
import { useTranslation } from 'react-i18next';

const CharacterItem = ({ character }: { character: CharactersResult }) => {
  const { t } = useTranslation();
  return (
    <StyledCharacterItem>
      <StyledCharacterImage src={character.image} alt={character.name} />
      <StyledCharacterTitle>{t('character.name')}</StyledCharacterTitle>
      <p>{character.name}</p>
      <StyledCharacterTitle>{t('character.status')}</StyledCharacterTitle>
      <p>{t(`character.${character.status.toLowerCase()}`)}</p>
      <StyledCharacterTitle>{t('character.species')}</StyledCharacterTitle>
      <p>{t(`character.${character.species.toLowerCase()}`)}</p>
    </StyledCharacterItem>
  )
}

export default CharacterItem