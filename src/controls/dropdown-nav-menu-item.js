import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import classnames from 'classnames'
import { getNavLink } from './helpers'

const propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isSubmenuOpen: PropTypes.bool,
  closeDesktopSubmenu: PropTypes.func.isRequired,
  toggleSubmenu: PropTypes.func.isRequired,
  isFirstItem: PropTypes.bool.isRequired,
  children: PropTypes.node,
  hideMenuButtonBeforeFocus: PropTypes.bool.isRequired,
}

const defaultProps = {
  isSubmenuOpen: false,
  children: null,
}

function DropdownNavMenuItem({
  name,
  id,
  baseUrl,
  path,
  isSubmenuOpen,
  closeDesktopSubmenu,
  toggleSubmenu,
  isFirstItem,
  children,
  hideMenuButtonBeforeFocus,
}) {
  // show menu button on desktop, will always be shown on mobile
  const [showMenuButton, setShowMenuButton] = useState(
    !hideMenuButtonBeforeFocus
  )

  return (
    <li
      className={classnames('menu-item parent-menu', {
        'open-submenu': isSubmenuOpen,
      })}
      role="none"
    >
      <OutsideClickHandler onOutsideClick={closeDesktopSubmenu}>
        <a
          onFocus={() => {
            if (hideMenuButtonBeforeFocus) setShowMenuButton(true)
            closeDesktopSubmenu()
          }}
          onBlur={() => {
            if (hideMenuButtonBeforeFocus) {
              // timeout needed to move from link to button without it disappearing
              setTimeout(() => setShowMenuButton(false), 0)
            }
          }}
          href={getNavLink(baseUrl, path)}
          role="menuitem"
        >
          {name}
        </a>
        {children && (
          <button
            type="button"
            className={classnames('menu-item-button', {
              'desktop-visible': isSubmenuOpen || showMenuButton,
            })}
            onKeyDown={(e) => {
              if (
                e.key === 'Escape' ||
                /* if interaction is on first item in submenu, close the
                  submenu only if Tab is entered _with_ Shift being held */
                (isFirstItem && e.key === 'Tab' && e.shiftKey)
              )
                closeDesktopSubmenu()
            }}
            onClick={toggleSubmenu}
            aria-label={`Open submenu for ${name}`}
            aria-haspopup
            aria-expanded={isSubmenuOpen}
            aria-controls={`submenu-${id}`}
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
