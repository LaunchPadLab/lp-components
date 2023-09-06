const Keys = {
  HOME: 'Home',
  END: 'End',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
}

// Function that can be passed to event handlers (e.g., onKeyPress) that manages which element should be focused
// Note: Expected keyboard interaction with arrow keys changes depending on the orientation of the tab list
function manageFocus(e, { vertical }) {
  // If not activated while on a tab, then ignore
  if (!isTabControl(e.target)) return

  // Key will be set to Unidentified if it cannot be mapped
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#value
  const key = e.key === 'Unidentified' ? e.code : e.key
  switch (key) {
    case Keys.DOWN: {
      if (!vertical) return
      return focusNextControl(e)
    }
    case Keys.UP: {
      if (!vertical) return
      return focusPreviousControl(e)
    }
    case Keys.LEFT: {
      if (vertical) return
      return focusPreviousControl(e)
    }
    case Keys.RIGHT: {
      if (vertical) return
      return focusNextControl(e)
    }
    case Keys.HOME: {
      return focusFirstControl(e)
    }
    case Keys.END: {
      return focusLastControl(e)
    }
    default:
    // do nothing
  }
}

// ----- FOCUS APIs -----

function focusFirstControl(e) {
  e.preventDefault()
  const controls = getTabs(e.target)
  return controls[0].focus()
}

function focusLastControl(e) {
  e.preventDefault()
  const controls = getTabs(e.target)
  return controls[controls.length - 1].focus()
}

function focusNextControl(e) {
  e.preventDefault()
  const nextControl = getAdjacentControl(e.target)
  return nextControl.focus()
}

function focusPreviousControl(e) {
  e.preventDefault()
  const previousControl = getAdjacentControl(e.target, { previous: true })
  return previousControl.focus()
}

// ----- PRIVATE HELPERS -----

// Checks if the element is a tab
function isTabControl(el) {
  return el && el.matches('[role="tab"]')
}

// Returns the _closest_ adjacent control
// Note: will wrap around the array (e.g., the closest previous control to the first item is the last item)
function getAdjacentControl(control, { previous = false } = {}) {
  const controls = getTabs(control)
  const currentIndex = controls.indexOf(control)

  return previous
    ? getNthValue(controls, currentIndex - 1)
    : getNthValue(controls, currentIndex + 1)
}

// Recursively searches for the closest parent tab list
function getClosestTabList(el) {
  /* istanbul ignore next */
  if (!el) return
  return el.matches('[role="tablist"]')
    ? el
    : getClosestTabList(el.parentElement)
}

// Returns the value at a "safe" index by accounting for indices that exceed the bounds
// Note: handles positive and negative index args
function getNthValue(arr, newIndex) {
  const length = arr.length
  const safeIndex = ((newIndex % length) + length) % length
  return arr[safeIndex]
}

// Returns an array of tab elements in the tab list corresponding to the target element
function getTabs(control) {
  const tabList = getClosestTabList(control)
  return Array.from(tabList.querySelectorAll('[role="tab"]'))
}

export default manageFocus
