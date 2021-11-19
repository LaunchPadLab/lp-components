import { castArray, has } from '../../utils'

// Get column info from children via props
function getColumnData(children = [], doDisable) {
  const childrenArray = castArray(children)
  return childrenArray
    .filter((child) => has(child, 'props'))
    .map(({ props }) => {
      // If sort is disabled, disable all columns
      const disabled = doDisable || props.disabled || false
      return { ...props, disabled }
    })
}

export default getColumnData
