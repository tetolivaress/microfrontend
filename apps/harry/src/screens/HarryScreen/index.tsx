import { useGetCharacters, useHandleButton } from './hooks'
import { Button, CharactersList } from '../../components'

const HarryScreen = () => {
  const { toggleCharacters, showCharacters } = useHandleButton()
  const { data, isLoading, error } = useGetCharacters()

  if (!showCharacters) {
    return <Button onClick={toggleCharacters}>Show Characters</Button>
  }

  return (
    <>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error?.message}</div>}
    <CharactersList show={showCharacters} characters={data || []} />
    </>
  )
}

export default HarryScreen
