import styled from "styled-components";

export const StyledButtonContainer = styled.button`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const StyledButton = StyledButtonContainer