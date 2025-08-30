import { useGetCharacters, useHandleButton } from './hooks'
import { Button, CharactersList } from '@components'
import { useTranslation } from 'react-i18next'

const HarryScreen = () => {
  const { toggleCharacters, showCharacters } = useHandleButton()
  const { data, isLoading, error } = useGetCharacters()
  const { t } = useTranslation()

  if (!showCharacters) {
    return <Button onClick={toggleCharacters}>{t('buttons.showCharacters')}</Button>
  }

  return (
    <>
    {isLoading && <div>Loading...</div>}
    {error && <div>{t('error', { message: error?.message })}</div>}
    <CharactersList show={showCharacters} characters={data || []} />
    </>
  )
}

export default HarryScreen
