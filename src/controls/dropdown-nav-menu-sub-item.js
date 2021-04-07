import React from 'react'
import PropTypes from 'prop-types'
import { getNavLink } from './helpers'

const propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  baseURL: PropTypes.string.isRequired,
  isLastItem: PropTypes.bool.isRequired,
  closeSubmenu: PropTypes.func.isRequired,
}

const defaultProps = {}

function DropdownNavMenuSubItem({
  name,
  id,
  baseURL,
  path,
  isLastItem,
  closeSubmenu,
}) {
  return (
    <li
      id={`menu-item-${id}`}
      className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-${id}`}
    >
      <a
        onKeyDown={(e) => {
          if (
            e.key === 'Escape' ||
            /* if interaction is on last item in submenu, close the
            submenu only if Tab is entered _without_ Shift being held */
            (isLastItem && e.key === 'Tab' && !e.shiftKey)
          ) {
            closeSubmenu()
          }
        }}
        href={getNavLink(baseURL, path)}
        className="menu-image-title-after"
      >
        {name}
      </a>
    </li>
  )
}

DropdownNavMenuSubItem.propTypes = propTypes
DropdownNavMenuSubItem.defaultProps = defaultProps

export default DropdownNavMenuSubItem
