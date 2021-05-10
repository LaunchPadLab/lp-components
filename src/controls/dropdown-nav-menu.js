import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenuItem from './dropdown-nav-menu-item'
import DropdownNavMenuSubItem from './dropdown-nav-menu-sub-item'
import { isEmpty, first, last } from 'lodash'

const propTypes = {
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  openMenuIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleOpenMenuId: PropTypes.func.isRequired,
  closeDesktopSubmenu: PropTypes.func.isRequired,
  menuLabel: PropTypes.string.isRequired,
  hideMenuButtonsBeforeFocus: PropTypes.bool.isRequired,
}

const defaultProps = {}

function getRandomIntIds(menuItems) {
  return menuItems.map(() => {
    return Math.floor(Math.random() * 100)
  })
}

function DropdownNavMenu({
  menuItems,
  openMenuIds,
  toggleOpenMenuId,
  closeDesktopSubmenu,
  menuLabel,
  hideMenuButtonsBeforeFocus,
}) {
  const uniqueIds = useMemo(() => getRandomIntIds(menuItems), [menuItems])
  return (
    <ul className="dropdown-nav-menu" aria-label={menuLabel} role="menubar">
      {menuItems.map((parentItem, index) => {
        const isFirstParentItem = parentItem === first(menuItems)
        const { name, path, childItems } = parentItem
        const id = `${name}-${uniqueIds[index]}`
        const submenuId = `submenu-${id}`
        return (
          <DropdownNavMenuItem
            key={id}
            name={name}
            submenuId={submenuId}
            path={path}
            isExternalPath={path.startsWith('http')}
            isSubmenuOpen={openMenuIds.includes(id)}
            closeDesktopSubmenu={closeDesktopSubmenu}
            toggleSubmenu={() => toggleOpenMenuId(id)}
            isFirstItem={isFirstParentItem}
            hideMenuButtonBeforeFocus={hideMenuButtonsBeforeFocus}
          >
            {childItems && !isEmpty(childItems) && (
              <ul
                id={submenuId}
                className="sub-menu"
                role="menu"
                aria-label={name}
              >
                {childItems.map((childItem) => {
                  const isLastChildItem = childItem === last(childItems)
                  return (
                    <DropdownNavMenuSubItem
                      key={`${submenuId}-${childItem.name}`}
                      name={childItem.name}
                      path={childItem.path}
                      isExternalPath={childItem.path.startsWith('http')}
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
