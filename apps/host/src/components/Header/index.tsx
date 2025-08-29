import { useTranslation } from 'react-i18next'
import Button from '../Button'
import { StyledHeaderContainer, StyledHeaderTitle } from './styles'


const Header = ({ onToggleLanguage }: { onToggleLanguage: () => void }) => {
  const { t } = useTranslation()
  return <StyledHeaderContainer>
    <StyledHeaderTitle>{t('header.title')}</StyledHeaderTitle>
    <Button onClick={onToggleLanguage}>{t('header.toggleLanguage')}</Button>
  </StyledHeaderContainer>
}

export default Header