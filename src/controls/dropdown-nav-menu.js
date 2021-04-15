import React from 'react'
import PropTypes from 'prop-types'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenuItem from './dropdown-nav-menu-item'
import DropdownNavMenuSubItem from './dropdown-nav-menu-sub-item'
import { isEmpty, first, last } from 'lodash'

const propTypes = {
  baseUrl: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  activeMenuIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleActiveMenuId: PropTypes.func.isRequired,
  closeDesktopSubmenu: PropTypes.func.isRequired,
  menuLabel: PropTypes.string.isRequired,
}

const defaultProps = {}

function DropdownNavMenu({
  baseUrl,
  menuItems,
  activeMenuIds,
  toggleActiveMenuId,
  closeDesktopSubmenu,
  menuLabel,
}) {
  return (
    <ul className="dropdown-nav-menu" aria-label={menuLabel}>
      {menuItems.map((parentItem, index) => {
        const isFirstParentItem = parentItem === first(menuItems)
        const { id, name, path, childItems } = parentItem
        return (
          <DropdownNavMenuItem
            key={index}
            name={name}
            id={id}
            baseUrl={baseUrl}
            path={path}
            active={activeMenuIds.includes(id)}
            closeDesktopSubmenu={closeDesktopSubmenu}
            toggleSubmenu={() => toggleActiveMenuId(id)}
            isFirstItem={isFirstParentItem}
          >
            {childItems && !isEmpty(childItems) && (
              <ul className="sub-menu">
                {childItems.map((childItem, index) => {
                  const isLastChildItem = childItem === last(childItems)
                  return (
                    <DropdownNavMenuSubItem
                      key={index}
                      name={childItem.name}
                      baseUrl={baseUrl}
                      path={childItem.path}
                      isLastItem={isLastChildItem}
                      closeDesktopSubmenu={closeDesktopSubmenu}
                    />
                  )
                })}
              </ul>
            )}
          </DropdownNavMenuItem>
        )
      })}
    </ul>
  )
}

DropdownNavMenu.propTypes = propTypes
DropdownNavMenu.defaultProps = defaultProps

export default DropdownNavMenu
