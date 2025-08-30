import { ThemeProvider } from 'styled-components'
import { Theme } from './Theme'
import Rick from './components/Rick'
import Harry from './components/Harry'
import Header from './components/Header'
import { useApp } from './hooks'
import './config/i18n'
import { Grid } from './Theme'

function App() {
  const { language, toggleLanguage } = useApp()

  return (
    <ThemeProvider theme={Theme}>
      <Header onToggleLanguage={toggleLanguage} />
      <Grid>
        <Rick language={language} />
        <Harry language={language} />
      </Grid>
    </ThemeProvider>
  )
}

export default App
