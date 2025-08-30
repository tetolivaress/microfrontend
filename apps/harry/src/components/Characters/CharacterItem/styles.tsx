import styled from 'styled-components'

export const StyledCharacterItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.padding};
  border-radius: ${({ theme }) => theme.borderRadius};
`

export const StyledCharacterImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`

export const StyledCharacterDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`

export const StyledCharacterTitle = styled.span`
  font-weight: bold;
`

export const StyledCharacterItemHover = styled(StyledCharacterItemContainer)`
  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`

export const StyledCharacterItem = StyledCharacterItemHover
