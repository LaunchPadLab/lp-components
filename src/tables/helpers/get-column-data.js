
// Get column info from children via props
function getColumnData (children=[], doDisable) {
  const childrenArray = Array.isArray(children) ? children : [children]
  return childrenArray.map(({ props }) => {
    // If sort is disabled, disable all columns
    const disabled = doDisable || props.disabled || false
    return { ...props, disabled }
  })
}

export default getColumnData