import { useGetCharacters, useHandleButton } from './hooks'
import { Button, CharactersList } from '../../components'


const RickScreen = () => {
  const { toggleCharacters, showCharacters } = useHandleButton()
  const { data, isLoading, error } = useGetCharacters()

  // const RenderCharacters =
  //   showCharacters
  //     ? <CharactersList characters={data?.results} />
  //     : <Button onClick={toggleCharacters}>Show Characters</Button>

  if (!showCharacters) {
    return <Button onClick={toggleCharacters}>Show Characters</Button>
  }

  return (
    <>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error?.message}</div>}
    <CharactersList show={showCharacters} characters={data?.results || []} />
    </>
  )
}

export default RickScreen