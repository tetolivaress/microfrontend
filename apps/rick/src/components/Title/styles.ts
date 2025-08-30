import styled from 'styled-components'

export const StyledTitleContainer = styled.div`
  font-size: ${({ theme }) => theme.text.fontSize};
  font-weight: ${({ theme }) => theme.text.fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin-bottom: 1rem;
  min-height: 40px;
`

export const StyledTitle = styled.span`
  font-weight: bold;
`
