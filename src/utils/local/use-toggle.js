import { useState, useCallback } from 'react'

function useToggle (defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const toggle = useCallback(() => setValue((val) => !val), [])

  return [value, toggle]
}

export default useToggle