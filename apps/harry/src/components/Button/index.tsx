import { StyledButton } from './styles'

const Button = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button
