import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenuItem from './dropdown-nav-menu-item'
import DropdownNavSubmenuItem from './dropdown-nav-submenu-item'
import { isEmpty, first, last } from 'lodash'

const propTypes = {
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  openSubmenus: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleSubmenu: PropTypes.func.isRequired,
  closeDesktopSubmenus: PropTypes.func.isRequired,
  menuAriaLabel: PropTypes.string.isRequired,
  hideSubmenuButtonsBeforeFocus: PropTypes.bool.isRequired,
}

const defaultProps = {}

function getRandomIntIds(menuItems) {
  return menuItems.map(() => {
    return Math.floor(Math.random() * 100)
  })
}

function DropdownNavMenu({
  menuItems,
  openSubmenus,
  toggleSubmenu,
  closeDesktopSubmenus,
  menuAriaLabel,
  hideSubmenuButtonsBeforeFocus,
}) {
  const uniqueIds = useMemo(() => getRandomIntIds(menuItems), [menuItems])
  return (
    <ul className="dropdown-nav-menu" aria-label={menuAriaLabel} role="menubar">
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
            isSubmenuOpen={openSubmenus.includes(submenuId)}
            closeDesktopSubmenus={closeDesktopSubmenus}
            toggleSubmenu={() => toggleSubmenu(submenuId)}
            isFirstItem={isFirstParentItem}
            hideSubmenuButtonBeforeFocus={hideSubmenuButtonsBeforeFocus}
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
                    <DropdownNavSubmenuItem
                      key={`${submenuId}-${childItem.name}`}
                      name={childItem.name}
                      path={childItem.path}
                      isExternalPath={childItem.path.startsWith('http')}
                      isLastItem={isLastChildItem}
                      closeDesktopSubmenus={closeDesktopSubmenus}
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
