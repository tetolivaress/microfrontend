import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

const HeaderTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
`

const Header = () => {
  return <HeaderContainer>
    <HeaderTitle>Rick Morty & Harry Potter</HeaderTitle>
  </HeaderContainer>
}

export default Header