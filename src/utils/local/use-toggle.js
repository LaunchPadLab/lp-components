import { useState, useCallback } from 'react'

function useToggle (defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const toggle = useCallback((override) => {
    setValue((currentValue) => {
      // default behavior should set the opposite value
      if (override === undefined) return !currentValue

      return Boolean(override)
    })
  }, [])

  return [value, toggle]
}

export default useToggle