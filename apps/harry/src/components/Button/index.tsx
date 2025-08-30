import { StyledButton } from './styles'
import CloudIcon from '@assets/cloud.svg?react'

const Button = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  return <StyledButton onClick={onClick}>
    <CloudIcon />
    {children}
  </StyledButton>
}

export default Button
