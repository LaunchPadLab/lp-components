/**
 *
 * A helper function to check that the window width is below the
 * threshold to show the mobile (hamburger) menu. Returns false
 * if mobileBreakpoint is falsey (e.g., no mobile menu is used).
 *
 * @name isMobileMenu
 * @type Function
 * @param {Number} mobileBreakpoint - The screen width (in pixels) when mobile menu styling is no longer applied
 * @returns {Boolean} - Whether mobile menu styling is currently applied
 * @example
 *
 * isMobileMenu(1024) // -> true (when mobile menu styling is applied at screen widths below 1024 pixels)
 *
 */

function isMobileMenu(mobileBreakpoint) {
  // eslint-disable-next-line no-undef
  return window.innerWidth < mobileBreakpoint
}

export default isMobileMenu
