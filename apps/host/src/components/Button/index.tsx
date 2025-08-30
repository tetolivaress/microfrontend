import { StyledButton } from './styles'
import TranslationIcon from '@assets/translate.svg?react'

const Button = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  return <StyledButton onClick={onClick}>
    <TranslationIcon />
    {children}
  </StyledButton>
}

export default Button
