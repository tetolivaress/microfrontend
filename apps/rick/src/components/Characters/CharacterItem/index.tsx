import type { CharactersResult } from "../../../services/characters";
import { StyledCharacterItem, StyledCharacterImage, StyledCharacterTitle } from "./styles";
import { useTranslation } from 'react-i18next';

const CharacterItem = ({ character }: { character: CharactersResult }) => {
  const { t } = useTranslation();
  return (
    <StyledCharacterItem>
      <StyledCharacterImage src={character.image} alt={character.name} />
      <p>
        <StyledCharacterTitle>{t('character.name')}</StyledCharacterTitle>
        <span>{character.name}</span>
      </p>
      <p>
        <StyledCharacterTitle>{t('character.status')}</StyledCharacterTitle>
        <span>{t(`character.${character.status.toLowerCase()}`)}</span>
      </p>
      <p>
      <StyledCharacterTitle>{t('character.species')}</StyledCharacterTitle>
        <span>{t(`character.${character.species.toLowerCase()}`)}</span>
      </p>
    </StyledCharacterItem>
  )
}

export default CharacterItem