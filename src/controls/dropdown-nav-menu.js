import React from 'react'
import PropTypes from 'prop-types'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenuItem from './dropdown-nav-menu-item'
import DropdownNavMenuSubItem from './dropdown-nav-menu-sub-item'
import { isEmpty, first, last } from 'lodash'

const propTypes = {
  baseUrl: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  openMenuIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleOpenMenuId: PropTypes.func.isRequired,
  closeDesktopSubmenu: PropTypes.func.isRequired,
  menuLabel: PropTypes.string.isRequired,
  hideMenuButtonsBeforeFocus: PropTypes.bool.isRequired,
}

const defaultProps = {}

function DropdownNavMenu({
  baseUrl,
  menuItems,
  openMenuIds,
  toggleOpenMenuId,
  closeDesktopSubmenu,
  menuLabel,
  hideMenuButtonsBeforeFocus,
}) {
  return (
    <ul className="dropdown-nav-menu" aria-label={menuLabel} role="menubar">
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
            isSubmenuOpen={openMenuIds.includes(id)}
            closeDesktopSubmenu={closeDesktopSubmenu}
            toggleSubmenu={() => toggleOpenMenuId(id)}
            isFirstItem={isFirstParentItem}
            hideMenuButtonBeforeFocus={hideMenuButtonsBeforeFocus}
          >
            {childItems && !isEmpty(childItems) && (
              <ul className="sub-menu" role="menu" aria-label={name}>
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
