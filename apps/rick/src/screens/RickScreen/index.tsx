import { useGetCharacters, useHandleButton } from './hooks'
import { Button, CharactersList } from '@components'
import { useTranslation } from 'react-i18next'
import Title from '@components/Title'


const RickScreen = () => {
  const { t } = useTranslation()
  const { toggleCharacters, showCharacters } = useHandleButton()
  const { allCharacters, isLoading, error, loadMore } = useGetCharacters()


  if (!showCharacters) {
    return <Button onClick={toggleCharacters}>{t('buttons.showCharacters')}</Button>
  }

  return (
    <>
    <Title>{t('title')}</Title>
    {isLoading && <div>{t('loading')}</div>}
    {error && <div>{t('error', { message: error?.message })}</div>}
      <CharactersList show={showCharacters} characters={allCharacters || []} />
      <Button onClick={loadMore}>{t('character.loadMore')}</Button>
    </>
  )
}

export default RickScreen