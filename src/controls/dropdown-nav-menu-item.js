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
  active: PropTypes.bool,
  closeSubmenu: PropTypes.func.isRequired,
  onInteractParentMenu: PropTypes.func.isRequired,
  toggleActiveMenuId: PropTypes.func.isRequired,
  isFirstItem: PropTypes.bool.isRequired,
  children: PropTypes.node,
}

const defaultProps = {
  active: false,
  children: null,
}

function DropdownNavMenuItem({
  name,
  id,
  baseUrl,
  path,
  active,
  onInteractParentMenu,
  closeSubmenu,
  toggleActiveMenuId,
  isFirstItem,
  children,
}) {
  // show dropdown button on desktop, will always be shown on mobile
  const [showDropdownButton, setShowDropdownButton] = useState(false)

  return (
    <React.Fragment>
      <li
        id={`menu-item-${id}`}
        className={classnames('menu-item parent-menu', {
          active,
        })}
      >
        <OutsideClickHandler onOutsideClick={closeSubmenu}>
          <a
            onFocus={() => {
              setShowDropdownButton(true)
              closeSubmenu()
            }}
            onBlur={() => {
              setTimeout(() => setShowDropdownButton(false), 10)
            }}
            onTouchEnd={(e) => onInteractParentMenu(e, id)}
            href={getNavLink(baseUrl, path)}
          >
            {name}
          </a>
          {children && (
            <button
              type="button"
              className={classnames('menu-item-button', {
                'desktop-visible': active || showDropdownButton,
              })}
              onKeyDown={(e) => {
                if (
                  e.key === 'Escape' ||
                  /* if interaction is on first item in submenu, close the
                  submenu only if Tab is entered _with_ Shift being held */
                  (isFirstItem && e.key === 'Tab' && e.shiftKey)
                ) {
                  return closeSubmenu()
                }

                onInteractParentMenu(e, id)
              }}
              onTouchEnd={() => toggleActiveMenuId(id)}
              aria-haspopup
              aria-expanded="false"
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
