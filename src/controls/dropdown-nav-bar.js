import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { isMobileView, toggleElementArray } from './helpers'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenu from './dropdown-nav-menu'

// TODO: Finish documentation
/**
 *
 *
 * @name DropdownNavBar
 * @type Function
 * @description A control component for navigating among multiple navigation menu items that can include dropdowns with sub-menu items
 * @param {String} [baseUrl] -
 * @param {Number} [mobileBreakpoint] -
 * @param {Array} [menuItems] -
 * @example
 *
 * function Header({ baseUrl, menuItems }) {
 *   return (
 *     <header>
 *       <div>
 *         <a href={baseUrl} className="logo">
 *           <img
 *             src={logo}
 *             alt="Navigate to the Home Page"
 *           />
 *         </a>
 *         <DropdownNavBar baseUrl={baseUrl} menuItems={menuItems} />
 *       </div>
 *     </header>
 *   )
 * }
 */

const propTypes = {
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  mobileBreakpoint: PropTypes.number,
  baseUrl: PropTypes.string,
  menuLabel: PropTypes.string,
}

const defaultProps = {
  mobileBreakpoint: 1024,
  baseUrl: '',
  menuLabel: 'Primary navigation',
}

function DropdownNavBar({ menuItems, mobileBreakpoint, baseUrl, menuLabel }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMenuIds, setActiveMenuIds] = useState([])
  const isMobileMenu = isMobileView(mobileBreakpoint)
  const toggleActiveMenuId = (id) => {
    if (!isMobileMenu) return setActiveMenuIds([id])
    /* For mobile view, keep submenus open unless
    dropdown arrow is specifically tapped again to close it */
    setActiveMenuIds(toggleElementArray(activeMenuIds, id))
  }
  const closeDesktopSubmenu = () => {
    // don't close if mobile menu
    if (isMobileMenu) return
    setActiveMenuIds([])
  }

  return (
    <nav className="dropdown-nav-bar" aria-label={menuLabel}>
      <input
        type="checkbox"
        id="mobile-nav-button"
        checked={isMobileMenuOpen}
        onChange={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen)
          closeDesktopSubmenu()
        }}
      />
      <label htmlFor="mobile-nav-button" className="mobile-menu">
        <span />
        <span />
        <span />
      </label>
      <DropdownNavMenu
        activeMenuIds={activeMenuIds}
        toggleActiveMenuId={toggleActiveMenuId}
        closeDesktopSubmenu={closeDesktopSubmenu}
        baseUrl={baseUrl}
        menuItems={menuItems}
        menuLabel={menuLabel}
      />
    </nav>
  )
}

DropdownNavBar.propTypes = propTypes
DropdownNavBar.defaultProps = defaultProps

export default DropdownNavBar
