import { ThemeProvider } from 'styled-components'
import { Theme } from './Theme'
import { useTranslation } from 'react-i18next'
import RickScreen from './screens/RickScreen'
import { useEffect } from 'react'
import './config/i18n'

function App({ language }: { language: string }) {  
  const { i18n } = useTranslation()
  
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])
  
  return (
    <ThemeProvider theme={Theme}>
      <RickScreen />
    </ThemeProvider>
  )
}

export default App
