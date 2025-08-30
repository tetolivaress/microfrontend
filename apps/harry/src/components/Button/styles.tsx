import styled from 'styled-components'

export const StyledButtonContainer = styled.button`
  background-color: ${({ theme }) => theme.button.colors.secondary};
  border: none;
  padding: ${({ theme }) => theme.padding};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`

export const StyledButtonText = styled.span`
  font-size: ${({ theme }) => theme.text.fontSize};
  font-weight: ${({ theme }) => theme.text.fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`

export const StyledButtonHover = styled(StyledButtonContainer)`
  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`

export const StyledButton = StyledButtonContainer