import { useState, useCallback } from 'react'

function useToggle (defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const toggle = useCallback((override) => {
    setValue((currentValue) => {
      return override ?? !currentValue
    })
  }, [])

  return [value, toggle]
}

export default useToggle