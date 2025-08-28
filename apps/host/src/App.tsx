import Rick from './components/Rick'
import Harry from './components/Harry'
import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`
function App() {
  return (
    <Grid>
    {/* <h1>Host</h1> */}
    <Rick />
    <Harry />
    </Grid>
  )
}

export default App
