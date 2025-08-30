import styled from 'styled-components'

export const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.padding};
  background-color: ${({ theme }) => theme.colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`
export const StyledHeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.text.fontSize};
  font-weight: ${({ theme }) => theme.text.fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`