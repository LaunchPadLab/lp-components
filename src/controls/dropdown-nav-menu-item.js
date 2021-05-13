import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'react-router'
import classnames from 'classnames'

const propTypes = {
  name: PropTypes.string.isRequired,
  submenuId: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isExternalPath: PropTypes.bool.isRequired,
  isSubmenuOpen: PropTypes.bool,
  closeDesktopSubmenus: PropTypes.func.isRequired,
  toggleSubmenu: PropTypes.func.isRequired,
  isFirstItem: PropTypes.bool.isRequired,
  children: PropTypes.node,
  hideSubmenuButtonBeforeFocus: PropTypes.bool.isRequired,
}

const defaultProps = {
  isSubmenuOpen: false,
  children: null,
}

function DropdownNavMenuItem({
  name,
  submenuId,
  path,
  isExternalPath,
  isSubmenuOpen,
  closeDesktopSubmenus,
  toggleSubmenu,
  isFirstItem,
  children,
  hideSubmenuButtonBeforeFocus,
}) {
  // show submenu button on desktop, will always be shown on mobile
  const [showSubmenuButton, setShowSubmenuButton] = useState(
    !hideSubmenuButtonBeforeFocus
  )
  const menuItemOnFocus = () => {
    if (hideSubmenuButtonBeforeFocus) setShowSubmenuButton(true)
    closeDesktopSubmenus()
  }
  const menuItemOnBlur = () => {
    if (hideSubmenuButtonBeforeFocus) {
      // timeout needed to move from link to button without it disappearing
      setTimeout(() => setShowSubmenuButton(false), 0)
    }
  }
  const menuItemProps = {
    onFocus: menuItemOnFocus,
    onBlur: menuItemOnBlur,
    role: 'menuItem',
  }

  return (
    <li
      className={classnames('menu-item parent-menu', {
        'open-submenu': isSubmenuOpen,
      })}
      role="none"
    >
      <OutsideClickHandler onOutsideClick={closeDesktopSubmenus}>
        {isExternalPath ? (
          <a href={path} {...menuItemProps}>
            {name}
          </a>
        ) : (
          <Link to={path} {...menuItemProps}>
            {name}
          </Link>
        )}
        {children && (
          <button
            type="button"
            className={classnames('menu-item-button', {
              'desktop-visible': isSubmenuOpen || showSubmenuButton,
            })}
            onKeyDown={(e) => {
              if (
                e.key === 'Escape' ||
                /* if interaction is on first item in submenu, close the
                  submenu only if Tab is entered _with_ Shift being held */
                (isFirstItem && e.key === 'Tab' && e.shiftKey)
              )
                closeDesktopSubmenus()
            }}
            onClick={toggleSubmenu}
            aria-label={`Open submenu for ${name}`}
            aria-haspopup
            aria-expanded={isSubmenuOpen}
            aria-controls={submenuId}
          />
        )}
        {children}
      </OutsideClickHandler>
    </li>
  )
}

DropdownNavMenuItem.propTypes = propTypes
DropdownNavMenuItem.defaultProps = defaultProps

export default DropdownNavMenuItem
