import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isMobileView, toggleElementArray } from './helpers'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenu from './dropdown-nav-menu'
import classnames from 'classnames'

/**
 *
 *
 * @name DropdownNavBar
 * @type Function
 * @description A control component for navigating through multiple navigation menu items that can include dropdowns with submenu items along with a mobile view option
 * @param {Array} [menuItems] - An array of {@link menuItemType} objects used to populate the menu and any submenus
 * @param {Number|Boolean} [mobileBreakpoint=720] - The screen width (in pixels) when mobile view styling is no longer applied (can pass `false` when not using mobile styling)
 * @param {String} [menuAriaLabel='Primary Menu'] - The aria-label to use for both the `nav` and `ul[role="menubar"]`
 * @param {Boolean} [hideSubmenuButtonsBeforeFocus=false] - Whether to hide the accessible submenu buttons until the corresponding parent menu link is focused
 * @example
 *
 * const menuItems = [
 *   {
 *     name: 'Experiences',
 *     path: '/experiences',
 *     childItems: [
 *       {
 *         name: 'Animal Encounters',
 *         path: '/experiences/encounters',
 *       },
 *       {
 *         name: 'Zoo Keeper for a Day',
 *         path: '/experiences/keeper',
 *       },
 *     ],
 *   },
 *   {
 *     name: 'Visit Us',
 *     path: 'https://goo.gl/maps/oGeajN5N1Ycy1D4J8',
 *   },
 * ]
 *
 * function Header({ menuItems }) {
 *   return (
 *     <header>
 *       <DropdownNavBar menuItems={menuItems} />
 *     </header>
 *   )
 * }
 */

const propTypes = {
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  mobileBreakpoint: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  menuAriaLabel: PropTypes.string,
  hideSubmenuButtonsBeforeFocus: PropTypes.bool,
}

const defaultProps = {
  mobileBreakpoint: 720,
  menuAriaLabel: 'Primary Menu',
  hideSubmenuButtonsBeforeFocus: false,
}

function DropdownNavBar({
  menuItems,
  mobileBreakpoint,
  menuAriaLabel,
  hideSubmenuButtonsBeforeFocus,
}) {
  const [openSubmenus, setOpenSubmenus] = useState([])
  const isMobileMenu = isMobileView(mobileBreakpoint)
  const toggleSubmenu = (submenuId) => {
    if (!isMobileMenu) return setOpenSubmenus([submenuId])
    /* For mobile view, keep submenus open unless
    dropdown arrow is specifically tapped again to close it */
    setOpenSubmenus(toggleElementArray(openSubmenus, submenuId))
  }
  const closeDesktopSubmenus = () => {
    // don't close if mobile menu
    if (isMobileMenu) return
    setOpenSubmenus([])
  }

  return (
    <nav
      className={classnames('dropdown-nav-bar', {
        'no-mobile': !mobileBreakpoint,
      })}
      aria-label={menuAriaLabel}
    >
      <DropdownNavMenu
        openSubmenus={openSubmenus}
        toggleSubmenu={toggleSubmenu}
        closeDesktopSubmenus={closeDesktopSubmenus}
        menuItems={menuItems}
        menuAriaLabel={menuAriaLabel}
        hideSubmenuButtonsBeforeFocus={hideSubmenuButtonsBeforeFocus}
      />
    </nav>
  )
}

DropdownNavBar.propTypes = propTypes
DropdownNavBar.defaultProps = defaultProps

export default DropdownNavBar
