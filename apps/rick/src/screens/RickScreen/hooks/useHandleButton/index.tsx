import { useState } from 'react'

export const useHandleButton = () => {
  const [showCharacters, setShowCharacters] = useState(false)

  const toggleCharacters = () => {
    setShowCharacters(!showCharacters)
  }

  return { showCharacters, toggleCharacters }
}