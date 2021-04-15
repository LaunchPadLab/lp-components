/**
 *
 * A helper function to check that the window width is below the
 * threshold to show the mobile view. Returns false if mobileBreakpoint
 * is falsey (e.g., no mobile view is used).
 *
 * @name isMobileView
 * @type Function
 * @param {Number} mobileBreakpoint - The screen width (in pixels) when mobile view styling is no longer applied
 * @returns {Boolean} - Whether mobile view styling is currently applied
 * @example
 *
 * isMobileView(1024) // -> true (when mobile view styling is applied at screen widths below 1024 pixels)
 *
 */

function isMobileView(mobileBreakpoint) {
  // eslint-disable-next-line no-undef
  return window.innerWidth < mobileBreakpoint
}

export default isMobileView
