import { useEffect, useRef } from 'react'

import { mount } from 'rick/App'

const Rick = ({ language }: { language: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mount(ref.current, { language })
    }
  }, [language])

  return <div ref={ref} />

}

export default Rick
