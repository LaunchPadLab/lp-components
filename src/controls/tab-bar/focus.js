const PERTINENT_KEY_CODES = {
  DOWN: '40',
  UP: '38',
  HOME: '36',
  END: '35',
  LEFT: '37',
  RIGHT: '39',
}

function getClosestTabList (el) {
  return el && (el.matches('[role="tablist"]') ? el : getClosestTabList(el.parentElement))
}

function isTabControl (el) {
  return el && el.matches('[role="tab"]')
}

function focusNextControl (control, direction) {
  const tabList = getClosestTabList(control)
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'))
  const currentIndex = tabs.indexOf(control)
  
  if (currentIndex === -1) return
  
  const newIndex = getSafeIndex(tabs.length, currentIndex + 1*direction)
  tabs[newIndex].focus()
}

function focusExtremeControl (control, top=true) {
  const tabList = getClosestTabList(control)
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'))
  
  top ? tabs[0].focus() : tabs[tabs.length - 1].focus()
}

function getSafeIndex (length, newIndex) {
  const maxIndex = length - 1
  
  if (newIndex < 0) return getSafeIndex(length, length + newIndex)
  if (newIndex > maxIndex) return getSafeIndex(length, length - newIndex)
  
  return newIndex
}

function createFocusListener (vertical) {
  return function manageFocus (e) {
    // If not activated while on a tab, then ignore
    if (!isTabControl(e.target)) return
    
    const key = (e.which || e.keyCode || '').toString()
    switch (key) {
      case PERTINENT_KEY_CODES.DOWN:
      case PERTINENT_KEY_CODES.UP: {
        if (!vertical) break
        
        e.preventDefault()
        const direction = (key === PERTINENT_KEY_CODES.DOWN) ? 1 : -1
        focusNextControl(e.target, direction)
        break
      }
      case PERTINENT_KEY_CODES.LEFT:
      case PERTINENT_KEY_CODES.RIGHT: {
        if (vertical) break
        
        e.preventDefault()
        const direction = (key === PERTINENT_KEY_CODES.RIGHT) ? 1 : -1
        focusNextControl(e.target, direction)
        break
      }
      case PERTINENT_KEY_CODES.HOME:
      case PERTINENT_KEY_CODES.END:
        e.preventDefault()
        focusExtremeControl(e.target, key === PERTINENT_KEY_CODES.HOME)
        break
      default:
        // do nothing
    }
  }
}

export default createFocusListener
