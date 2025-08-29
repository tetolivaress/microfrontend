import Rick from './components/Rick'
import Harry from './components/Harry'
import styled from 'styled-components'
import Header from './components/Header'
import { useState, useEffect } from 'react'
import './config/i18n'
import { useTranslation } from 'react-i18next'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 48px;
`

function App() {
  const [language, setLanguage] = useState('es')
  const { i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es'
    setLanguage(newLanguage)
  }

  // Sync language with i18n
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

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
