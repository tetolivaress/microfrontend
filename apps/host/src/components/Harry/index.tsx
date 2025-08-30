import { useEffect, useRef } from 'react'

import { mount } from 'harry/App'
import { StyledCenterContainer } from '../../Theme'

const Harry = ({ language }: { language: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mount(ref.current, { language })
    }
  }, [language])

  return <StyledCenterContainer ref={ref} />
}

export default Harry
