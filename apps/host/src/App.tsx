import Rick from './components/Rick'
import Harry from './components/Harry'
import styled from 'styled-components'
import Header from './components/Header'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 48px;
`
function App() {
  return (
    <>
    <Header />
    <Grid>
    <Rick />
    <Harry />
    </Grid>
    </>
  )
}

export default App
