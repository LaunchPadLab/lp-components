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
  hideDropdownButtonBeforeFocus: PropTypes.bool.isRequired,
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
  hideDropdownButtonBeforeFocus,
}) {
  // show dropdown button on desktop, will always be shown on mobile
  const [showDropdownButton, setShowDropdownButton] = useState(
    !hideDropdownButtonBeforeFocus
  )

  return (
    <React.Fragment>
      <li
        id={`menu-item-${id}`}
        className={classnames('menu-item parent-menu', {
          'open-submenu': isSubmenuOpen,
        })}
        role="none"
      >
        <OutsideClickHandler onOutsideClick={closeDesktopSubmenu}>
          <a
            onFocus={() => {
              if (hideDropdownButtonBeforeFocus) setShowDropdownButton(true)
              closeDesktopSubmenu()
            }}
            onBlur={() => {
              if (hideDropdownButtonBeforeFocus) {
                // timeout needed to move from link to button without it disappearing
                setTimeout(() => setShowDropdownButton(false), 0)
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
                'desktop-visible': isSubmenuOpen || showDropdownButton,
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
            />
          )}
          {children}
        </OutsideClickHandler>
      </li>
    </React.Fragment>
  )
}

DropdownNavMenuItem.propTypes = propTypes
DropdownNavMenuItem.defaultProps = defaultProps

export default DropdownNavMenuItem
