import { useEffect, useRef } from 'react'

import { mount } from 'rick/App'
import { StyledCenterContainer } from '../../Theme'

const Rick = ({ language }: { language: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mount(ref.current, { language })
    }
  }, [language])

  return <StyledCenterContainer ref={ref} />

}

export default Rick
