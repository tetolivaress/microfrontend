import { useEffect, useRef } from 'react'

import { mount } from 'harry/App'

const Harry = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mount(ref.current)
    }
  }, [])

  return <div ref={ref} />
}

export default Harry
