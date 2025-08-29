import Rick from './components/Rick'
import Harry from './components/Harry'
import styled from 'styled-components'
import Header from './components/Header'
import { useApp } from './hooks'
import './config/i18n'


export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 48px;
`

function App() {
  const { language, toggleLanguage } = useApp()

  return (
    <>
      <Header onToggleLanguage={toggleLanguage} />
      <Grid>
        <Rick language={language} />
        <Harry language={language} />
      </Grid>
    </>
  )
}

export default App
