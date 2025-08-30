import { StyledTitleContainer, StyledTitle } from './styles'

const Title = ({ children }: { children: React.ReactNode }) => {
  return <StyledTitleContainer>
    <StyledTitle>{children}</StyledTitle>
  </StyledTitleContainer>
}

export default Title