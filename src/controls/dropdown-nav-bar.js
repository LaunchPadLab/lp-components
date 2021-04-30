import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isMobileView, toggleElementArray } from './helpers'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenu from './dropdown-nav-menu'
import classnames from 'classnames'

// TODO: Finish documentation
/**
 *
 *
 * @name DropdownNavBar
 * @type Function
 * @description A control component for navigating among multiple navigation menu items that can include dropdowns with sub-menu items
 * @param {String} [baseUrl] -
 * @param {Number|Boolean} [mobileBreakpoint] -
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
  mobileBreakpoint: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  baseUrl: PropTypes.string,
  menuLabel: PropTypes.string,
  hideMenuButtonsBeforeFocus: PropTypes.bool,
}

const defaultProps = {
  mobileBreakpoint: 720,
  baseUrl: '',
  menuLabel: 'Primary Menu',
  hideMenuButtonsBeforeFocus: false,
}

function DropdownNavBar({
  menuItems,
  mobileBreakpoint,
  baseUrl,
  menuLabel,
  hideMenuButtonsBeforeFocus,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMenuIds, setOpenMenuIds] = useState([])
  const isMobileMenu = isMobileView(mobileBreakpoint)
  const toggleOpenMenuId = (id) => {
    if (!isMobileMenu) return setOpenMenuIds([id])
    /* For mobile view, keep submenus open unless
    dropdown arrow is specifically tapped again to close it */
    setOpenMenuIds(toggleElementArray(openMenuIds, id))
  }
  const closeDesktopSubmenu = () => {
    // don't close if mobile menu
    if (isMobileMenu) return
    setOpenMenuIds([])
  }

  return (
    <nav
      className={classnames('dropdown-nav-bar', {
        'no-mobile': !mobileBreakpoint,
      })}
      aria-label={menuLabel}
    >
      {!!mobileBreakpoint && (
        <React.Fragment>
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
        </React.Fragment>
      )}
      <DropdownNavMenu
        openMenuIds={openMenuIds}
        toggleOpenMenuId={toggleOpenMenuId}
        closeDesktopSubmenu={closeDesktopSubmenu}
        baseUrl={baseUrl}
        menuItems={menuItems}
        menuLabel={menuLabel}
        hideMenuButtonsBeforeFocus={hideMenuButtonsBeforeFocus}
      />
    </nav>
  )
}

DropdownNavBar.propTypes = propTypes
DropdownNavBar.defaultProps = defaultProps

export default DropdownNavBar
