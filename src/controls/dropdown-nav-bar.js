import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { isMobileMenu, toggleElementArray } from './helpers'
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
}

const defaultProps = {
  mobileBreakpoint: 1024,
  baseUrl: '',
}

function DropdownNavBar({ menuItems, mobileBreakpoint, baseUrl }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMenuIds, setActiveMenuIds] = useState([])
  const clearActiveMenuIds = () => {
    // effectively closes submenu
    // don't clear out active menu ids if mobile menu
    if (isMobileMenu(mobileBreakpoint)) return
    setActiveMenuIds([])
  }
  const toggleActiveMenuId = (id) => {
    /* Specific for mobile view. Keep submenus open unless
    dropdown arrow is specifically tapped again to close it */
    setActiveMenuIds(toggleElementArray(activeMenuIds, id))
  }

  const onInteractParentMenu = useCallback(
    (e, id) => {
      if (
        // Ignore if:
        // 1) Mobile menu
        isMobileMenu(mobileBreakpoint) ||
        // 2) Not attempting to open submenu using Enter/Space on keyboard
        (e.key && !['Enter', ' '].includes(e.key)) ||
        // 3) IDs match, as we then want Enter/Space or a tap to activate href link (default behavior)
        activeMenuIds.includes(id)
      )
        return
      e.preventDefault()
      setActiveMenuIds([id])
    },
    [activeMenuIds]
  )

  return (
    <nav id="dropdown-nav-bar">
      <input
        type="checkbox"
        id="mobile-nav-button"
        checked={isMobileMenuOpen}
        onChange={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen)
          clearActiveMenuIds()
        }}
      />
      <label htmlFor="mobile-nav-button" className="mobile-menu">
        <span />
        <span />
        <span />
      </label>
      <DropdownNavMenu
        activeMenuIds={activeMenuIds}
        onInteractParentMenu={onInteractParentMenu}
        toggleActiveMenuId={toggleActiveMenuId}
        closeSubmenu={clearActiveMenuIds}
        baseUrl={baseUrl}
        menuItems={menuItems}
      />
    </nav>
  )
}

DropdownNavBar.propTypes = propTypes
DropdownNavBar.defaultProps = defaultProps

export default DropdownNavBar
