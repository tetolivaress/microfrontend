import { useEffect, useRef } from 'react'

import { mount } from 'rick/App'

const Rick = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mount(ref.current)
    }
  }, [])

  return <div ref={ref} />
}

export default Rick
