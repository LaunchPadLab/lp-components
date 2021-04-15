import React from 'react'
import PropTypes from 'prop-types'
import { getNavLink } from './helpers'

const propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  isLastItem: PropTypes.bool.isRequired,
  closeDesktopSubmenu: PropTypes.func.isRequired,
}

const defaultProps = {}

function DropdownNavMenuSubItem({
  name,
  baseUrl,
  path,
  isLastItem,
  closeDesktopSubmenu,
}) {
  return (
    <li className="menu-item child-menu">
      <a
        onKeyDown={(e) => {
          if (
            e.key === 'Escape' ||
            /* if interaction is on last item in submenu, close the
            submenu only if Tab is entered _without_ Shift being held */
            (isLastItem && e.key === 'Tab' && !e.shiftKey)
          ) {
            closeDesktopSubmenu()
          }
        }}
        href={getNavLink(baseUrl, path)}
      >
        {name}
      </a>
    </li>
  )
}

DropdownNavMenuSubItem.propTypes = propTypes
DropdownNavMenuSubItem.defaultProps = defaultProps

export default DropdownNavMenuSubItem
