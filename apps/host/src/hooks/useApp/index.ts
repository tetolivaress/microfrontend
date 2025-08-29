import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export const useApp = () => {
  const [language, setLanguage] = useState('es')
  const { i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es'
    setLanguage(newLanguage)
  }

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  return { language, toggleLanguage }
}