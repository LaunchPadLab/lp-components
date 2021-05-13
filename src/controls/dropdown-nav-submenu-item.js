import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isExternalPath: PropTypes.bool.isRequired,
  isLastItem: PropTypes.bool.isRequired,
  closeDesktopSubmenus: PropTypes.func.isRequired,
}

const defaultProps = {}

function DropdownNavSubmenuItem({
  name,
  path,
  isExternalPath,
  isLastItem,
  closeDesktopSubmenus,
}) {
  const menuItemProps = {
    onKeyDown: (e) => {
      if (
        e.key === 'Escape' ||
        /* if interaction is on last item in submenu, close the
        submenu only if Tab is entered _without_ Shift being held */
        (isLastItem && e.key === 'Tab' && !e.shiftKey)
      ) {
        closeDesktopSubmenus()
      }
    },
    role: 'menuItem',
  }

  return (
    <li className="menu-item sub-menu-item" role="none">
      {isExternalPath ? (
        <a href={path} {...menuItemProps}>
          {name}
        </a>
      ) : (
        <Link to={path} {...menuItemProps}>
          {name}
        </Link>
      )}
    </li>
  )
}

DropdownNavSubmenuItem.propTypes = propTypes
DropdownNavSubmenuItem.defaultProps = defaultProps

export default DropdownNavSubmenuItem
