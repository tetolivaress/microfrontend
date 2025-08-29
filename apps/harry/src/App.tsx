import HarryScreen from './screens/HarryScreen'
import { useEffect } from 'react'
import './config/i18n'
import { useTranslation } from 'react-i18next'

function App({ language }: { language: string }) {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])
  
  return <HarryScreen />
}

export default App
